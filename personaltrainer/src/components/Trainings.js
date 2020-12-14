import React, { useState, useEffect } from 'react';

import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import moment from 'moment';



function Trainings() {
    const [trainings, setTrainings] = useState([]);
    
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

    return(
        <div>
            <h1>Training Data</h1>
            <div className='ag-theme-material' style={{height: 500, width: '40%', margin: 'auto'}}>
                <AgGridReact
                    rowData={trainings}
                    columnDefs={columns}
                    pagination="true"
                    paginationPageSize="10"
                    >
                </AgGridReact>
            </div>
        </div>
    )
}

export default Trainings;