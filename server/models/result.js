const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;
const resultSchema = new mongoose.Schema(
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

const Result = mongoose.model('Result', resultSchema);
module.exports = Result;
