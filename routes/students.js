const express = require('express');
const router = express.Router();
const Student = require('../models/student');

// Get all students
router.get('/', async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create students
router.post('/', async (req, res) => {
    const data = req.body;

    try {
        if (Array.isArray(data)) {
            // If data is an array, insert multiple students
            const result = await Student.insertMany(data, { ordered: false });
            res.status(201).json(result);
        } else {
            // If data is not an array, insert a single student
            const student = new Student(data);
            await student.save();
            res.status(201).json(student);
        }
    } catch (err) {
        if (err.name === 'ValidationError' && err.errors) {
            // Handle Mongoose validation errors for individual documents
            const validationErrors = {};

            // Iterate over the errors and collect them
            for (const error of err.errors) {
                const { properties, path } = error;
                validationErrors[path] = properties.message;
            }

            return res.status(400).json({ error: 'Validation failed', validationErrors });
        }

        res.status(500).json({ error: err.message });
    }
});

// Get a single student
router.get('/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) return res.status(404).json({ error: 'Student not found' });
        res.json(student);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a student
router.put('/:id', async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!student) return res.status(404).json({ error: 'Student not found' });
        res.json(student);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete a student
router.delete('/:id', async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) return res.status(404).json({ error: 'Student not found' });
        res.json({ message: 'Student deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;