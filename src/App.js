import React, { useEffect, useState } from 'react';
import './App.css';

import { getAllData } from './service/service';

import { getDataFiltered, sortRows } from './utils.js/utils';

import DataTable from './components/dataTable/dataTable';
import NavBar from './components/navBar/navBar';

/**
 * Challenge Koibanx
 * author: Facundo Gonzalez
 * date:7/3/2022
 */
function App() {
    const [dataToUse, setDataToUse] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsToShow, setRowsToShow] = useState(getAllData().data);

    const columns = [
        { id: 'id', label: 'ID' },
        { id: 'commerce', label: 'Comercio' },
        { id: 'cuit', label: 'CUIT' },
        { id: 'concept1', label: 'Concepto 1' },
        { id: 'concept2', label: 'Concepto 2' },
        { id: 'concept3', label: 'Concepto 3' },
        { id: 'concept4', label: 'Concepto 4' },
        { id: 'concept5', label: 'Concepto 5' },
        { id: 'concept6', label: 'Concepto 6' },
        { id: 'currentBalance', label: 'Balance Actual' },
        { id: 'active', label: 'Activo' },
        { id: 'lastSale', label: 'Ultima Venta' },
    ];

    useEffect(() => {
        setDataToUse(getAllData());
    }, []);

    /**
     *
     * @var {generateRowsToShow} generateRowsToShow Generate the rows to show in the next or back page
     * @param typeGenerate Reference to if go to next page or back page
     */
    const generateRowsToShow = (typeGenerate) => {
        if (typeGenerate === 'Next') {
            const lastRow = (currentPage + 1) * dataToUse?.rowsPerPage;
            const firstRow = lastRow - dataToUse?.rowsPerPage;
            let slicedData = dataToUse?.data.slice(firstRow, lastRow);
            setCurrentPage((currentPage) => currentPage + 1);
            setRowsToShow(slicedData);
        } else {
            const lastRow = (currentPage - 1) * dataToUse?.rowsPerPage;
            const firstRow = lastRow - dataToUse?.rowsPerPage;
            let slicedData = dataToUse?.data.slice(firstRow, lastRow);
            setCurrentPage((currentPage) => currentPage - 1);
            setRowsToShow(slicedData);
        }
    };

    /**
     * @var {generatePage} generatePage Validate that the following page is valid before creating the rows
     * @param {String} typeGenerate Reference to if go to next page or back page
     * @param {Number} maxPages This param is used to limit number pages
     */
    const generatePage = (typeGenerate, maxPages) => {
        if (typeGenerate === 'Next' && currentPage < maxPages) {
            generateRowsToShow(typeGenerate);
        } else if (typeGenerate === 'Back' && currentPage > 1) {
            generateRowsToShow(typeGenerate);
        }
    };

    /**
     * @var {handlerSearch} handlerSearch Manager the values that recived in the event and set in the state the result of API
     * @param {Event} e Values of event
     */
    const handlerSearch = (e) => {
        e.preventDefault();
        const valueInput = e.target[0].value;
        const valueSelect = e.target[1].value;

        let newDataToUse = getDataFiltered(valueInput, valueSelect);
        if (newDataToUse.data.length) {
            setRowsToShow(newDataToUse.data);
            setDataToUse(newDataToUse);
        } else {
            return alert('No se encontraron coincidencias');
        }
    };

    /**
     * @var {handlerSort} handlerSort Manager the values that recived in the event and set in the state the result of function sortRows
     * @param {Event} e Values of event
     */
    const handlerSort = (e) => {
        e.preventDefault();
        let field = e.target[0].checked
            ? e.target[0].value
            : e.target[1].checked
            ? e.target[1].value
            : '';
        let typeSort = e.target[2].value;
        let dataSorted = sortRows(dataToUse.data, field, typeSort);
        setRowsToShow(dataSorted);
        dataToUse.data = dataSorted;
    };

    return (
        <div className='App'>
            <div className='Container'>
                <NavBar
                    handlerSearch={handlerSearch}
                    handlerSort={handlerSort}
                />
                <DataTable
                    columns={columns}
                    rows={rowsToShow}
                    currentPage={currentPage}
                    generatePage={generatePage}
                    maxPages={dataToUse?.pages}
                    rowsPerPage={dataToUse?.rowsPerPage}
                />
            </div>
        </div>
    );
}

export default App;
