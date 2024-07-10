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

// Middleware
app.use(cors());
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
                const kpiDataCollection = mongoose.connection.collection('kpiData');
                await kpiDataCollection.insertMany(results);

                // Remove the file after processing
                fs.unlinkSync(filePath);

                res.json({ message: 'File uploaded and data stored in kpiData collection' });
            } catch (error) {
                res.status(500).json({ message: 'Error processing file' });
            }
        });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

