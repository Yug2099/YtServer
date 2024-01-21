import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email: {type:String , required: true},
    name: {type:String},
    desc:{type:String},
    joinedOn:{type:Date,default:Date.now},
    password: { type: String, required: true },
})

// export default mongoose.model("User",userSchema)

const users = mongoose.model('users', userSchema);

export default users;