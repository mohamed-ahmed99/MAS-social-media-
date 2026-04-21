import Relationships from '../../models/relationships.model.js'
import { asyncHandler } from '../../middlewares/asyncHandler.js'


// 
const getRelationsFromMe = asyncHandler(async (req, res) => {
    const { type, limit, page, status } = req.query

    // validate query params
    if (!limit || !page || !type) {
        return res.status(400).json({ status: "fail", message: "'limit', 'page' and 'type' are required in query.", data: null })
    }

    // build filter
    let baseFilter = { type }
    let filter;
    baseFilter.status = status ? status : "none"

    // if friend and accepted, get both ways
    if (type === "friend" && status == "accepted") {
        filter = {
            $or: [
                { from: req.user._id, ...baseFilter },
                { to: req.user._id, ...baseFilter },
            ]
        }
    }
    // for others
    else {
        filter = { from: req.user._id, ...baseFilter }
    }

    // get relationships
    const relationships = await Relationships
        .find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .populate('from to', '_id personalInfo.firstName personalInfo.lastName personalInfo.profilePicture')
        .lean()

    // get users from relationships
    const users = relationships.map((relationship) => {
        // if from is me, return to, else return from
        const targetUser = relationship.from._id.toString() === req.user._id ? relationship.to : relationship.from
        
        // return user with relationship
        return { 
            _id: targetUser._id, 
            personalInfo: targetUser.personalInfo,
        }
    })

    // return response
    return res.status(200).json({ status: "success", message: "accepted successfully ", data: { users } })

})

export default getRelationsFromMe
