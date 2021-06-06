const mongoose = require('mongoose');

const classesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    courseCode: {
      type: String,
    },
    section: {
      type: String,
    },
    semester: {
      type: String,
    },
    department: {
      type: String,
    },
    classPost: [
      {
        post: { type: String },
        postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      },
    ],
    comments: [
      {
        text: { type: String },
        postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

const Class = mongoose.model('Class', classesSchema);
module.exports = Class;
