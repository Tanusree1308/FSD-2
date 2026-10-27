
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoose from 'mongoose';

import authRoutes from './routes/auth.js';
import examRoutes from './routes/exams.js';
import attemptRoutes from './routes/attempts.js';

const app = express();

// Security middleware
app.use(helmet());

// CORS configuration for local development and Render deployment
const allowedOrigins = (
  process.env.CLIENT_ORIGIN ||
  'http://localhost:5173'
)
  .split(',')
  .map(origin => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Parse JSON request bodies
app.use(express.json({ limit: '1mb' }));

// API rate limiting
app.use(
  '/api/',
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 300,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
  })
);

// Health-check endpoint
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'Online Exam & Quiz Portal API',
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/exams', examRoutes);
app.use('/api/attempts', attemptRoutes);

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({
    message: `Route not found: ${req.method} ${req.path}`,
  });
});

// Central error handler
app.use((err, _req, res, _next) => {
  console.error(err);

  if (err?.code === 11000) {
    return res.status(409).json({
      message: 'That value is already in use.',
    });
  }

  if (
    err?.name === 'ValidationError' ||
    err?.name === 'CastError'
  ) {
    return res.status(400).json({
      message: err.message,
    });
  }

  res.status(500).json({
    message: 'Server error. Check backend logs.',
  });
});

// Start server only after MongoDB connects
const port = Number(process.env.PORT || 5000);

try {
  if (!process.env.MONGODB_URI || !process.env.JWT_SECRET) {
    throw new Error(
      'Set MONGODB_URI and JWT_SECRET in the backend environment variables.'
    );
  }

  await mongoose.connect(process.env.MONGODB_URI);

  console.log('Connected to MongoDB');

  app.listen(port, '0.0.0.0', () => {
    console.log(`API listening on port ${port}`);
  });
} catch (error) {
  console.error('Startup failed:', error.message);
  process.exit(1);
}
