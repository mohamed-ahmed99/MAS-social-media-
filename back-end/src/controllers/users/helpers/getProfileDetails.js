import Posts from "../../../models/post.model.js"
import Relationships from "../../../models/relationships.model.js"
import Users from "../../../models/user.model.js"


export const getProfileDetails = async (userId) => {
    // handle user not found
    const user = await Users.findById(userId)
    if(!user) return null

    // get user post count and friends count
    const [postsCount, friendsCount] = await Promise.all([
        // get user's post count
        Posts.countDocuments({author: userId, status: {$in: ["active", "edited"]} }),
        
        // get user's friend count
        Relationships.countDocuments({ 
            $or: [{from: userId}, {to: userId}],
            type: "friend",
            status: "accepted"
        })
    ])

    // get last 6 user friends info
    const relationships = await Relationships
        .find({
            $or: [{from: userId}, {to: userId}],
            type: "friend",
            status: "accepted"
        })
        .sort({createdAt: -1})
        .limit(6)
        .select("from to")
    
    // map to get friend info 
    const friendsIdsList = relationships.map(r => {
        return r.from.toString() === userId.toString() ? r.to : r.from
    })

    // get friend info 
    const friendsInfo = await Users
        .find({_id: {$in: friendsIdsList}})
        .select("_id personalInfo.firstName personalInfo.lastName personalInfo.profilePicture")

    // return user post count and friend count
    return { postsCount, friendsCount, friends: friendsInfo }
}