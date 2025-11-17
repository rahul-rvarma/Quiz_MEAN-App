const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');                     // <-- ADD THIS LINE
const connectDB = require('./config/db');
const quizRoutes = require('./routes/quiz');
const authRoutes = require('./routes/auth');

dotenv.config();
const app = express();

connectDB();

app.use(express.json());
app.use(morgan('dev'));

// =========================
// 🔥 CORS FIX (IMPORTANT)
// =========================
app.use(cors({
  origin: "http://localhost:4200",
  methods: "GET,POST,PUT,DELETE,OPTIONS",
  allowedHeaders: "Content-Type, Authorization"
}));

// handle preflight OPTIONS requests
app.options('*', cors());

// =========================

app.get('/', (req, res) => res.json({ ok: true, msg: 'Quiz App API' }));

app.use('/api/auth', authRoutes);
app.use('/api/quiz', quizRoutes);

// basic error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || 'Server error' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
