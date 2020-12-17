import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import moment from 'moment';

function AddTraining(props) {
    const [training, setTraining] = useState({
        date: moment().toISOString(),
        activity: '',
        duration: '',
        customer: (props.params.data.links[1].href)
    });
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        props.addTraining(training);
        handleClose();
    };

    const inputChanged = (event) => {
        setTraining({...training, [event.target.name] : event.target.value})
    }
    return(
        <div>
        <Button size="medium" color="primary" onClick={handleClickOpen} startIcon={<FitnessCenterIcon/>}>
        </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add New Training Session</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Date"
                        name="date"
                        value={training.date}
                        onChange={inputChanged}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Activity"
                        name="activity"
                        value={training.activity}
                        onChange={inputChanged}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Duration"
                        name="duration"
                        value={training.duration}
                        onChange={inputChanged}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                <Button onClick={handleSave} color="primary">
                    Save
                </Button>
                <Button onClick={handleClose} color="primary">
                Close
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    )

}

export default AddTraining;