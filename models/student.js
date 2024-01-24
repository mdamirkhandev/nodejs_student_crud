const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    course: { type: String },
    age: { type: Number }
});

module.exports = mongoose.model('Student', studentSchema);
