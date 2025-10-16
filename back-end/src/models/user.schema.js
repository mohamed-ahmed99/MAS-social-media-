import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    // personal info
    firstName:{type:String, required:true},
    lastName:{type:String, required:true},
    email:{type:String, unique:true, required:true},
    phoneNumber:String,
    password:{type:String, required:true, select:false},
    address:String,
    gender:String,


    // verify email 
    isVerified: {type:Boolean, default:false},
    verifyCode:{type:String, select:false},
    emailVerificationExpires: {type:Date, default: () => (Date.now() + 1000 * 60 * 10), select:false },

    sessions: {
        type:[  
            {
                token:String,
                date:{type:Date, default: () => (Date.now())}
            }
        ],
        select:false,
        default: [] 
    }

}, {timestamps:true})

userSchema.methods.checkPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.index({emailVerificationExpires:1},{expireAfterSeconds:0})

const Users = mongoose.model('users', userSchema)
export default Users