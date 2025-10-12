import mongoose, { Types } from 'mongoose'

const userSchema = new mongoose.Schema({
    // personal info
    firstName:{type:String, required:true},
    lastName:{type:String, required:true},
    email:{type:String, unique:true, required:true},
    phoneNumber:String,
    password:{type:String, required:true},
    address:String,
    gender:String,


    // verify email 
    isVerified: {type:Boolean, default:false},
    verifyCode:String,
    emailVerificationExpires: {type:Date, default: () => (Date.now() + 1000 * 60 * 10) },

}, {timestamps:true})


userSchema.index({emailVerificationExpires:1},{expireAfterSeconds:0})

const Users = mongoose.model('users', userSchema)
export default Users