const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;
const postSchema = new mongoose.Schema(
  {
    body: {
      type: String,
    },
    photo: {
      type: String,
    },
    likes: [{ type: ObjectId, ref: 'User' }],
    comments: [
      { text: { type: String }, postedBy: { type: ObjectId, ref: 'User' } },
    ],
    postedBy: {
      type: ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
