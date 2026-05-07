import {Router} from 'express'
import { verifyToken } from '../middlewares/verifyToken.js'

// functions
import addPost from '../controllers/posts/addPost.js'
import deletePost from '../controllers/posts/deletePost.js'
import editPost from '../controllers/posts/editPost.js'
import getPosts from '../controllers/posts/getPosts.js'
import getUserPosts from '../controllers/posts/getUserPosts.js'

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
postRoute.get("/get/user/:userId", verifyToken("MASproAuth"), getUserPosts)





export default postRoute
