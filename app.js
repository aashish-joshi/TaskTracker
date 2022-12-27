import Express from "express";
import { router as taskRouter } from './routes/task.js';
const app = Express();

const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.use('/task', taskRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
