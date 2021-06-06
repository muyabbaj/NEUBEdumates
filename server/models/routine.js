const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;
const routineSchema = new mongoose.Schema(
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

const Routine = mongoose.model('Routine', routineSchema);
module.exports = Routine;
