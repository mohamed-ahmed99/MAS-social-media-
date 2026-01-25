import {Router} from 'express'
import { checkAuth } from '../middlewares/checkAuth.js'
import { addPost, deletePost, editPost, getPosts, getUserPosts} from '../controllers/posts.controller.js'

const postRoute = Router()

// add post
postRoute.post("/add", checkAuth(), addPost)
postRoute.delete("/delete/:postId", checkAuth(), deletePost)
postRoute.patch("/edit/:postId", checkAuth(), editPost)
postRoute.get("/get", checkAuth(), getPosts)
postRoute.get("/get/user", checkAuth(), getUserPosts)





export default postRoute
