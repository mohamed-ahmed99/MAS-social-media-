import Users from '../models/user.model.js';
import Relationships from '../models/relationships.model.js';
import { asyncHandler } from '../middlewares/asyncHandler.js';
import { ACCOUNT_STATUS } from '../config/constants.js';

// get keys of user posts
export const getUserKey = asyncHandler(async (req, res) => {
    const { key } = req.query;
    if (!key) {
        return res.status(400).json({ status: "fail", message: "Key is required" })
    }

    const targetKey = await Users.findOne({ _id: req.user._id }, { [key]: true, _id: false })

    if (!targetKey) {
        return res.status(404).json({ status: "fail", message: "User not found" })
    }

    if (targetKey[key] === undefined) {
        return res.status(400).json({ status: "fail", message: `Key '${key}' not found` })
    }

    return res.status(200).json({ status: "success", data: { [key]: targetKey[key] }, message: "Key fetched successfully" })
})



// get users 
export const getUsers = asyncHandler(async (req, res) => {
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;

    const users = await Users.find({ $nor: [{ _id: req.user._id }] }).sort({ createdAt: -1 })
        .select('personalInfo.firstName personalInfo.lastName personalInfo.profilePicture').skip(skip).limit(limit).lean()


    return res.status(200).json({ status: "success", message: "Users fetched successfully", data: { users } })
})


export const getUser = asyncHandler(async (req, res) => {
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



// get my profile
export const getMyProfile = asyncHandler(async (req, res) => {

    // get user
    const user = await Users.findOne({ _id: req.user._id })
    if (!user) {
        return res.status(400).send({ status: "fail", message: "user not found", data: null })
    }

    // check if user is active
    if (user.account.status !== ACCOUNT_STATUS.ACTIVE) {
        return res.status(400).send({ status: "fail", message: "user is not active", data: null })
    }
    // send user data
    res.status(200).json({
        status: "success",
        message: `user data has sent successfully`,
        data: { user }
    })
})


export const updateMyProfile = asyncHandler(async (req, res) => {
    const { _id } = req.user

    // check if user exist and active
    const user = await Users.findById(_id)
    if (!user) {
        return res.status(404).json({ status: "fail", message: "User not found", data: null })
    } else if (user.account.status !== ACCOUNT_STATUS.ACTIVE) {
        return res.status(400).json({ status: "fail", message: "User is not active", data: null })
    }

    // this function will flatten the object
    const flattenedData = {} // this is the object that will be updated
    const flatten = (obj, prefix = '') => {
        for(const key in obj){
            const value = obj[key] // value of the key
            const currentPath = prefix ? `${prefix}.${key}` : key; // current path of the key

            // if value is object and not array and not null
            if(value !== null && !Array.isArray(value) && typeof value === "object"){
                flatten(value, currentPath)
            }else{
                flattenedData[currentPath] = value
            }
        }
    }
    
    // call flatten function
    flatten(req.body)


    // Update with $set to ensure only provided fields are changed
    const updatedUser = await Users.findByIdAndUpdate(_id, { $set: flattenedData }, { new: true });

    res.status(200).json({
        status: "success",
        message: "User updated successfully",
        data: { user: updatedUser }
    })
})  
