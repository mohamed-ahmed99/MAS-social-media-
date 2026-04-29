import Relationships from '../../models/relationships.model.js'
import { asyncHandler } from '../../middlewares/asyncHandler.js'


// get all who follow me or sent a friend request to me or blocked me 
/*
    1- check if limit, page and type are provided
    2- set filter
    3- find relationships
    4- map users
    5- response
*/
const getRelationsToMe = asyncHandler(async (req, res) => {
    const { limit, page, type, status } = req.query

    // check if limit, page and type are provided
    if (!limit || !page || !type) {
        return res.status(400).json({ status: "fail", message: "'limit', 'page' and 'type' are required in query.", data: null })
    }

    // set filter
    let filter = { to: req.user._id, type: type }
    filter.status = status ? status : "none"

    // find relationships
    const users = await Relationships
        .find(filter)
        .sort({ createdAt: -1 })
        .limit(limit)
        .skip((page - 1) * limit)
        .populate('from', '_id personalInfo.firstName personalInfo.lastName personalInfo.profilePicture')
        .lean()

    // make date readable
    const usersInfo = users.map((user) => ({
        _id: user.from._id,
        firstName: user.from.personalInfo.firstName,
        lastName: user.from.personalInfo.lastName,
        profilePicture: user.from.personalInfo.profilePicture
    }))

    // response
    return res.status(200).json({
        status: "success",
        message: `${usersInfo.length} users found`,
        data: { users: usersInfo }
    })

})

export default getRelationsToMe
