const mongoose = require('mongoose');

const FacultySchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true }
});

const Faculty = mongoose.model('Faculty', FacultySchema);
module.exports = Faculty;
