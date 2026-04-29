import Relationship from "../../models/relationships.model.js";
import {asyncHandler} from "../../middlewares/asyncHandler.js"


const updateRelationStatus = asyncHandler(async (req, res) => {

    const { targetUserId } = req.params;
    const { new_status } = req.query;

    if (!targetUserId || !new_status) {
        return res.status(400).json({status: "fail", message: "Missing required fields", data:{new_status, targetUserId}});
    }

    // getting the most recent relation
    const existRelation = await Relationship.findOne({
        $or: [
            { from: req.user._id, to: targetUserId },
            { from: targetUserId, to: req.user._id }
        ]
    }).sort({createdAt: -1});

    // if relation not found or deleted
    if (!existRelation || existRelation.status === 'deleted') {
        return res.status(404).json({ status: "fail", message: "Relation not found"});
    }

    existRelation.status = new_status;
    await existRelation.save();

    return res.status(200).json({ status: "success", message: `Relation ${new_status} successfully`});

});


export default updateRelationStatus;