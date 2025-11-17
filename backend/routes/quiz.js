const express = require('express');
const {
  createQuiz, getQuizzes, getQuizById, updateQuiz, deleteQuiz,
  getQuestions, submitQuiz
} = require('../controllers/quizController');
const validate = require('../middleware/validate');
const Joi = require('joi');
const auth = require('../middleware/auth');

const router = express.Router();

const quizSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow(''),
  durationMinutes: Joi.number().integer().min(1).default(10),
  questions: Joi.array().items(
    Joi.object({
      text: Joi.string().required(),
      options: Joi.array().items(Joi.string()).min(2).required(),
      correctIndex: Joi.number().integer().min(0).required()
    })
  ).min(1).required()
});

const submitSchema = Joi.object({
  answers: Joi.array().items(Joi.number().integer().min(0)).required()
});

// Public: list quizzes
router.get('/', getQuizzes);
// Public: get a quiz basic info
router.get('/:id', getQuizById);

// Protected endpoints for create/update/delete
router.post('/', auth, validate(quizSchema), createQuiz);
router.put('/:id', auth, validate(quizSchema), updateQuiz);
router.delete('/:id', auth, deleteQuiz);

// Public: get questions (you might omit correctIndex)
router.get('/:id/questions', getQuestions);

// Submit answers (public)
router.post('/:id/submit', validate(submitSchema), submitQuiz);

module.exports = router;
