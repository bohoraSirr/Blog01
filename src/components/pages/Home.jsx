import React, { useEffect, useState } from 'react'
import service from '../../appwrite/config'
import { Container, Postcard } from '../index'
import LoadingPostSkeleton from '../Loader/LoadingPostSkeleton'

function Home() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    service.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents)
      }
    }).finally(() => {
      setLoading(false)
    })
  }, [])

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {loading ? (
            // Show 4 skeleton loaders while loading
            [...Array(4)].map((_, i) => (
              <div key={i} className="p-2 w-1/4">
                <LoadingPostSkeleton />
              </div>
            ))
          ) : posts.length === 0 ? (
            // If not loading but no posts
            <div className="p-2 w-full text-center">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                No post uploaded till now. Be the first one to post.
              </h1>
            
            </div>
          ) : (
            // Show real posts
            posts.map((post) => (
              <div key={post.$id} className="p-2 w-1/4">
                <Postcard {...post} />
              </div>
            ))
          )}
        </div>
      </Container>
    </div>
  )
}

export default Home
