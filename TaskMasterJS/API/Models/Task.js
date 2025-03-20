const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  TaskTitle: { type: String, required: true },
  Task: { type: String, required: true },
  importance: { type: String, unique: true, required: true },
  type: { type: String, required: true },
  Iscompleted: { type: Boolean, required: true },
  token: { type: String }
});

// Prevent model overwrite error
const Task = mongoose.models.Task || mongoose.model('User', TaskSchema);

module.exports = Task;
``