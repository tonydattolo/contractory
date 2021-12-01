import { Button, Spinner } from "react-bootstrap"
import Wallet from "@/components/Wallet"
import { useGetWalletsByUserQuery } from "slices/walletsAPI"
import { useSelector } from "react-redux"
import { useEffect } from "react"


export default function Wallets() {

  const currentUser = useSelector(state => state.auth.user)
  const access_token = useSelector(state => state.auth.access)
  const email = currentUser.userdata.email ?? ""

  const {
    data: walletsData,
    error: walletsError,
    isLoading: walletsIsLoading,
    isError: walletsIsError,
    isFetching: walletsIsFetching
  } = useGetWalletsByUserQuery({ email, access_token })


  useEffect(() => {
    if (walletsIsError === true) {
      console.log(walletsError)
    }
  }, [walletsIsError])

  
  return (
    <div>
      <h1>Wallets</h1>
      <>
      {walletsIsLoading || walletsIsFetching || walletsData === undefined ?
        (
          <Spinner animation="border" variant="success" />
        ) : (
          <>
            <h3>Wallets connected to {email}</h3>
            {/* {postsData.posts.map(post => (
              <Post key={post.id} post={post} isOwner={sameUser}/>
            ))} */}
            {walletsData.wallets.map(wallet => (
              <Wallet key={wallet.id} wallet={wallet}/>
            ))}
          </>
        )
      }
      </>    
    </div>
  )
}