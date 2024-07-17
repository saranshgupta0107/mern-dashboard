// server/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5500;


const corsOptions = {
    origin: 'http://localhost:3000', // Frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

// MongoDB connection
const uri = 'mongodb+srv://saranshgupta0107:saranshgupta0107@cluster0.q4ygfa2.mongodb.net/';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// File upload setup
const upload = multer({ dest: 'uploads/' });

// Models
const User = require('./models/User');

// Routes
app.use('/api/users', require('./routes/users'));

// File upload route
app.post('/api/upload', upload.single('file'), async (req, res) => {
    const filePath = req.file.path;

    const results = [];
    fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', async () => {
            try {
                // Create a new collection named kpiData and insert the CSV data
                const kpiDataCollection = mongoose.connection.collection('kpiData2');
                await kpiDataCollection.insertMany(results);

                // Remove the file after processing
                fs.unlinkSync(filePath);

                res.json({ message: 'File uploaded and data stored in kpiData collection' });
            } catch (error) {
                res.status(500).json({ message: 'Error processing file' });
            }
        });
});


// Endpoint to get unique states from kpiData collection
app.get('/api/states', async (req, res) => {
    try {
        const kpiDataCollection = mongoose.connection.collection('kpiData2');
        const states = await kpiDataCollection.distinct('state');
        res.json(states);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching states' });
    }
});

// Endpoint to get lat and long data from kpiData collection
app.get('/api/locations', async (req, res) => {
    try {
        const kpiDataCollection = mongoose.connection.collection('kpiData2');
        const locations = await kpiDataCollection.find({}, { projection: { _id: 0, lat: 1, lng: 1, city: 1 } }).toArray();
        res.json(locations);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching locations' });
    }
});


app.get('/api/data/:city', async (req, res) => {
    try {
        const city = req.params.city;
        const kpiDataCollection = mongoose.connection.collection('kpiData2');
        const data = await kpiDataCollection.find({ city }).toArray();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching data' });
    }
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

