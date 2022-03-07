import React from 'react';

import style from './dataTable.module.css';

const DataTable = ({
    columns,
    rows,
    currentPage,
    generatePage,
    maxPages,
    rowsPerPage,
}) => {
    let displayRows = [];
    if (rows.length > rowsPerPage) {
        displayRows = rows.slice(0, rowsPerPage);
    } else {
        displayRows = rows;
    }
    return (
        <div className={style.dataTable}>
            <table>
                <caption className={style.title}>Tabla de comercios</caption>
                <thead>
                    <tr>
                        {columns.map((column, index) => (
                            <th key={index} id={column.id}>
                                {column.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {displayRows?.length &&
                        displayRows.map((dataRow, index) => {
                            return (
                                <tr key={index}>
                                    {Object.entries(dataRow).map(
                                        ([key, value], index) => {
                                            return key === 'active' ? (
                                                <td headers={key} key={index}>
                                                    {value ? 'Si' : 'No'}
                                                </td>
                                            ) : (
                                                <td headers={key} key={index}>
                                                    {value}
                                                </td>
                                            );
                                        }
                                    )}
                                </tr>
                            );
                        })}
                </tbody>
            </table>
            <div className={style.buttonsBox}>
                <button
                    value='Back'
                    onClick={(e) => generatePage(e.target.value)}
                    className={style.button}>
                    {'<'}
                </button>
                <p className={style.page}>
                    {currentPage}/{maxPages === 0 ? 1 : maxPages}
                </p>
                <button
                    value='Next'
                    onClick={(e) => generatePage(e.target.value, maxPages)}
                    className={style.button}>
                    {'>'}
                </button>
            </div>
        </div>
    );
};

export default DataTable;
