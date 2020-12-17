import React, { useState, useEffect } from 'react';

import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import moment from 'moment';

import { FilledInput } from '@material-ui/core';


function Trainings() {
    const [trainings, setTrainings] = useState([]);
    const [search, setSearch] = useState('');
    
    useEffect(() => {
        getTrainings();
    }, [])

    const getTrainings = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
        .then(response => response.json())
        .then(data => setTrainings(data.content))
        .catch(err => console.error(err))
    } 

    const columns = [
        {
            headerName: 'Date', field: 'date',
            width: 150,
            sortable: true,
            filter: true,
            cellRenderer: (params) => {
                return moment(params.value).format("DD.MM.YYYY")
            }
        },
        {field: 'duration', sortable: true, filter: true, width: 170},
        {field: 'activity', sortable: true, filter: true, width: 170},

    ]

    const inputChanged = (event) => {
        setSearch(event.target.value)
    }

    return(
        <div>
            <h1>Training Data</h1>
            <div style={{marginLeft: "23%", marginTop: 20, paddingBottom: 60}}>
                <FilledInput style={{float: 'inline-start', height: 40}} type="text" placeholder="Search" onInput={inputChanged}></FilledInput>
            </div>
            <div className='ag-theme-material' style={{height: 400, width: '55%', margin: 'auto', justifyContent: 'center'}}>
                <AgGridReact position="static"
                    rowData={trainings}
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

export default Trainings;