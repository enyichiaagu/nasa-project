import path from 'node:path';
import { fileURLToPath } from 'node:url';

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import planetsRouter from './routes/planets/planets.router.js';
import launchesRouter from './routes/launches/launches.router.js';

const app = express();

app.use(
	cors({
		origin: 'http://localhost:3000',
	})
);

app.use(morgan('combined'));
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(planetsRouter);
app.use(launchesRouter);
// app.get('/', (req, res) => {
// 	res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
// });

export default app;
