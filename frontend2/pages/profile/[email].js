import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useGetProfileByEmailQuery } from "slices/profileAPI";
import { Button, Spinner, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { setProfileInfo } from "slices/profileSlice";
import { setPosts } from "slices/postsSlice";
import { useGetPostsByUserQuery } from "slices/postsAPI";
import Post from "@/components/Post";

export default function Profile() {

  const dispatch = useDispatch()
  const router = useRouter()
  const { email } = router.query
  const user = useSelector(state => state.auth.user)
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const [sameUser, setSameUser] = useState(false)

  useEffect(() => {

    if (email && user !== null && email === user.userdata.email) {
      setSameUser(true)
      if (!isLoading && !isFetching) {
        dispatch(setProfileInfo({ data }))
      }
    }

    // if (!postsIsLoading && !postsIsFetching) {
    //   dispatch(setPosts({ postsData }))
    // }
  })

  const {
    data,
    error,
    isLoading,
    isError,
    isFetching
  } = useGetProfileByEmailQuery(`${email}`)
  
  const {
    data: postsData,
    error: postsError,
    isLoading: postsIsLoading,
    isError: postsIsError,
    isFetching: postsIsFetching
  } = useGetPostsByUserQuery(`${email}`)

  useEffect(() => {
    if (isError === true) {
      console.log(error)
    }
  }, [isError])
  useEffect(() => {
    if (postsIsError === true) {
      console.log(postsError)
    }
  }, [postsIsError])

  const handleEditButton = () => {
    router.replace(`edit/${email}`, undefined, { shallow: true })
  }

  return (
    <>
      <div>
        <h3>Profile Page</h3>
      </div>
      <br />

      {sameUser && 
        <Button onClick={handleEditButton}>Edit Profile</Button>
      }

      <>
      {isLoading || isFetching || data === undefined ? 
        (
          <Spinner animation="border" variant="success" />
        ) : (
          <Card>
            {/* <Card.Img variant="top" src="holder.js/100px180?text=Image cap" /> */}
            <Card.Body>
              <Card.Title>{data.profile.display_name}</Card.Title>
              <Card.Text>
                <small>bio:</small>
                <br />
                {data.profile.bio}
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              
              <ListGroupItem>
                <small>first name:</small>
                <br />
                {data.profile.first_name}
              </ListGroupItem>
              <ListGroupItem>
                <small>first name:</small>
                <br />
                {data.profile.last_name}
              </ListGroupItem>
            </ListGroup>
            <Card.Body>
              <Card.Link href="#">Card Link</Card.Link>
              <Card.Link href="#">Another Link</Card.Link>
            </Card.Body>
          </Card>
        )
      }
      </>

      <br />

      <>
      {postsIsLoading || postsIsFetching || postsData === undefined ?
        (
          <Spinner animation="border" variant="success" />
        ) : (
          <>
            <h3>Posts from {email}</h3>
            {postsData.posts.map(post => (
              <Post key={post.id} post={post} isOwner={sameUser}/>
            ))}
          </>
        )
      }
      </>

    </>
  )
}
