const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const studentRoutes = require('./routes/students'); // Import student routes

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/student-crud-app', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/students', studentRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
