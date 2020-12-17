import React, { useState, useEffect } from 'react';

import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import { FilledInput } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Snackbar from '@material-ui/core/Snackbar';

import moment from 'moment';



function Trainings() {
    const [trainings, setTrainings] = useState([]);
    const [search, setSearch] = useState('');
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    } 

    const handleClose = () => {
        setOpen(false);
    } 
    
    useEffect(() => {
        getCustomerInfo();
    }, [])
    
    const getCustomerInfo = (getCustomers) => {
        fetch('https://customerrest.herokuapp.com/gettrainings', {
            method: 'GET',
            headers: {
                'Content-type' : 'application/json'
            },
            body: JSON.stringify(getCustomers)
        })
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(err => console.error(err))
    }  

    const deleteTraining = (params) => {
        if(window.confirm('Are you sure?')) {
            fetch('https://customerrest.herokuapp.com/api/trainings/' + params.data.id, {
                method: 'DELETE',
            })
            .then(_ => getCustomerInfo())
            .then(_ => handleOpen())
            .catch(err => console.error(err))
            console.log(params.data.id)
        }
    }

    const columns = [
        {
            headerName: 'Date', 
            field: 'date',
            width: 140,
            sortable: true,
            filter: true,
            cellRenderer: (params) => {
                return moment(params.value).format("DD.MM.YYYY")
            }
        },
        {field: 'duration', sortable: true, filter: true, width: 140},
        {field: 'activity', sortable: true, filter: true, width: 140},
        {field: 'customer.firstname', sortable: true, filter: true, width: 190},
        {field: 'customer.lastname', sortable: true, filter: true, width: 190},
        {
            headerName: '',
            field: 'links.0.href',
            width: 85,
            cellRendererFramework: params => (console.log(params),
                <IconButton color='secondary' onClick={() => deleteTraining(params)}>
                    <DeleteIcon fontSize='small'/>
                </IconButton>
            )}
    ]

    const inputChanged = (event) => {
        setSearch(event.target.value)
    }

    return(
        <div>
            <h1>Training Data</h1>
            <div style={{marginRight: "18%", marginTop: 20, paddingBottom: 50}}>
        <FilledInput style={{float: 'inline-end', height: 40}} type="text" placeholder="Search" onInput={inputChanged}></FilledInput>
        </div>
            <div className='ag-theme-material' style={{height: 400, width: '65%', margin: 'auto', justifyContent: 'center'}}>
                <AgGridReact position="static"
                    rowData={trainings}
                    columnDefs={columns}
                    quickFilterText={search}
                    pagination="true"
                    paginationPageSize="10"
                    >
                </AgGridReact>
            </div>
            <Snackbar open={open} onClose={handleClose} autoHideDuration={2500} message='Training delete successful'/>
        </div>
    )
}

export default Trainings;