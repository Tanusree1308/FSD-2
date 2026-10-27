import { Router } from 'express';
import Exam from '../models/Exam.js';
import { requireAuth, requireAdmin } from '../middleware.js';

const router = Router();
const safeExam = exam => ({
  _id: exam._id, title: exam.title, description: exam.description, subject: exam.subject,
  durationMinutes: exam.durationMinutes, published: exam.published, createdAt: exam.createdAt,
  questions: exam.questions.map(q => ({ _id: q._id, text: q.text, options: q.options, marks: q.marks }))
});

router.get('/', requireAuth, async (req, res, next) => {
  try {
    const filter = req.user.role === 'admin' ? {} : { published: true };
    const exams = await Exam.find(filter).sort({ createdAt: -1 });
    res.json({ exams: exams.map(safeExam) });
  } catch (err) { next(err); }
});

router.get('/:id', requireAuth, async (req, res, next) => {
  try {
    const exam = await Exam.findById(req.params.id);
    if (!exam) return res.status(404).json({ message: 'Exam not found.' });
    if (!exam.published && req.user.role !== 'admin') return res.status(404).json({ message: 'Exam not found.' });
    res.json({ exam: safeExam(exam) });
  } catch (err) { next(err); }
});

router.post('/', requireAuth, requireAdmin, async (req, res, next) => {
  try {
    const { title, description, subject, durationMinutes, questions } = req.body;
    if (!title?.trim() || !Array.isArray(questions) || questions.length === 0) return res.status(400).json({ message: 'Title and at least one question are required.' });
    for (const [i, q] of questions.entries()) {
      if (!q.text?.trim() || !Array.isArray(q.options) || q.options.length < 2 || !Number.isInteger(q.correctAnswer) || q.correctAnswer < 0 || q.correctAnswer >= q.options.length) {
        return res.status(400).json({ message: `Question ${i + 1} has invalid text, options or correct answer.` });
      }
    }
    const exam = await Exam.create({ title: title.trim(), description, subject, durationMinutes: Number(durationMinutes), questions, createdBy: req.user._id });
    res.status(201).json({ exam: safeExam(exam), message: 'Exam created as a draft.' });
  } catch (err) { next(err); }
});

router.patch('/:id/publish', requireAuth, requireAdmin, async (req, res, next) => {
  try {
    const exam = await Exam.findById(req.params.id);
    if (!exam) return res.status(404).json({ message: 'Exam not found.' });
    exam.published = Boolean(req.body.published);
    await exam.save();
    res.json({ exam: safeExam(exam), message: exam.published ? 'Exam published.' : 'Exam unpublished.' });
  } catch (err) { next(err); }
});
export default router;
