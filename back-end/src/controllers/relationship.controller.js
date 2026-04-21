import Relationships from '../models/relationships.model.js'
import {deleteNotification } from './notifications.controller.js'
import { NOTIFICATIONT_TYPE } from '../config/constants.js'
import { asyncHandler } from '../middlewares/asyncHandler.js'



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



