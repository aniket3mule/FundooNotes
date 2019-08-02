import LabelService from '../services/LabelServices';
import React, { Component } from 'react'
import { Input, DialogActions, InputBase, Button, Tooltip } from '@material-ui/core'
import GetAllLabels from './GetAllLabels';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Check from '@material-ui/icons/Check'
import Close from '@material-ui/icons/Close'
import Add from '@material-ui/icons/Add'
import NoteService from '../services/NoteServices';

const LabelServices = new LabelService();
const NoteServices = new NoteService();

class CreateLabel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            label: [],
            open: false,
            closeEdit: false,
            newLabel: [],
            labelId:'',

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
    addLabel = async() => {
        const userId = localStorage.getItem('userid');
        var label = {
            'label': this.state.label,
            'isDeleted': false,
            'userId': userId,
        }

        await LabelServices.addLabels(label)
            .then(response => {

                this.setState({
                    newLabel: response.data,
                    labelId:  response.data.id
                })
                console.log("new label ",  response.data.id);
                this.getNewLabel(response.data);
                if(this.props.createNoteLabel){
                this.props.createLabelToMoreOptionForCreateNote(this.state.labelId)
            }
                /**function chip diplay on create label */
                this.addLabelToNote(this.props.noteID, this.state.newLabel)
            })
    }

    addLabelToNote = (noteId,labelName) => {
        var addData = {
            'noteId': noteId,
            'labelId': this.state.labelId,
            data: {
                'noteIdList': noteId,
                'label': labelName
            }
        }
        NoteServices.addLabelToNotes(addData)
            .then(() => {
                // this.props.getAllLabelsToCreateLabels(isChecked);
                console.log("updated successfully");

            })
            .catch((err) => {
                console.log("error in addlabeltonote", err);
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

    getAllLabelsToCreateLabels = (isChecked) => {
        this.props.createLabelToMoreOptions(isChecked)
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
                                        <Tooltip title="Create label">
                                            <Add
                                                onClick={this.handleCloseEdit}
                                                style={{ marginLeft: "-4px" }}
                                            />
                                        </Tooltip>
                                        <InputBase
                                            placeholder="create new label"
                                            name="label"
                                            style={{ height: '65%', width: '100%', border: "none" }}
                                            onClick={this.handleCloseEdit}
                                            readOnly
                                        />
                                    </div>

                                    :
                                    <div style={{ display: "flex" }}>
                                        <Tooltip title="Cancel">
                                            <Close
                                                onClick={this.handleCloseEdit}
                                                style={{ marginLeft: "-4px" }}
                                            />
                                        </Tooltip>
                                        <Input
                                            placeholder="create new label"
                                            name="label"
                                            value={this.state.label}
                                            color="black"
                                            style={{ height: '65%', width: '100%' }}
                                            onChange={this.handleChange}
                                            autoFocus="true"
                                        />
                                        <Tooltip title="Create label">
                                            <Check
                                                onClick={this.addLabel}
                                                style={{ cursor: "pointer" }}
                                            />
                                        </Tooltip>
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
                                autoFocus="true"
                            />
                        </div>
                        <div>
                            <GetAllLabels
                                createLabelNoteCreate={true}
                                ref={this.labelToCards}
                                noteId={this.props.noteID}
                                getAllLabelsToCreateLabels={this.getAllLabelsToCreateLabels}
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