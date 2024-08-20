import http from 'node:http';
import mongoose from 'mongoose';
import app from './app.js';
import { loadPlanetsData } from './models/planets.model.js';
import 'dotenv/config';

const { MONGO_DB_USERNAME, MONGO_DB_PASSWORD, PORT } = process.env;

const MONGO_URL = `mongodb+srv://${MONGO_DB_USERNAME}:${MONGO_DB_PASSWORD}@nasacluster.gxcm26t.mongodb.net/?retryWrites=true&w=majority&appName=NASACluster`;

const server = http.createServer(app);

mongoose.connection.once('open', () =>
  console.log('MongoDB connection ready!')
);

mongoose.connection.on('error', (err) => console.error(err));

await mongoose.connect(MONGO_URL);
await loadPlanetsData();

server.listen(PORT || 8000, () => console.log(`Listening on port ${PORT}`));
