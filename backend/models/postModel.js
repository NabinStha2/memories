import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "title is required"],
  },
  message: String,
  comments: [{ type: String, default: [] }],
  name: String,
  creator: String,
  tags: [{ type: String }],
  selectedFile: String,
  likes: [{ type: String, default: [] }],
  createdAt: {
    type: Date,
    default: Date(),
  },
});

const PostModel = mongoose.model("PostModel", postSchema);

export default PostModel;
