import { Router } from 'express';
import Attempt from '../models/Attempt.js';
import Exam from '../models/Exam.js';
import { requireAuth } from '../middleware.js';

const router = Router();
router.post('/:examId/submit', requireAuth, async (req, res, next) => {
  try {
    const exam = await Exam.findById(req.params.examId);
    if (!exam || (!exam.published && req.user.role !== 'admin')) return res.status(404).json({ message: 'Exam not found.' });
    if (!Array.isArray(req.body.answers)) return res.status(400).json({ message: 'Answers must be an array.' });
    const answerMap = new Map(req.body.answers.map(a => [String(a.questionId), Number(a.selectedOption)]));
    let score = 0, totalMarks = 0;
    for (const question of exam.questions) {
      totalMarks += question.marks;
      if (answerMap.get(question._id.toString()) === question.correctAnswer) score += question.marks;
    }
    const answers = exam.questions.map(q => ({ questionId: q._id.toString(), selectedOption: answerMap.has(q._id.toString()) ? answerMap.get(q._id.toString()) : -1 }));
    const attempt = await Attempt.create({ user: req.user._id, exam: exam._id, answers, score, totalMarks, percentage: totalMarks ? Math.round(score / totalMarks * 100) : 0 });
    res.status(201).json({ attempt: { _id: attempt._id, score, totalMarks, percentage: attempt.percentage, submittedAt: attempt.submittedAt }, message: 'Exam submitted successfully.' });
  } catch (err) { next(err); }
});

router.get('/mine', requireAuth, async (req, res, next) => {
  try {
    const attempts = await Attempt.find({ user: req.user._id }).populate('exam', 'title subject').sort({ submittedAt: -1 });
    res.json({ attempts });
  } catch (err) { next(err); }
});
export default router;
