import {Router} from 'express'
import { verifyToken } from '../middlewares/verifyToken.js'
import { addPost, deletePost, editPost, getPosts, getUserPosts} from '../controllers/posts.controller.js'
import { ROLES } from '../config/constants.js'

const postRoute = Router()

// add post
postRoute.post("/add", verifyToken("MASproAuth"), addPost)

// delete post
postRoute.delete("/delete/:postId", verifyToken("MASproAuth"), deletePost)

// edit post
postRoute.patch("/edit/:postId", verifyToken("MASproAuth"), editPost)

// get posts
postRoute.get("/get", verifyToken("MASproAuth"), getPosts)

// get user posts
postRoute.get("/get/user", verifyToken("MASproAuth"), getUserPosts)





export default postRoute
