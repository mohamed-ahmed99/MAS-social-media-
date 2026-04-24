import Relationships from '../../models/relationships.model.js'
import { NOTIFICATION_TYPE } from '../../config/constants.js'
import { asyncHandler } from '../../middlewares/asyncHandler.js'



// delete a relationship
const deleteRelationship = asyncHandler(async (req, res) => {

    // get data from request
    const { type, status } = req.query
    const { targetUserId } = req.params
    const userId = req.user._id

    // validate data
    if (!type) {
        return res.status(400).json({status: "fail", message: "Type is required"})
    }

    // build filter
    let baseFilter = { type }
    if (status) baseFilter.status = status

    // delete relationship "update status to deleted"
    const relationship = await Relationships.findOneAndUpdate(
        {
            $or: [
                { from: targetUserId, to: userId, ...baseFilter },
                { from: userId, to: targetUserId, ...baseFilter }
            ]
        }, 
        {status: "deleted"}, 
        {sort: {createdAt: -1}}
    )

    // check if relationship doesn't exist
    if (relationship.status == "deleted") {
        return res.status(404).json({ status: "fail", message: "Relationship not found" })
    }

    // send response
    res.status(200).json({ 
        status: "success", 
        message: "Relationship deleted successfully"
    })
})


export default deleteRelationship