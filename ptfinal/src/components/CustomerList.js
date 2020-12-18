import React, { useState, useEffect } from 'react';

import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Snackbar from '@material-ui/core/Snackbar';

import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import AddTraining from './AddTraining';
import { FilledInput } from '@material-ui/core';

function CustomerList(props) {
    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState('')

    useEffect(() => {
        getCustomers();
    }, [])

    const handleOpen = () => {
        setOpen(true);
    } 

    const handleClose = () => {
        setOpen(false);
    } 

    const getCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err))
    }

    const addCustomer = (newCustomer) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'POST',
            headers: {
                'Content-type' : 'application/json'
            },
            body: JSON.stringify(newCustomer)
        })
        .then (response => getCustomers())
        .catch(err => console.error(err))
    }

    const addTraining = (newTraining) => {
        fetch('https://customerrest.herokuapp.com/api/trainings', {
            method: 'POST',
            headers: {
                'Content-type' : 'application/json'
            },
            body: JSON.stringify(newTraining)
        })
        .catch(err => console.error(err))
        console.log(newTraining)
    }

    const updateCustomer = (link, customer) => {
        fetch(link, {
            method: 'PUT',
            headers: {
                'Content-type' : 'application/json'
            },
            body: JSON.stringify(customer)
        })
        .then(response => getCustomers())
        .catch(err => console.error(err))
    }

    const deleteCustomer = (params) => {
        if(window.confirm('Are you sure?')) {
            fetch(params.value, {
                method: 'DELETE'
            })
            .then(_ => getCustomers())
            .then(_ => handleOpen())
            .catch(err => console.error(err))
        }
    }

    const columns = [
        {
            headerName: 'Add Event',
            field: 'links.2.href',
            width: 110,
            cellRendererFramework: params => 
            <AddTraining addTraining={addTraining} params={params}>
            </AddTraining>
        },
        {field: 'firstname', sortable: true, filter: true, width: 130},
        {field: 'lastname', sortable: true, filter: true, width: 140},
        {field: 'streetaddress', sortable: true, filter: true, width: 170},
        {field: 'postcode', sortable: true, filter: true, width: 130},
        {field: 'city', sortable: true, filter: true, width: 140},
        {field: 'email', sortable: true, filter: true, width: 170},
        {field: 'phone', sortable: true, filter: true, width: 140},
       // {field: 'content', sortable: true, filter: true, width: 170},
       {
        headerName: 'Edit',
        field: 'links.0.href',
        width: 85,
        cellRendererFramework: params =>
                <EditCustomer updateCustomer={updateCustomer} params={params}>
                </EditCustomer>
    },
    {
        headerName: 'Delete',
        field: 'links.0.href',
        width: 95,
        cellRendererFramework: params => 
            <IconButton color='secondary' onClick={() => deleteCustomer(params)}>
                <DeleteIcon fontSize='small'/>
            </IconButton>
    }
    ]
    

    const inputChanged = (event) => {
        setSearch(event.target.value)
    }

    return(
        <div>
            <h1>Customer Data</h1>
            <AddCustomer addCustomer={addCustomer}/>
            <div style={{marginRight: "8%", marginTop: 5, marginBottom: 50}}>
        <FilledInput style={{float: 'inline-end', height: 40}} type="text" placeholder="Search" onInput={inputChanged}></FilledInput>
        </div>
            <div className='ag-theme-material' style={{height: 380, width: '85%', margin: 'auto', justifyContent: 'center'}}>
                <AgGridReact position="static" 
                    rowData={customers}
                    columnDefs={columns}
                    quickFilterText={search}
                    pagination="true"
                    paginationPageSize="10"
                    >
                </AgGridReact>
            </div>
             <Snackbar open={open} onClose={handleClose} autoHideDuration={2500} message='Customer delete successful'/>
        </div>
    )
}

export default CustomerList;