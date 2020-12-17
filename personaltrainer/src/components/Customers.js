import React, { useState, useEffect } from 'react';

import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import { FilledInput } from '@material-ui/core';


function Customers() {
    const [customers, setCustomers] = useState([]);
    const [search, setSearch] = useState('')

    useEffect(() => {
        getCustomers();
    }, [])

    const getCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err))
    }

    const columns = [
        {field: 'firstname', sortable: true, filter: true, width: 170},
        {field: 'lastname', sortable: true, filter: true, width: 170},
        {field: 'streetaddress', sortable: true, filter: true, width: 170},
        {field: 'postcode', sortable: true, filter: true, width: 150},
        {field: 'city', sortable: true, filter: true, width: 170},
        {field: 'email', sortable: true, filter: true, width: 170},
        {field: 'phone', sortable: true, filter: true, width: 150},
        //{field: 'content', sortable: true, filter: true, width: 170},
    ]

    const inputChanged = (event) => {
        setSearch(event.target.value)
    }

    return(
        <div>
            <h1>Customer Data</h1>
            <div style={{marginLeft: "15%", marginTop: 5, marginBottom: 80}}>
                <FilledInput style={{float: 'inline-start', height: 40}} type="text" placeholder="Search" onInput={inputChanged}></FilledInput>
            </div>
            <div className='ag-theme-material' style={{height: 380, width: '80%', margin: 'auto', justifyContent: 'center'}}>
                <AgGridReact position="static"
                    rowData={customers}
                    columnDefs={columns}
                    quickFilterText={search}
                    pagination="true"
                    paginationPageSize="10"
                    >
                </AgGridReact>
            </div>
        </div>
    )
}

export default Customers;