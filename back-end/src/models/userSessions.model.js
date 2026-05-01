import mongoose from 'mongoose'

const sessionSchema = new mongoose.Schema({

    // user
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,
        index:true
    },
    
    token:{
        type:String,
        required:true,
    },

    ip:{
        type:String,
        required:true,
    },

   expiresAt:{type:Date},

}, {timestamps:true})



const Sessions = mongoose.model('sessions', sessionSchema)
export default Sessions