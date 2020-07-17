const { body, validationResult } = require('express-validator');

exports.load = async (req, res, next, id) => {
  try {
    const answer = await req.question.answers.id(id);
    if (!answer) return res.status(404).json({ message: 'Answer not found.' });
    req.answer = answer;
  } catch (error) {
    if (error.name === 'CastError') return res.status(400).json({ message: 'Invalid answer id.' });
    return next(error);
  }
  next();
};

exports.create = async (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const errors = result.array({ onlyFirstError: true });
    return res.status(422).json({ errors });
  }

  try {
    const { id } = req.user;
    const { text } = req.body;
    const question = await req.question.addAnswer(id, text);
    res.status(201).json(question);
  } catch (error) {
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const { answer } = req.params;
    const question = await req.question.removeAnswer(answer);
    res.json(question);
  } catch (error) {
    next(error);
  }
};

exports.upvote = async (req, res, next) => {
  const { id } = req.user;
  const answer = await req.answer.vote(id, 1);
  req.question.save();
  res.json(answer);
};

exports.downvote = async (req, res, next) => {
  const { id } = req.user;
  const answer = await req.answer.vote(id, -1);
  req.question.save();
  res.json(answer);
};

exports.unvote = async (req, res, next) => {
  const { id } = req.user;
  const answer = await req.answer.vote(id, 0);
  req.question.save();
  res.json(answer);
};

exports.validate = [
  body('text')
    .exists()
    .trim()
    .withMessage('is required')

    .notEmpty()
    .withMessage('cannot be blank')

    .isLength({ max: 5000 })
    .withMessage('must be at most 5000 characters long')
];
