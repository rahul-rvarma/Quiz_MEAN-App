require('dotenv').config();
const connectDB = require('../config/db');
const Quiz = require('../models/Quiz');

const seed = async () => {
  await connectDB();
  await Quiz.deleteMany({});
  const sample = {
    title: 'General Knowledge - Sample',
    description: 'Quick 5 question quiz',
    durationMinutes: 5,
    questions: [
      { text: 'What is the capital of France?', options: ['Berlin','Rome','Paris','Madrid'], correctIndex: 2 },
      { text: '2 + 2 = ?', options: ['3','4','5','6'], correctIndex: 1 },
      { text: 'Which language is used for backend in this project?', options: ['Python','JavaScript','Go','Ruby'], correctIndex: 1 },
      { text: 'Sun rises in the ?', options: ['West','East','North','South'], correctIndex: 1 },
      { text: 'Which is a NoSQL DB?', options: ['MySQL','Postgres','MongoDB','SQLite'], correctIndex: 2 }
    ]
  };
  const q = await Quiz.create(sample);
  console.log('Seeded quiz id:', q._id);
  process.exit(0);
};

seed().catch(err => { console.error(err); process.exit(1); });
