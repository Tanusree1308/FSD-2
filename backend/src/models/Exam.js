import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  text: { type: String, required: true, trim: true },
  options: { type: [String], validate: v => v.length >= 2 && v.length <= 6, required: true },
  correctAnswer: { type: Number, required: true, min: 0 },
  marks: { type: Number, default: 1, min: 1 }
}, { _id: true });

const examSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 120 },
  description: { type: String, default: '', maxlength: 1000 },
  subject: { type: String, default: 'General' },
  durationMinutes: { type: Number, required: true, min: 1, max: 300 },
  questions: { type: [questionSchema], validate: v => v.length > 0 },
  published: { type: Boolean, default: false },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

export default mongoose.model('Exam', examSchema);
