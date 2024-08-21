import mongoose from 'mongoose';
import 'dotenv/config';

const { MONGO_DB_USERNAME, MONGO_DB_PASSWORD } = process.env;

const MONGO_URL = `mongodb+srv://${MONGO_DB_USERNAME}:${MONGO_DB_PASSWORD}@nasacluster.gxcm26t.mongodb.net/?retryWrites=true&w=majority&appName=NASACluster`;

mongoose.connection.once('open', () =>
  console.log('MongoDB connection ready!')
);

mongoose.connection.on('error', (err) => console.error(err));

async function mongoConnect() {
  await mongoose.connect(MONGO_URL);
}

async function mongoDisconnect() {
  await mongoose.disconnect();
}

export { mongoConnect, mongoDisconnect };
