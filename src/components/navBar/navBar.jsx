import React from 'react';

import style from './navBar.module.css';

const NavBar = ({ handlerSearch, handlerSort }) => {
    return (
        <div className={style.navBarContainer}>
            <form
                className={style.searchForm}
                name='searchForm'
                onSubmit={(e) => handlerSearch(e)}>
                <input type='text' placeholder='Ingrese un valor' />
                <span> Estado: </span>
                <select name='status' id='status'>
                    <option value='todos' defaultValue>
                        Todos
                    </option>
                    <option value='1'>Activos</option>
                    <option value='0'>No Activos</option>
                </select>
                <button type='Submit' name='search'>
                    Buscar
                </button>
            </form>

            <div>
                <form
                    className={style.orderForm}
                    name='orderForm'
                    onSubmit={(e) => {
                        handlerSort(e);
                    }}>
                    <span>Ordenar por: </span>
                    <label>
                        Comercio
                        <input type='radio' value='commerce' name='orderBy' />
                    </label>
                    <label>
                        Cuit
                        <input type='radio' value='cuit' name='orderBy' />
                    </label>

                    <span>De forma: </span>

                    <select name='orderType' id='orderType'>
                        <option value='selectOne'>Seleccione Uno</option>
                        <option value='asc'>Ascendente</option>
                        <option value='desc'>Descendente</option>
                    </select>

                    <button type='Submit'>Ordenar</button>
                </form>
            </div>
        </div>
    );
};

export default NavBar;
