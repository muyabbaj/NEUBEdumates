const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const Schema = mongoose.Schema;

const classPostSchema = new Schema({
  posts: String,
  createdBy: {
    type: ObjectId,
    ref: 'User',
  },
  courseId: {
    type: String,
  },
  comments: [
    {
      text: String,
      commentsBy: {
        type: ObjectId,
        ref: 'User',
      },
    },
  ],
});
const Classpost = mongoose.model('Classpost', classPostSchema);
module.exports = Classpost;
