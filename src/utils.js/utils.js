import {
    getDataByValue,
    getDataByStatus,
    getDataByValueAndStatus,
} from '../service/service';

/**
 * @var {sortRows} sortRows Sort the rows based on the parameters. This can be per field and ascending or descending
 * @param {Array} dataToOrder  All rows to order
 * @param {String} field Field that is used for ordered the table
 * @param {String} typeSort Type sort, this can be ascending or descending
 * @returns data sorted based on the parameters
 */
export const sortRows = (dataToOrder, field, typeSort) => {
    let valuesToSort = [];
    let dataOrdered = [];
    if (field === 'cuit' && (typeSort === 'asc' || typeSort === 'desc')) {
        dataToOrder.map((objData) => {
            valuesToSort.push(Number(objData[field]));
        });
        typeSort === 'asc'
            ? valuesToSort.sort((a, b) => {
                  return a - b;
              })
            : valuesToSort.sort((a, b) => {
                  return b - a;
              });

        valuesToSort.map((value) => {
            let valueParsed = value.toString();
            dataToOrder.map((objData) => {
                if (objData[field] === valueParsed) {
                    dataOrdered.push(objData);
                }
            });
        });
    } else if (
        field === 'commerce' &&
        (typeSort === 'asc' || typeSort === 'desc')
    ) {
        dataToOrder.map((objData) => {
            valuesToSort.push(objData[field]);
        });
        typeSort === 'asc' ? valuesToSort.sort() : valuesToSort.reverse();

        valuesToSort.map((value) => {
            dataToOrder.map((objData) => {
                if (objData[field] === value) {
                    dataOrdered.push(objData);
                }
            });
        });
    } else {
        alert('Por favor seleccione un tipo y forma de ordenamiento');
        return dataToOrder;
    }
    return dataOrdered;
};

/**
 * @var {getDataFiltered} getDataFiltered Evaluate the case and filter according to the type of search
 * @param {String} valueInput
 * @param {String} valueSelect It can be All, Active = 1, Not active = 0
 * @returns Response API
 */
export const getDataFiltered = (valueInput, valueSelect) => {
    if (valueInput && (valueSelect === '0' || valueSelect === '1')) {
        return getDataByValueAndStatus(valueInput, valueSelect);
    }

    //Search only to value input
    else if (valueInput && valueSelect === 'todos') {
        return getDataByValue(valueInput);
    }
    //Search only to value select
    else if (!valueInput && (valueSelect === '0' || valueSelect === '1')) {
        return getDataByStatus(valueSelect);
    }
    //Search all records
    else if (valueSelect === 'todos') {
        window.location.reload();
    }
};
