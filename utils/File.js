'use strict';

const fastCsv = require('fast-csv');
const json2csv = require('json2csv');
const csvToJson = require('csvtojson');

class File {
    /**
     * @param path
     * @return {Promise<any>}
     */
    static csvToJson(path) {
        return new Promise((resolve, reject) => {
            let data = [];
            csvToJson()
                .fromFile(path)
                .on('json', jsonObj => {
                    data.push(jsonObj);
                })
                .on('done', error => {
                    if (error) {
                        return reject(error);
                    }

                    return resolve(data);
                });
        });
    }

    /**
     * @param {Array.<object>} data
     * @return {*}
     */
    static jsonToCSV(data) {
        return json2csv.parse(data);
    }

    /**
     * @param path
     * @return {Promise<any>}
     */
    static validateCsv(path) {
        return new Promise(resolve => {
            fastCsv
                .fromPath(path, { headers: true })
                .on('data', () => {})
                .on('end', () => resolve(true))
                .on('error', () => resolve(false));
        });
    }

}

module.exports = File;
