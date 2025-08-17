import React,{useEffect, useState} from 'react'
import service from '../../appwrite/config'
import {Container, Postform} from '../index'
import { useParams, useNavigate } from 'react-router-dom'

function EditPost() {
    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    const {slug} = useParams()

    useEffect(() => {
        const fetchPost = async () => {
          if (!slug) {
            navigate("/")
            return
          }

          setLoading(true)
          setError(null)
          try {
            const post = await service.getPost(slug)
            if (post) {
               setPost(post)
            } else{
              setPost("Post not found.")
            }
          } catch (error) {
            setError("Something went wrong. Please try again later.")
          } finally{
            setLoading(false)
          }
        }
        fetchPost()
    },[slug, navigate])
  return post ? (
    <div className='py-8'>
      <Container>
        <Postform post={post} />
      </Container>
    </div>
  ) : null
}

export default EditPost