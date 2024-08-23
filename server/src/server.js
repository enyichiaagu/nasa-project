import http from 'node:http';
import app from './app.js';
import { mongoConnect } from './services/mongo.js';
import { loadPlanetsData } from './models/planets.model.js';
import { loadLaunchesData } from './models/launches.model.js';
import 'dotenv/config';

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

await mongoConnect();
await loadPlanetsData();
await loadLaunchesData();

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
