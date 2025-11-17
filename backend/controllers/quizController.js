const Quiz = require('../models/Quiz');

exports.createQuiz = async (req, res, next) => {
  try {
    const q = await Quiz.create(req.body);
    res.status(201).json(q);
  } catch (err) { next(err); }
};

exports.getQuizzes = async (req, res, next) => {
  try {
    const list = await Quiz.find().select('title description durationMinutes createdAt');
    res.json(list);
  } catch (err) { next(err); }
};

exports.getQuizById = async (req, res, next) => {
  try {
    const q = await Quiz.findById(req.params.id).select('-questions.correctIndex'); // hide answers
    if (!q) return res.status(404).json({ error: 'Quiz not found' });
    res.json(q);
  } catch (err) { next(err); }
};

exports.updateQuiz = async (req, res, next) => {
  try {
    const q = await Quiz.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!q) return res.status(404).json({ error: 'Quiz not found' });
    res.json(q);
  } catch (err) { next(err); }
};

exports.deleteQuiz = async (req, res, next) => {
  try {
    const q = await Quiz.findByIdAndDelete(req.params.id);
    if (!q) return res.status(404).json({ error: 'Quiz not found' });
    res.json({ ok: true });
  } catch (err) { next(err); }
};

// Return questions but strip correctIndex
exports.getQuestions = async (req, res, next) => {
  try {
    const q = await Quiz.findById(req.params.id);
    if (!q) return res.status(404).json({ error: 'Quiz not found' });
    const questions = q.questions.map((qq, i) => ({
      id: i,
      text: qq.text,
      options: qq.options
    }));
    res.json({ quizId: q._id, title: q.title, questions });
  } catch (err) { next(err); }
};

// Submit answers and score
exports.submitQuiz = async (req, res, next) => {
  try {
    const q = await Quiz.findById(req.params.id);
    if (!q) return res.status(404).json({ error: 'Quiz not found' });
    const { answers } = req.body; // array of selected option indices
    if (!Array.isArray(answers)) return res.status(400).json({ error: 'Answers must be array' });

    const total = q.questions.length;
    let correct = 0;
    const perQuestion = q.questions.map((quest, idx) => {
      const selected = typeof answers[idx] === 'number' ? answers[idx] : null;
      const isCorrect = selected === quest.correctIndex;
      if (isCorrect) correct += 1;
      return {
        index: idx,
        selected,
        isCorrect
      };
    });

    const score = Math.round((correct / total) * 100);
    res.json({ quizId: q._id, total, correct, score, detail: perQuestion });
  } catch (err) { next(err); }
};
