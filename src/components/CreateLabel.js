import LabelService from '../services/LabelServices';
import React, { Component } from 'react'
import { Input, DialogActions, InputBase, Button } from '@material-ui/core'
import GetAllLabels from './GetAllLabels';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Check from '@material-ui/icons/Check'
import Close from '@material-ui/icons/Close'
import Add from '@material-ui/icons/Add'

const LabelServices = new LabelService();

class CreateLabel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            label: [],
            open: false,
            closeEdit: false,
            newLabel: [],

        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClose = this.handleClose.bind(this);
        this.labelToCards = React.createRef();
    }

    getNewLabel = (newLabel) => {
        console.log("newnote==>", newLabel);

        this.labelToCards.current.displayCard(newLabel);
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

                this.setState({
                    newLabel: response.data
                })
                console.log("new label ", this.state.newLabel);
                this.getNewLabel(response.data);
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

    handleCloseEdit = () => {
        this.setState({
            closeEdit: !this.state.closeEdit
        })
    }

    render() {
        // console.log("Createlable render ", this.props.noteID);

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
                        open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby="responsive-dialog-title"
                    >
                        <DialogTitle id="responsive-dialog-title">
                            {"Edit Label"}
                        </DialogTitle>
                        <DialogContent>
                            <div className="create-label-div">
                                {this.state.closeEdit ?
                                    <div style={{ display: "flex" }}>
                                        <Close
                                            onClick={this.handleCloseEdit}
                                            style={{ marginLeft: "-4px" }}
                                        />
                                        <Input
                                            placeholder="create new label"
                                            name="label"
                                            value={this.state.label}
                                            color="black"
                                            style={{ height: '65%', width: '100%' }}
                                            onChange={this.handleChange}
                                        />
                                        <Check
                                            onClick={this.addLabel}
                                        />
                                    </div>
                                    :
                                    <div style={{ display: "flex" }}>

                                        <Add
                                            onClick={this.handleCloseEdit}
                                            style={{ marginLeft: "-4px" }}
                                        />
                                        <input
                                            placeholder="create new label"
                                            name="label"
                                            style={{ height: '65%', width: '100%', border: "none" }}
                                            onClick={this.handleCloseEdit}
                                            readOnly
                                        />
                                    </div>
                                }

                            </div>
                            <GetAllLabels
                                editLabels={this.state.open}
                                newLabel={this.state.newLabel}
                                ref={this.labelToCards}
                                noteId={this.props.noteID}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button
                                className="close-btn"
                                onClick={this.handleClose}
                            >
                                Close
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
                :
                <div style={{ width: "200px", paddingLeft: "8%" }}>
                    <div>
                        Label note:
                    </div>
                    <div onClick={this.handleRemindToday}>
                        <div>
                            <InputBase
                                id="outlined-dense-multiline"
                                value={this.state.label}
                                onChange={this.handleChange}
                                margin="dense"
                                variant="outlined"
                                placeholder="create Label name"
                                multiline
                            />
                        </div>
                        <div>
                            <GetAllLabels
                                createLabelNoteCreate={true}
                                ref={this.labelToCards}
                                noteId={this.props.noteID}
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