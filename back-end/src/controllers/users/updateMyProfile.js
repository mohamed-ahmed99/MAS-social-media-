import Users from '../../models/user.model.js';
import { asyncHandler } from '../../middlewares/asyncHandler.js';
import { ACCOUNT_STATUS } from '../../config/constants.js';

const updateMyProfile = asyncHandler(async (req, res) => {
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

export default updateMyProfile
