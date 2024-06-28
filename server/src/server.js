import http from 'node:http';
import app from './app.js';
import { loadPlanetsData } from './models/planets.model.js';

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

await loadPlanetsData();

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
