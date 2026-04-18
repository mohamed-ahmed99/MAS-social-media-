import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import { ROLES } from '../config/constants.js'

const userSchema = new mongoose.Schema({
    // personal info
    personalInfo:{
        firstName:{type:String, required:true},
        lastName:{type:String, required:true},
        gender:String,
        bio:String,
        profilePicture:String,
        coverPicture:String,
        dateOfBirth:String,
        address:String,
    },
    
    contactInfo:{
        phoneNumber:String,
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
        expiresAt: {type:Date, default: () => (Date.now() + 10 * 60 * 1000 )},
    },

    // others
    others:{
        isOnboardingRouteOpend: {type:Boolean, default: false},
    }
}, {timestamps:true})

userSchema.methods.checkPassword = async function (password) {
    return await bcrypt.compare(password, this.account.password)
}

userSchema.index({"contactInfo.email":1,"createdAt":-1})

const Users = mongoose.model('user', userSchema)
export default Users