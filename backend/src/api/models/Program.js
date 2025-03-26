const mongoose = require('mongoose');

const ProgramSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  faculty: { type: String }
});

const Program = mongoose.model('Program', ProgramSchema);
module.exports = Program;
