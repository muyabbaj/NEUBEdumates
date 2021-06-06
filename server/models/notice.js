const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;
const noticeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    photo: {
      type: String,
    },
  },
  { timestamps: true }
);

const Notice = mongoose.model('Notice', noticeSchema);

module.exports = Notice;
