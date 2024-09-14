import path from 'node:path';

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import api from './routes/api.js';

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);

app.use(morgan('combined'));
app.use(express.json());

app.use(express.static(path.join(import.meta.dirname, '..', 'public')));

app.use('/v1', api);
app.get('/*', (req, res) => {
  res.sendFile(path.join(import.meta.dirname, '..', 'public', 'index.html'));
});

export default app;
