const { SERVERERROR, SUCCESSCODE, ERROR400 } = require("../../constants/common");
const { FILE_UPLOADED, FILE_UPLOADED_ERROR } = require("../../constants/responseMessage");
const queryUtils = require("../../helper/queryutils");
const fs = require('fs');
const csv = require("fast-csv");
const utils = require('../../helper/utils');
const _ = require('lodash');

const fileUploadController = {};

/**
 * @description Csv file upload
 * @param {*} req 
 * @param {*} res
 * @returns 
 */

fileUploadController.csvFileUpload = async (req, res) => {
    try {
        const csvResult = [];
        if (utils.empty(req.files)) {
            return res.status(SERVERERROR.CODE).json({
                errors: { msg: SERVERERROR.MESSAGE },
                status: false
            });
        }
        fs.createReadStream(_.get(req, 'files.0.path', ''))
            .pipe(csv.parse({ headers: true }))
            .on("error", () => {
                return res.status(SERVERERROR.CODE).json({
                    errors: { msg: SERVERERROR.MESSAGE },
                    status: false
                });
            })
            .on('data', (data) => csvResult.push(data))
            .on('end', async () => {
                if (csvResult.length > 0) {
                    let tableName = req.files[0].filename.split('.');
                    let finalTableName = _.get(tableName, '0', '');
                    if (!utils.empty(finalTableName)) {
                        await queryUtils.createDynamicTable(finalTableName, Object.keys(_.get(csvResult, '0', 0)));
                        for (const csvKeys of csvResult) {
                            await queryUtils.insertedCustomerData(finalTableName, Object.keys(_.get(csvResult, '0', 0)), csvKeys.customerFirstName, csvKeys.customerLastName);
                        }
                    } else {
                        return res.status(ERROR400).json({
                            errors: { msg: FILE_UPLOADED_ERROR },
                            status: false
                        });
                    }
                }
            });
        return res.status(SUCCESSCODE.STANDARD)
            .json({
                msg: FILE_UPLOADED,
                status: true
            });
    } catch (error) {
        return res.status(SERVERERROR.CODE).json({
            errors: { msg: SERVERERROR.MESSAGE },
            status: false
        });
    }
};

module.exports = fileUploadController;