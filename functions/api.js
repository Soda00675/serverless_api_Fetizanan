const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');

// Import your Mongoose models and router
const mongoose = require('mongoose'); 
const router = require('./routes/author'); 


const app = express();

// Potentially define MongoDB connection URLs for deployment and local usage
const dbCloudUrl = 'your_cloud_mongodb_connection_string';
const dbLocalUrl = 'your_local_mongodb_connection_string';

app.use(cors());
app.use(express.json());
//app.use(bodyParser.urlencoded({ extended: true })); // Commented out: Potential redundancy


// Attempt MongoDB connection
mongoose.connect(dbCloudUrl || dbLocalUrl, { useNewUrlParser: true, useUnifiedTopology: true })
     .then(() => console.log('MongoDB Connected'))
     .catch(err => console.log(err));

app.use('/api/.netlify/functions/', router);

const port = process.env.PORT || 9000;
app.listen(port, () =>
  console.log(`Listening on port http://localhost:${port}`)
);

module.exports.handler = serverless(app);
