import {Router} from 'express'
import { checkAuth } from '../middlewares/checkAuth.js'
import { addPost, deletePost, editPost} from '../controllers/posts.controller.js'

const postRoute = Router()

// add post
postRoute.post("/add", checkAuth(), addPost)
postRoute.delete("/delete/:postId", checkAuth(), deletePost)
postRoute.patch("/edit/:postId", checkAuth(), editPost)





export default postRoute
