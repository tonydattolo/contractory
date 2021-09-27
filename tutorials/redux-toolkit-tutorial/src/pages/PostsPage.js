import React, { useEffect } from 'react'
import { Post } from '../components/Post'
// new for redux toolkit
import { useSelector, useDispatch } from 'react-redux'
import { fetchPosts, postsSelector } from '../slices/posts'

const PostsPage = () => {

  const dispatch = useDispatch()
  // we no longer need to pass state to props and connect it
  // state is now available from the selector
  const {posts, loading, hasErrors} = useSelector(postsSelector)

  useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch])

  const renderPosts = () => {
    if (loading) return <p>Loading posts...</p>
    if (hasErrors) return <p>Unable to display posts.</p>

    return posts.map(post => <Post key={post.id} post={post} excerpt />)
  }

  return (
    <section>
      <h1>Posts</h1>
      {renderPosts()}
    </section>
  )
}

const mapStateToProps = state => ({
  loading: state.posts.loading,
  posts: state.posts.posts,
  hasErrors: state.posts.hasErrors,
})

export default connect(mapStateToProps)(PostsPage)
