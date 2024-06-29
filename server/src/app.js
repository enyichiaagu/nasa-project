import path from 'node:path';
import { fileURLToPath } from 'node:url';

import express from 'express';
import cors from 'cors';

import planetsRouter from './routes/planets/planets.router.js';

const app = express();

app.use(
	cors({
		origin: 'http://localhost:3000',
	})
);

app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(planetsRouter);
// app.get('/', (req, res) => {
// 	res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
// });

export default app;
