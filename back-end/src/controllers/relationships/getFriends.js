import Relationship from "../../models/relationships.model.js"
import {asyncHandler} from "../../middlewares/asyncHandler.js"


const getFriends = asyncHandler(async (req, res) => {
    const { limit = 10, page = 1 } = req.query; 

    // find all friends
    const getFriends = await Relationship.find({
        $or:[
            {from: req.user._id, type: 'friend', status: 'accepted'},
            {to: req.user._id, type: 'friend', status: 'accepted'}
        ],
    })
    .sort({createdAt: -1})
    .skip((page - 1) * limit)
    .limit(limit)
    .populate("from to", "_id personalInfo")
    console.log(getFriends)


    // get the other user "not me"
    const targetFriends = getFriends.map(friend => 
      friend.from._id.toString() === req.user._id.toString() ? friend.to : friend.from
    )

    // format the data
    const handleFriendsData = targetFriends.map(friend => {
        return ({
            firstName: friend.personalInfo.firstName,
            lastName: friend.personalInfo.lastName,
            profilePicture: friend.personalInfo.profilePicture,
            _id: friend._id,
        })
    }) 

    // response to the client
    res.status(200).json({
        success: true,
        message: "Friends fetched successfully",
        data:{
            users: handleFriendsData, 
            total: getFriends.length,
        },
    })

})

export default getFriends