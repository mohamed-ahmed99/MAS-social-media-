import mongoose from 'mongoose'

const relationsSchema = new mongoose.Schema({

    from:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users",
        required:true,
        index:true
    },
    to:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users",
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
        enum:["pending", "accepted"],
        default:"pending"
    },
    


}, {timestamps:true})

relationsSchema.index({from:1, to:1, type:1}, {unique:true})

const relationships = mongoose.model('relationships', relationsSchema)
export default relationships


