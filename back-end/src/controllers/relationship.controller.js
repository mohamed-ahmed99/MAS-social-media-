import Relationships from '../models/relationships.model.js'
import { createNotification, deleteNotification } from './notifications.controller.js'
import { NOTIFICATIONT_TYPE } from '../config/constants.js'
import Users from '../models/user.model.js'
import { asyncHandler } from '../middlewares/asyncHandler.js'


// get all who follow or send a friend request or block me 
export const toMe = asyncHandler(async (req, res) => {
    const { limit, page, type, status } = req.query

    if (!limit || !page || !type) {
        return res.status(400).json({ status: "fail", message: "'limit', 'page' and 'type' are required in query.", data: null })
    }

    let filter = { to: req.decoded._id, type: type }
    if (status) filter.status = status

    const users = await Relationships.find(filter).sort({ createdAt: -1 })
        .limit(limit).skip((page - 1) * limit).populate('from', '_id personalInfo.firstName personalInfo.lastName').lean()

    const usersInfo = users.map((user) => ({ personalInfo: user.from.personalInfo, _id: user.from._id }))

    return res.status(200).json({ status: "success", message: `${limit} users or less sent successfully `, data: { users: usersInfo } })

})



// 
export const fromMe = asyncHandler(async (req, res) => {
    const { type, limit, page, status } = req.query

    if (!limit || !page || !type) {
        return res.status(400).json({ status: "fail", message: "'limit', 'page' and 'type' are required in query.", data: null })
    }

    let baseFilter = { type }
    let filter;
    if (status) baseFilter.status = status

    if (type === "friend" && status == "accepted") {
        filter = {
            $or: [
                { from: req.decoded._id, ...baseFilter },
                { to: req.decoded._id, ...baseFilter },
            ]
        }
    } else {
        filter = { from: req.decoded._id, ...baseFilter }
    }

    const relations = await Relationships.find(filter).limit(limit).skip((page - 1) * limit)
        .sort({ createdAt: -1 }).populate('from to', '_id personalInfo.firstName personalInfo.lastName').lean()

    const users = relations.map((user) => {
        const validUsers = user.from._id.toString() === req.decoded._id ? user.to : user.from
        return { _id: validUsers._id, personalInfo: validUsers.personalInfo }
    })

    return res.status(200).json({ status: "success", message: "accepted successfully ", data: { users } })

})


// delete a relationship
export const deleteRelationship = asyncHandler(async (req, res) => {
    const { type, status } = req.query
    const { targetUserId } = req.params
    const userId = req.decoded._id

    if (!type) {
        return res.status(400).json({ message: "Type is required" })
    }

    let baseFilter = { type }
    if (status) baseFilter.status = status

    const relation = await Relationships.findOneAndDelete({
        $or: [
            { from: targetUserId, to: userId, ...baseFilter },
            { from: userId, to: targetUserId, ...baseFilter }
        ]
    })

    if (!relation) {
        return res.status(404).json({ message: "Relationship not found" })
    }

    // delete notification
    if (relation.type == NOTIFICATIONT_TYPE.FRIEND_REQUEST) {
        await deleteNotification({ from: userId, to: targetUserId })
    }

    res.status(200).json({ status: "success", message: "Relationship deleted successfully", data: null })
})



