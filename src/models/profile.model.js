import mongoose from "mongoose";

const Schema = mongoose.Schema

const profileSchema = new Schema ({
    name: String,
    lastname: String,
    email: String,
    image: {
        id: String,
        url: String,
        signature: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
})

const Profile = mongoose.model('Profile', profileSchema)

export default Profile