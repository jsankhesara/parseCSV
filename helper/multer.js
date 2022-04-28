'use strict';

const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const constants = require("../constants/common");
const { FILE_TYPE_NOT_VALID } = require('../constants/responseMessage');

const storage = multer.diskStorage({
    destination: function (_req, _file, cb) {
        cb(null, process.env.FILE_UPLOAD_PATH);
    },
    filename: function (_req, file, cb) {
        crypto.pseudoRandomBytes(16, function (_err, _raw) {
            cb(null, file.originalname);
        });
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function (_req, file, cb) {
        var filetypes = /csv/;
        var mimetype = filetypes.test(file.mimetype);

        var extname = filetypes.test(path.extname(
            file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }
        let errorObj = {
            statusCode: constants.SERVERERROR.CODE,
            message: FILE_TYPE_NOT_VALID
        };
        return cb(errorObj);
    }
});

module.exports = {
    upload
};