const mongoose = require('mongoose');
const Course = require('./models/Course');
require('dotenv').config();

const courses = [
  { title: 'Data Structures & Algorithms', description: 'Fundamental data structures and algorithmic techniques including arrays, linked lists, trees, graphs, sorting, and searching.', instructor: 'Dr. Priya Sharma', credits: 4, capacity: 60 },
  { title: 'Database Management Systems', description: 'Covers relational databases, SQL, normalization, transactions, and NoSQL concepts.', instructor: 'Prof. Rajesh Kumar', credits: 3, capacity: 50 },
  { title: 'Operating Systems', description: 'Process management, memory management, file systems, and concurrency in modern operating systems.', instructor: 'Dr. Anita Desai', credits: 4, capacity: 45 },
  { title: 'Computer Networks', description: 'Network architecture, TCP/IP, routing, switching, and network security fundamentals.', instructor: 'Prof. Vikram Singh', credits: 3, capacity: 55 },
  { title: 'Web Development', description: 'Full-stack web development with HTML, CSS, JavaScript, Node.js, and modern frameworks.', instructor: 'Dr. Sneha Patel', credits: 3, capacity: 40 },
  { title: 'Machine Learning', description: 'Supervised and unsupervised learning, neural networks, model evaluation and real-world applications.', instructor: 'Dr. Amit Joshi', credits: 4, capacity: 35 },
  { title: 'Software Engineering', description: 'Software development life cycle, agile methodologies, design patterns, and project management.', instructor: 'Prof. Meera Nair', credits: 3, capacity: 50 },
  { title: 'Cloud Computing', description: 'Cloud infrastructure, virtualization, AWS/Azure services, and deployment strategies.', instructor: 'Dr. Rohan Gupta', credits: 3, capacity: 40 }
];

const seedDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/course_registration';
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected for seeding...');

    await Course.deleteMany();
    console.log('Existing courses removed.');

    await Course.insertMany(courses);
    console.log('Sample courses seeded successfully!');

    mongoose.connection.close();
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedDB();
