import LabelService from '../services/LabelServices';
import React, { Component } from 'react'
import { Input, DialogActions } from '@material-ui/core'
import GetAllLabels from './GetAllLabels';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Check from '@material-ui/icons/Check'
import Close from '@material-ui/icons/Close'

const LabelServices = new LabelService();

class CreateLabel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            label: [],
            open: false,

        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClose = this.handleClose.bind(this)
    }

    handleChange = (e) => {
        this.setState({ label: e.target.value })
        console.log("label state more option", this.state.label);
    }
    addLabel = () => {
        const userId = localStorage.getItem('userid');
        var label = {
            'label': this.state.label,
            'isDeleted': false,
            'userId': userId,
        }

        LabelServices.addLabels(label)
            .then(response => {
                console.log("new label ", response);
                // this.props.addLabelToMoreOptions(response.data.id, this.state.label);
            })
    }

    closePopper() {
        this.setState({
            open: false,
        })
    }

    handleClickOpen() {
        this.setState({
            open: true,
        })
    }

    handleClose() {
        this.setState({
            open: false,
        })
    }
    render() {
        // return (
        // <ClickAwayListener onClickAway={() => this.closePopper()}>
        

        return (
            !this.props.addLabelOpen ?
            <div>
                <div onClick={this.handleClickOpen} style={{ cursor: 'pointer' }}>
                <img className="update-card-img"
                            src={require('../assets/img/edit_label.svg')}
                            alt="color picker" />
                                <span className="fundoo-text-sidebar">Edit Labels</span>
                </div>
                <Dialog
                    // fullScreen={fullScreen}
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">
                    {"Edit Label"}
                    </DialogTitle>
                    <DialogContent>
                        <div className="create-label-div">
                            <Close/>
                        <Input
                                placeholder="create new label"
                                name="label"
                                value={this.state.label}
                                color="black"
                                style={{ height: '70%', width: '100%' }}
                                onChange={this.handleChange}
                        />
                        <Check
                        onClick={this.addLabel}/>
                        </div>
                            <GetAllLabels 
                            editLabels = {this.state.open}
                            />
                    </DialogContent>
                    <DialogActions>
                        <span>Close</span>
                    </DialogActions>
                </Dialog>
            </div>

            :
            <div>
                    <div className="remind-heading">
                        Label note:
                    </div>
                    <div onClick={this.handleRemindToday}>
                        <div>
                            <Input
                                placeholder="create Label name"
                                name="label"
                                value={this.state.label}
                                color="black"
                                style={{ height: '70%', width: '100%' }}
                                onChange={this.handleChange}
                            />
                        </div>
                       
                        <div>
                                <GetAllLabels
                                createLabelNoteCreate = {true}
                                />

                        </div>
                        <div onClick={this.addLabel} style={{ cursor: 'pointer' }}>
                            <img
                                src={require('../assets/img/add_label.svg')}
                                alt="add label"
                                className="img"
                            />

                            <span>Create</span>
                            <label>"{this.state.label}"</label>
                        </div>
                    </div>
                </div>
            // </ClickAwayListener>
        )
    }
}

export default CreateLabel;