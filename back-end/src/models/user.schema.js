import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import { ROLES } from '../config/constants.js'

const userSchema = new mongoose.Schema({
    // personal info
    personalInfo:{
        firstName:{type:String, required:true},
        lastName:{type:String, required:true},
        email:{type:String, unique:true, required:true},
        phoneNumber:String,
        password:{type:String, required:true, select:false},
        address:String,
        gender:String,
    },

    // roles
    role:{
        type:String,
        enum: [ROLES.ADMIN, ROLES.USER],
        default: ROLES.USER
    },



    // verify email 
    verifyUser:{
        isVerified: {type:Boolean, default:false},
        verifyCode:{type:String},
        emailVerificationExpires: {type:Date, default: () => (Date.now() + 1000 * 60 * 10)},
    },

}, {timestamps:true})

userSchema.methods.checkPassword = async function (password) {
    return await bcrypt.compare(password, this.personalInfo.password)
}


userSchema.index({"verifyUser.emailVerificationExpires":1}, {expireAfterSeconds:0})

const Users = mongoose.model('users', userSchema)
export default Users