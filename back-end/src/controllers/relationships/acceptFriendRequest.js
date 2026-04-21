import Relationships from '../../models/relationships.model.js'
import createNotification from '../notifications/createNotification.js'
import { NOTIFICATIONT_TYPE } from '../../config/constants.js'
import Users from '../../models/user.model.js'
import { asyncHandler } from '../../middlewares/asyncHandler.js'


/*
    1- check if from is provided
    2- check if relationship is found
    3- check if relationship is already accepted
    4- update relationship status
    5- create notification
    6- response
*/
const acceptFriendRequest = asyncHandler(async (req, res) => {
    const from = req.params.fromUserId
    if (!from) {
        return res.status(400).json({ status: "fail", message: "'fromUserId' is required in params."})
    }

    const relationship = await Relationships.findOne({ from, to: req.user._id, type: 'friend' }).sort({createdAt: -1})

    if (!relationship) {
        return res.status(400).json({ status: "fail", message: "relationship not found"})
    }

    if (relationship.status === "accepted") {
        return res.status(400).json({ status: "fail", message: "friend request has been accepted before"})
    }

    relationship.status = 'accepted'
    await relationship.save()


    // create notification 
    const me = await Users.findById(req.user._id).select("personalInfo.firstName personalInfo.lastName")
    const userName = `${me.personalInfo.firstName} ${me.personalInfo.lastName}` // userName

    await createNotification({
        from: req.user._id, 
        to: from,
        type: NOTIFICATIONT_TYPE.ACCEPT_FRIEND_REQUEST,
        fromName: userName
    })

    return res.status(200).json({ status: "success", message: "accepted successfully"})

})

export default acceptFriendRequest