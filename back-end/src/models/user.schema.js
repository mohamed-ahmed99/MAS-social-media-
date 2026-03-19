import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import { ROLES } from '../config/constants.js'

const userSchema = new mongoose.Schema({
    // personal info
    personalInfo:{
        firstName:{type:String, required:true},
        lastName:{type:String, required:true},
        gender:String,
    },
    
    contactInfo:{
        phoneNumber:String,
        address:String,
        email:{type:String, required:true},
    },

    account:{
        password:{type:String, required:true, select:false},
        status: {
            type: String,
            enum: ["Active", "Blocked", "Deleted", "Unverified"],
            default: "Unverified"
        }   
    },

    // roles
    role:{
        type:String,
        enum: [ROLES.ADMIN, ROLES.USER],
        default: ROLES.USER
    },



    // verify email 
    verification:{
        verifyCode:{type:String},
        expiresAt: {type:Date, default: () => (Date.now() + 1000 * 60 * 10)},
    },

}, {timestamps:true})

userSchema.methods.checkPassword = async function (password) {
    return await bcrypt.compare(password, this.account.password)
}

userSchema.index({"createdAt":-1})
userSchema.index({"account.status":1})

const Users = mongoose.model('user', userSchema)
export default Users