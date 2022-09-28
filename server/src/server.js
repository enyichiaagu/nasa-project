const http = require('node:http');

const mongoose = require('mongoose');

const app = require('./app')

const { loadPlanetsData } = require('./models/planets.model');

const PORT = process.env.PORT || 8000;

const MONGO_URL = 'mongodb+srv://admin:Mjkql7tzpO4lA7NX@cluster0.rmdcihk.mongodb.net/?retryWrites=true&w=majority';

const server = http.createServer(app)

async function startServer() {
    await mongoose.connect(MONGO_URL);
    await loadPlanetsData();

    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`)
    });
}

startServer();
