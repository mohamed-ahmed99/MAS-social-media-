import Users from '../../models/user.model.js';
import Relationships from '../../models/relationships.model.js';
import { asyncHandler } from '../../middlewares/asyncHandler.js';

const getUser = asyncHandler(async (req, res) => {
    const { userId } = req.params // this is the id of the user I want to get

    // check if id is valid
    if (!userId) {
        return res.status(400).send({ status: "fail", message: "id is required.", data: null })
    }

    // get user
    const user = await Users.findOne({ _id: userId }).lean()
    if (!user) {
        return res.status(400).send({ status: "fail", message: "user not found", data: null })
    }

    // check relationship between me and this user
    const relationship = await Relationships.findOne({ 
        $or: [
            {from: req.user._id, to: userId},
            {from: userId, to: req.user._id}
        ]
    }).sort({createdAt: -1})
    console.log('relationship', relationship)
    
    if (relationship && ["pending", "accepted"].includes(relationship.status)) {
        user.relationshipWithYou = {
            type: relationship.type.toUpperCase().replace(" ", "_"),
            status: relationship.status.toUpperCase().replace(" ", "_")
        }
    } else {
        user.relationshipWithYou = {
            type: "NONE",
            status: "NONE"
        }
    }

    res.status(200).json({ status: "success", message: `user data has sent successfully`, data: { user } })
})

export default getUser
