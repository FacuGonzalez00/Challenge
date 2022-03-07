import dataMock from '../staticResource/mockData.json';

const urlApi = 'https://api.koibanx.com/stores';

/**
 * @var {simulateApi} simulateApi Simulate the behavior and response of the API
 */
const simulateApi = {
    retrieveAlldata: () => {
        return dataMock;
    },
    retrieveDataByValue: (valueSearch) => {
        let dataFiltered = [];
        dataMock.data.map((objData) => {
            if (
                objData.commerce.match(valueSearch) ||
                objData.id.toString().match(valueSearch) ||
                objData.cuit.match(valueSearch)
            ) {
                dataFiltered.push(objData);
            }
        });

        const response = {
            'data': dataFiltered,
            'page': 1,
            'pages': Math.round(dataFiltered.length / 4),
            'rowsPerPage': 4,
            'total': 1000,
        };
        return response;
    },
    retrieveDataByStatus: (status) => {
        let statusParsed = Number(status);
        let dataFiltered = [];
        dataMock.data.map((objData) => {
            if (objData.active === statusParsed) {
                dataFiltered.push(objData);
            }
        });
        const response = {
            'data': dataFiltered,
            'page': 1,
            'pages': Math.round(dataFiltered.length / 4),
            'rowsPerPage': 4,
            'total': 1000,
        };
        return response;
    },
    retrieveDataByValueAndStatus: (valueSearch, status) => {
        let statusParsed = Number(status);
        let dataFiltered = [];
        dataMock.data.map((objData) => {
            if (
                (objData.commerce.match(valueSearch) ||
                    objData.id.toString().match(valueSearch) ||
                    objData.cuit.match(valueSearch)) &&
                objData.active === statusParsed
            ) {
                dataFiltered.push(objData);
            }
        });
        const response = {
            'data': dataFiltered,
            'page': 1,
            'pages': Math.round(dataFiltered.length / 4),
            'rowsPerPage': 4,
            'total': 1000,
        };
        return response;
    },
};

/**
 * @var {getAllData} getAllData Called to method of simulate Api and retrieve all data
 * @returns All data without filter
 */
export const getAllData = () => {
    return simulateApi.retrieveAlldata();
};

/**
 * @var {getDataByValue} getDataByValue Called to method of simulate Api and retrieve all records that match with value searched
 * @param {String} valueSearch Value entered in the search
 * @returns All records that match with value search
 */
export const getDataByValue = (valueSearch) => {
    console.log(
        `${urlApi}?q={'$or':[{'commerce':{'$regex':.${valueSearch}*}},{id:{'$regex':.${valueSearch}*}},{cuit:{'$regex':.${valueSearch}*}}]}`
    );
    return simulateApi.retrieveDataByValue(valueSearch);
};

/**
 * @var {getDataByStatus} getDataByStatus Called to method of simulate Api and retrieve all records that match with status searched
 * @param {String} status If the status is equal to '1' it means that active records are being searched. If the status is equal to '0' it means that not active records are being searched
 * @returns All records that match with status searched
 */
export const getDataByStatus = (status) => {
    console.log(`${urlApi}?q={'active':${status}}`);
    return simulateApi.retrieveDataByStatus(status);
};

/**
 * @var {getDataByValueAndStatus} getDataByValueAndStatus Called to method of simulate Api and retrieve all records that match with value searched and status searched
 * @param {*} valueSearch  Value entered in the search
 * @param {*} status If the status is equal to '1' it means that active records are being searched. If the status is equal to '0' it means that not active records are being searched
 * @returns All records that match with value searched and status searched
 */
export const getDataByValueAndStatus = (valueSearch, status) => {
    console.log(
        `${urlApi}?q={$and:[{'$or':[{'commerce':{'$regex':.${valueSearch}*}},{id:{'$regex':.${valueSearch}*}},{cuit:{'$regex':.${valueSearch}*}}]},{'active':${status}}]}`
    );
    return simulateApi.retrieveDataByValueAndStatus(valueSearch, status);
};
