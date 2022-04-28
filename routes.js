const express = require('express');

const route = express.Router();
route.use('/', require('./modules/fileUpload/fileUploadRoutes'));

module.exports = route;