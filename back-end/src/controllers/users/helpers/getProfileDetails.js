import Posts from "../../../models/post.model.js"
import Relationships from "../../../models/relationships.model.js"
import User from "../../../models/user.model.js"


export const getProfileDetails = async (userId) => {
    // handle user not found
    const user = await User.findById(userId)
    if(!user) return null

    // get user post count and friends count
    const [postsCount, friendsCount] = await Promise.all([
        Posts.countDocuments({author: userId, status: {$in: ["active", "edited"]} }),
        Relationships.countDocuments({
            $or: [{from: userId}, {to: userId}],
            type: "friend",
            status: "accepted"
        })
    ])

    // return post count and friend count
    return { postsCount, friendsCount }
}