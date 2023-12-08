import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import {sendJsonResponse, sendEmail} from './common/functions.js';
import {expressjwt} from 'express-jwt';
import cors from 'cors';
import hateoasLinker from 'express-hateoas-links';

// Routes
import {router as taskRouter} from './routes/taskRoutes.js';
import {router as authRouter} from './routes/authRoutes.js';

// Main API app
const app = express();
const port = process.env.PORT;

// API config
app.disable('x-powered-by');
app.use(morgan('combined'));
app.use(express.json());
mongoose.set('strictQuery', false);

const corsOptions = {
  origin: process.env.BASE_URI,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(hateoasLinker);

// Configure routes

app.get('/', (req, res, next) => {
  sendJsonResponse(req, res, next, 200, '', 'Welcome to Task Tracker.', [
    {rel: 'self', method: 'GET', href: '/'},
    {rel: 'create-account', method: 'POST', href: '/auth/signup'},
    {rel: 'create-token', method: 'POST', href: '/auth/token'},
  ]);
});

app.use(
    '/task',
    expressjwt({
      secret: process.env.JWT_SECRET,
      algorithms: [process.env.JWT_ALGO],
    }),
    taskRouter,
);
// app.use('/tasks', (req, res) => {
//   res.redirect(301, '/task');
// });
app.use('/auth', authRouter);

// Error handling
app.use(function(err, req, res, next) {
  console.log(err.name);
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({
      status: 'failed',
      data: '',
      message: 'invalid token',
    });
  } else {
    console.log(err.name);
    res.status(500).json({
      status: 'failed',
      data: '',
      message: 'something went wrong',
    });
  }
});

// Connect to DB and start server
mongoose
    .connect(process.env.MONGO_URI, {dbName: 'tasks'})
    .then(() => {
      console.log('Connect to DB');
      app.listen(port, () => {
        console.log(`API started on port ${port}`);
      });
    })
    .catch((error) => console.log(error));
