import { asyncHandler } from "../../middlewares/asyncHandler.js"
import Relationships from "../../models/relationships.model.js"
import Users from "../../models/user.model.js"



const suggestFriends = asyncHandler(async (req, res) => {

    // limit, page, skip
    const { limit, page } = req.query
    const skip = (page - 1) * limit

    if(!limit || !page){
        throw new Error("limit and page are required")
    }

    const newLimit = limit > 50 ? 50 : limit // new limit 

    // get my friends
    const myFriends = await Relationships
        .find({
            $or: [
                { from: req.user._id },
                { to: req.user._id }
            ],
            type: "friend",
            status: { $in: [ "pending", "accepted"] }
        })
        .select("from to -_id")


    // get ids
    const friendsIDs = myFriends.map(f => (req.user._id === f.from.toString() ? f.to : f.from))
    friendsIDs.push(req.user._id) // I don't wanna get my self

    // get user that not my friends
    const suggestions = await Users
        .find({ _id: { '$nin': friendsIDs } })
        .select("personalInfo.firstName personalInfo.lastName personalInfo.profilePicture _id")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(newLimit)
    
    const formattedSuggestions = suggestions.map(user => ({
        firstName: user.personalInfo.firstName,
        lastName: user.personalInfo.lastName,
        profilePicture: user.personalInfo.profilePicture,
        _id: user._id
    }))

    // response
    res.status(200).json({
        status: "success",
        message: "users sent successfully",
        data: { 
            count: formattedSuggestions.length,
            users: formattedSuggestions,
        }
    })
})


export default suggestFriends