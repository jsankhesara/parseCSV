const { conn } = require("../config/database");

const queryUtils = {};
const { SERVERERROR, SUCCESSCODE, UNAUTHORISED } = require("../constants/common");
const { TABLE_CREATED, INSERTD } = require("../constants/responseMessage");
const utils = require("../helper/utils");

/**
 * @description Generate Dynamic table
 * @param {*} tableName 
 * @param {*} columnsName 
 * @returns 
 */

queryUtils.createDynamicTable = async (tableName, columnsName) => {
    let returnObj = {};
    return new Promise(async function (resolve, reject) {
        if (!utils.empty(conn)) {
            let sql = `CREATE TABLE ${tableName} (${columnsName[0]} VARCHAR(255), ${columnsName[1]} VARCHAR(255))`;
            await conn.query(sql, async function (err, _result) {
                if (!utils.empty(err)) {
                    returnObj.msg = err.sqlMessage;
                    returnObj.code = SERVERERROR.CODE;
                    returnObj.status = false;
                    reject(returnObj);
                }
                else {
                    returnObj.msg = TABLE_CREATED;
                    returnObj.code = SUCCESSCODE.STANDARD;
                    returnObj.status = true;
                    resolve(returnObj);
                }
            });
        }
        else {
            returnObj.msg = UNAUTHORISED.MESSAGE;
            returnObj.code = UNAUTHORISED.CODE;
            returnObj.status = false;
            resolve(returnObj);
        }
    }).then((returnObjCreate) => {
        console.log("returnObjCreate", returnObjCreate);
    }).catch((error) => {
        console.log("error", error);
    });
};

/**
 * @description Insert Dynamic table data
 * @param {*} tableName 
 * @param {*} columnsName 
 * @returns 
 */

queryUtils.insertedCustomerData = async (tableName, columnsName, customerFirstName, customerLastName) => {
    let returnObj = {};
    return new Promise(async function (resolve, reject) {
        if (!utils.empty(conn)) {
            let insertSQL = `INSERT INTO ${tableName} (${columnsName[0]}, ${columnsName[1]}) VALUES (?,?)`;
            let params = [customerFirstName, customerLastName];
            await conn.query(insertSQL, params, async function (err) {
                if (!utils.empty(err)) {
                    returnObj.msg = err.sqlMessage;
                    returnObj.code = SERVERERROR.CODE;
                    returnObj.status = false;
                    reject(returnObj);
                }
                else {
                    returnObj.msg = INSERTD;
                    returnObj.code = SUCCESSCODE.STANDARD;
                    returnObj.status = true;
                    resolve(returnObj);
                }
            });
        }
        else {
            returnObj.msg = UNAUTHORISED.MESSAGE;
            returnObj.code = UNAUTHORISED.CODE;
            returnObj.status = false;
            resolve(returnObj);
        }
    }).then((returnObjInsert) => {
        console.log("returnObjInsert", returnObjInsert);
    }).catch((errorInsert) => {
        console.log("errorInsert", errorInsert);
    });
};

module.exports = queryUtils;