const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var useragent = require('express-useragent');
const http = require('http');
const { INVALID_REQUEST } = require('./constants/responseMessage');
require('dotenv').config();

/* set up the express app */
const app = express();
require('./config/database');

app.use(useragent.express());
app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use('/css', express.static(__dirname + '/css'));
app.use(express.json());

app.use(cors());

// // request handlers
app.get('/', (_req, res) => {
    res.status(200).json({ message: 'Enable CORS in Node.js - Clue Mediator' });
});

const server = http.createServer(app);
app.use(express.static(__dirname + 'public'));

// require our routes into the application.
app.use(require('./routes'));

// // setup a default catch-all route that sends back a welcome message in JSON format.
app.all('/*', (_req, res) => {
    return res.status(404).json({
        errors: { msg: INVALID_REQUEST },
        status: false
    });
});

// Handling Errors
app.use((err, _req, res, _next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    res.status(err.statusCode).json({
        message: err.message,
    });
});

server.listen(8081, () => console.log('Server is running on port 8081'));