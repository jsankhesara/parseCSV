// Dependencies
const express = require('express');
const { upload } = require('../../helper/multer');
const moduleRoute = express.Router();
const fileUploadController = require('./fileUploadController');

const fileUploadMiddleware = [
    upload.any(),
    fileUploadController.csvFileUpload,
];
moduleRoute.post('/csv-file-upload', fileUploadMiddleware);

module.exports = moduleRoute;