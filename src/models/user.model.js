import mongoose from "mongoose";

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    links: [{
        type: Schema.Types.ObjectId,
        ref: "Link"
    }],
    profile: {
        type: Schema.Types.ObjectId,
        ref: "Profile"
    }

})


const User = mongoose.model('User', userSchema)
export default User