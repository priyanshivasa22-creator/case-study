const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const { MongoMemoryServer } = require('mongodb-memory-server');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve frontend static files
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// Define default route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

// Import Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/courses', require('./routes/courses'));
app.use('/api/enrollments', require('./routes/enrollments'));

// Sample courses to seed on startup
const sampleCourses = [
  { title: 'Data Structures & Algorithms', description: 'Fundamental data structures and algorithmic techniques including arrays, linked lists, trees, graphs, sorting, and searching.', instructor: 'Dr. Priya Sharma', credits: 4, capacity: 60 },
  { title: 'Database Management Systems', description: 'Covers relational databases, SQL, normalization, transactions, and NoSQL concepts.', instructor: 'Prof. Rajesh Kumar', credits: 3, capacity: 50 },
  { title: 'Operating Systems', description: 'Process management, memory management, file systems, and concurrency in modern operating systems.', instructor: 'Dr. Anita Desai', credits: 4, capacity: 45 },
  { title: 'Computer Networks', description: 'Network architecture, TCP/IP, routing, switching, and network security fundamentals.', instructor: 'Prof. Vikram Singh', credits: 3, capacity: 55 },
  { title: 'Web Development', description: 'Full-stack web development with HTML, CSS, JavaScript, Node.js, and modern frameworks.', instructor: 'Dr. Sneha Patel', credits: 3, capacity: 40 },
  { title: 'Machine Learning', description: 'Supervised and unsupervised learning, neural networks, model evaluation and real-world applications.', instructor: 'Dr. Amit Joshi', credits: 4, capacity: 35 },
  { title: 'Software Engineering', description: 'Software development life cycle, agile methodologies, design patterns, and project management.', instructor: 'Prof. Meera Nair', credits: 3, capacity: 50 },
  { title: 'Cloud Computing', description: 'Cloud infrastructure, virtualization, AWS/Azure services, and deployment strategies.', instructor: 'Dr. Rohan Gupta', credits: 3, capacity: 40 }
];

// Start server with in-memory MongoDB
async function startServer() {
  try {
    console.log('Starting in-memory MongoDB server...');
    const mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    await mongoose.connect(mongoUri);
    console.log('MongoDB (in-memory) connected successfully at', mongoUri);

    // Seed courses
    const Course = require('./models/Course');
    const existingCourses = await Course.countDocuments();
    if (existingCourses === 0) {
      await Course.insertMany(sampleCourses);
      console.log('Seeded 8 sample courses.');
    }

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

startServer();
