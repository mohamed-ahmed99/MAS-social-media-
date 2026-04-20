import mongoose from 'mongoose'

const relationsSchema = new mongoose.Schema({

    from:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true,
        index:true
    },
    to:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
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
    },
    
}, {timestamps:true})

relationsSchema.index({ from: 1, type: 1, status: 1, createdAt: -1 })
relationsSchema.index({ to: 1, type: 1, status: 1, createdAt: -1 })

relationsSchema.index({ from: 1, to: 1 })
relationsSchema.index({ to: 1, from: 1 })
relationsSchema.index({ from: 1, to: 1, type: 1 }, { unique: true })

relationsSchema.index({ from: 1, createdAt: -1 })

const Relationships = mongoose.model('relationships', relationsSchema)
export default Relationships


 