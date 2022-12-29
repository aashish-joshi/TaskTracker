import * as dotenv from 'dotenv'
dotenv.config()

import Express from "express";
import mongoose from 'mongoose';
import morgan from 'morgan';
import { sendJsonResponse } from './common/functions.js';


// Routes
import { router as taskRouter } from './routes/taskRoutes.js';
import { router as authRouter } from './routes/authRoutes.js';

// Main API app
const app = Express();
const port = process.env.PORT || 3000;

app.disable('x-powered-by');

app.use(morgan('dev'));
app.use(Express.json());
mongoose.set('strictQuery', false);

// Configure routes
app.get('/', (req, res, next) => {
  sendJsonResponse(req, res, next, 200, "", "Welcome to Task Tracker.")
})

app.use('/task', taskRouter);
app.use('/tasks', (req, res) => {
  res.redirect(301, '/task');
})
app.use('/auth', authRouter);

// Error handling
app.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({
      status: "failed",
      data:"",
      message: "invalid token"
    });
  } else {
    next(err);
  }
});

// Connect to DB and start server
mongoose.connect(process.env.MONGO_URI, {dbName: 'tasks'})
.then(() => {
  console.log('Connect to DB')
  app.listen(port, () => {
    console.log(`API started on port ${port}`);
  });
})
.catch(error => console.log(error));
