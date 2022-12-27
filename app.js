import * as dotenv from 'dotenv'
dotenv.config()

import Express from "express";
import mongoose from 'mongoose';
import morgan from 'morgan';

// Routes
import { router as taskRouter } from './routes/task.js';

// Main API app
const app = Express();
const port = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(Express.json());

// Configure routes
app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.use('/task', taskRouter);

// Connect to DB and start server
mongoose.connect(process.env.MONGO_URI, {dbName: 'tasks'})
.then(() => {
  console.log('Connect to DB')
  app.listen(port, () => {
    console.log(`API started on port ${port}`);
  });
})
.catch(error => console.log(error));
