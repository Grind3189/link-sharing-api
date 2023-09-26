import mongoose from "mongoose"

const Schema = mongoose.Schema

const linkSchema = new Schema({
  id: String,
  platform: String,
  link: String,
  error: String,
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
})

const Link = mongoose.model("Link", linkSchema)
export default Link
