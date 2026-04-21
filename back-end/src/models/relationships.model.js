import mongoose from 'mongoose'

const relationsSchema = new mongoose.Schema({

    from:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,
        index:true
    },
    to:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,
        index:true,
    },

    type:{
        type:String,
        enum:["follow", 'friend', 'block'],
        required:true,
    },
    status:{
        type:String,
        enum:["pending", "accepted", "rejected", "deleted", "none"],
        default:"none" 
        // none: for follow
    },
    
}, {timestamps:true})


// for get relations from me
relationsSchema.index({ from: 1, type: 1, status: 1, createdAt: -1 })

// for get relations to me
relationsSchema.index({ to: 1, type: 1, status: 1, createdAt: -1 })

// for check if relationship    
relationsSchema.index({ from: 1, to: 1, type: 1, createdAt: -1 }, { unique: true })

const Relationships = mongoose.model('relationships', relationsSchema)
export default Relationships


 