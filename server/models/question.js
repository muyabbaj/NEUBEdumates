const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  department: String,
  subject: String,
  semester: String,
  courseTeacherName: String,
  questionLink: String,
});
const Question = mongoose.model('Question', questionSchema);
module.exports = Question;
