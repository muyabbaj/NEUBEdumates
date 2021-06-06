const mongoose = require('mongoose');

const librarySchema = new mongoose.Schema({
  bookName: String,
  authorName: String,
  publisher: String,
  edition: String,
  department: String,
  bookLink: String,
});
const Library = mongoose.model('Library', librarySchema);
module.exports = Library;
