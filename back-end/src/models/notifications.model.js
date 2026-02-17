import mongoose from "mongoose";


const notificationSchema = new mongoose.Schema({
    from:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true,
        index:true,
    },
    to:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true,
        index:true,
    },

    type:{type:String, required:true},

    title:{type:String, required:true},

    isRead:{type:Boolean, default:false},

    readAt:Date,


    
}, {timestamps:true})



notificationSchema.index({to:1, isRead:1, createdAt:-1})
notificationSchema.index({from:1, to:1})

const Notifications = mongoose.model("notifications", notificationSchema)

export default Notifications