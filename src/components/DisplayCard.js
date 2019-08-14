import React, { Component } from 'react';
import { Card, CardBody, CardLink, Container } from 'reactstrap';
import GetNote from '../services/NoteServices';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Reminder from './Reminder'
import ColorPallete from './Color';
import Tooltip from '@material-ui/core/Tooltip';
import { Chip, Dialog, Avatar, Button, IconButton, InputBase } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar'
import { makeStyles } from '@material-ui/core/styles';
import MoreOptions from './MoreOptions';
import CollaboratorComponent from './CollaboratorComponent';
import { MuiThemeProvider, createMuiTheme, } from '@material-ui/core';
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    chip: {
        margin: theme.spacing(1),
    },
    cardWidth: {
        width: "100%"
    }
}
));

const thm = createMuiTheme({
    overrides: {
        MuiAvatar: {
            colorDefault: {
                border: "3px solid"
            }
        },
        MuiDialog: {
            paperWidthSm: {
                overflow: "visible",
                borderRadius: "10px",
            }
        }
    }
});

const NoteService = new GetNote();

// function searchingFor(search) {
//     return function (x) {
//         return x.title.includes(search) || x.description.includes(search)
//     }
// }
class DisplayCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allNotes: [],
            open: false,
            title: '',
            description: '',
            noteId: '',
            modal: false,
            isArchived: false,
            isTrash: false,
            // isReminder: false,
            isNotes: false,
            tooltipOpen: false,
            color: '',
            reminder: '',
            openSnackbar: false,
            messageInfo: '',
            collaborator: [],
        }

        this.handleToggleOpen = this.handleToggleOpen.bind(this);
        this.displayCard = this.displayCard.bind(this);
        // this.getUpdateNotes = this.getUpdateNotes.bind(this);
        this.handleQuestionAnsAnswer = this.handleQuestionAnsAnswer.bind(this);
    }

    handleToggle = (e) => {
        this.setState({ open: !this.state.open });
    }

    closePopper() {
        this.setState({
            openPopper: false
        })
    }

    handleToggleOpen = (id, oldTitle, oldDescription) => {
        this.setState(prevState => ({
            modal: !prevState.modal,
            noteId: id,
            title: oldTitle,
            description: oldDescription
        }));
        console.log("id ......", id);
        console.log("note id ......", this.state.noteId);
        this.props.props.history.push(`/dashboard/${id}`)
    }

    /**
     * Update existing note
     */
    handleToggleClose = () => {
        try {
            this.setState(prevState => ({
                modal: !prevState.modal,
            }))
            if (this.state.modal) {
                var data = {
                    'noteId': this.state.noteId,
                    'title': this.state.title,
                    'description': this.state.description
                }
                let formData = new FormData();    //formdata object
                formData.append('noteId', this.state.noteId);
                formData.append('title', this.state.title);   //append the values with key, value pair
                formData.append('description', this.state.description);

                console.log("get all note data", formData);

                NoteService.updateNote(data)
                    .then(response => {
                        console.log("uddate note function", response);
                        this.props.getUpdateNotes(true);
                        this.handleClickSnackbar("Note Updated successfully");
                    })
                    .catch(err => {
                        console.log("Eroorrrrrr....", err);
                    })
            }
        } catch {

        }
    }
    /**
     * Archive Notes Funtions
    */

    handleArchive = (noteId, isArchive) => {
        console.log(noteId);
        this.setState({ isArchived: isArchive });
        console.log(this.state.isArchived);


        var note = {
            'noteIdList': [noteId],
            'isArchived': isArchive
        }

        //Update service
        NoteService.archiveNote(note)
            .then(response => {
                console.log(response);
                // this.getUpdateNotes()
            })
            .catch(err => {
                console.log("Eroorrrrrr....", err);
            })
    }

    /**
     * Note Color Changer function 
     */

    handleColorChanger = (value, noteId) => {
        this.setState({ color: value })
        var note = {
            'noteIdList': [noteId],
            'color': value,
        }

        NoteService.changesColorNotes(note)
            .then(response => {
                // this.getUpdateNotes();
            })
            .catch(err => {
                console.log("Eroorrrrrr....", err);
            })
    }
    /**
     * Note Reminder function
     */
    handleReminder = (reminderdate, noteId) => {
        console.log(reminderdate);
        this.setState({ reminder: reminderdate })
        var note = {
            'noteIdList': [noteId],
            'reminder': reminderdate,
        }
        NoteService.updateReminderNotes(note)
            .then(response => {
                console.log("update reminder >>>", response);
                // this.getUpdateNotes();
            })
            .catch(err => {
                console.log("Eroorrrrrr....", err);
            })
    }
    /**
     * Deleting exsting reminder 
     */
    handleDeleteChip = (noteId) => {
        var note = {
            'noteIdList': [noteId],
            'reminder': []
        }
        NoteService.removeReminderNotes(note)
            .then(response => {
                console.log("update reminder >>>", response);
                // this.getUpdateNotes();
            })
            .catch(err => {
                console.log("Eroorrrrrr....", err);
            })
    }
    /**
     * Handle change event
     */
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    /**
     * Tooltip functions
     */
    handleToggleTooltip = () => {
        console.log("tooltips......", this.state.tooltipOpen)
        this.setState({
            tooltipOpen: !this.state.tooltipOpen
        });
    }
    /**
     * Deleting exsting Note
     */
    handleDeleteNote = (noteId) => {
        var note = {
            'noteIdList': [noteId],
            'isDeleted': true
        }
        NoteService.trashNote(note)
            .then(response => {
                console.log(response);
                let newArray = this.state.allNotes
                console.log("new array", newArray);
                // this.getUpdateNotes();
            })
            .catch(err => {
                console.log("Eroorrrrrr....", err);
            })
    }

    moreOptionLabelToAllNote = (isChecked) => {
        if (isChecked) {
            // this.getUpdateNotes();
        }
    }
    /**
     * Getting ref from child component
     */
    displayCard(newNote) {
        console.log("display card==>", newNote);
        var allNotesArray = [];
        allNotesArray = this.state.allNotes;
        allNotesArray.unshift(newNote);
        this.setState({
            allNotes: allNotesArray
        })
    }
    /**
     * Handle close function
     */
    handleClose = () => {
        this.setState({
            modal: false
        })
        this.props.props.history.push(`/dashboard`)
    }
    /**
     * Props starts
     */
    // ReminderComponentToAllNotes = (allNotes) => {
    //     this.setState({
    //         allNotes: allNotes
    //     })
    // }

    removeCollaborator = async (value) => {
        if (value) {
            await this.getUpdateNotes();
        }
    }

    saveCollaborator = async (value) => {
        if (value) {
            await this.getUpdateNotes();
        }
    }
    /**
     * props ends
     **/
    
    /**
     * Redirecting to Question and Answer page with NoteId
     */
    handleQuestionAnsAnswer(noteId) {
        console.log("note id", noteId);
        this.props.props.history.push(`/questionanswer/${noteId}`, noteId)
    }

    handleDeletelabel = (noteId, labelId, label) => {
        var removeData = {
            'noteId': noteId,
            'labelId': labelId,
            data: {
                'noteIdList': noteId,
                'label': label
            }
        }

        NoteService.removeLabelToNotes(removeData)
            .then(res => {
                console.log("removed lable");
                // this.getUpdateNotes();
            })
    }

    handlePinNote = (noteId) => {
        var data = {
            'noteIdList': [noteId],
            'isPined' : true
        }

        NoteService.pinUnpinNotes(data)
        .then(res => {
            console.log("Note pinned successfully");
            this.setState({
                            openSnackbar: true,
                            messageInfo: 'Note pinned successfully'
                        });
            // this.getUpdateNotes();
        })
    }
    handleUnpinNote = (noteId) => {
        var data = {
            'noteIdList': [noteId],
            'isPined' : false
        }

        NoteService.pinUnpinNotes(data)
        .then(res => {
            console.log("Note Unpinned successfully");
            // this.getUpdateNotes();
        })
    }
    render() {
        // console.log(this.props.isNotes);
        var listgridvalue = this.props.listGridView;
        const listgridview = listgridvalue ? "list-view" : "default-view";
        const modalbottom = listgridvalue ? "list-view-bottom" : "card-bottom";
        const listView = listgridvalue ? null : "card-grid";
        const containerAllnotes = listgridvalue ? null : "container-allnotes"
        // var doc;
        var notes = this.props.allNotes.map((key) => {
            return (
                (
                    key.isArchived === false
                    && key.isDeleted === false
                )
                &&
                <div key={key.id} className={listgridview}>
                    <MuiThemeProvider theme={thm}>
                        <Container className="card-margin" >
                            <Card className="take-note-user-card-description"
                                onChange={() => this.handleColorChanger(key.color, key.id)}
                                style={{ backgroundColor: key.color }}>
                                <CardBody className="user-card-body-desc">
                                    <div style={{ display: "flex" }}>
                                        <div style={{ width: "98%" }}>
                                            <InputBase
                                                id="outlined-dense-multiline"
                                                value={key.title}
                                                onClick={() => this.handleToggleOpen(key.id, key.title, key.description)}
                                                margin="dense"
                                                variant="outlined"
                                                readOnly
                                                multiline
                                                style={{ backgroundColor: key.color, width: "98%" }}
                                                placeholder="Title"
                                            />
                                        </div>
                                        {(key.isPined===true)?
                                        <div style={{ height: "24px" }}>
                                        <Tooltip title="Unpin note">
                                            <img src={require('../assets/img/pin.svg')}
                                                alt="pin" className="is-pin"
                                                onClick={() => this.handleUnpinNote(key.id)}
                                            />

                                            {/* <Pin/> */}
                                        </Tooltip>
                                    </div>
                                            :<div style={{ height: "24px" }}>
                                                <Tooltip title="Pin note">
                                                    <img src={require('../assets/img/unPin.svg')}
                                                        alt="pin" className="is-pin"
                                                        onClick={() => this.handlePinNote(key.id)}
                                                    />

                                                    {/* <Pin/> */}
                                                </Tooltip>
                                            </div>
                                        }
                                    </div>


                                    <InputBase
                                        id="outlined-dense-multiline"
                                        value={key.description}
                                        onClick={() => this.handleToggleOpen(key.id, key.title, key.description)}
                                        margin="dense"
                                        variant="outlined"
                                        readOnly
                                        multiline
                                        style={{ backgroundColor: key.color }}
                                        placeholder="Description"
                                    />
                                    {(key.reminder.length > 0) &&
                                        <div>
                                            <Chip
                                                label={key.reminder.toString().substring(0, 24)}
                                                onDelete={() => this.handleDeleteChip(key.id)}
                                                className={useStyles.chip}
                                                variant="outlined"
                                                size="small"
                                            />
                                        </div>
                                    }

                                    {(key.noteLabels.length > 0) &&
                                        <div style={{ display: "flex", flexWrap: "wrap", width: "218px" }}>{
                                            key.noteLabels.map(labelskey => {
                                                return (
                                                    (labelskey.isDeleted === false)&&
                                                    <div key={labelskey.id}>
                                                        <Chip
                                                            label={labelskey.label}
                                                            onDelete={() => this.handleDeletelabel(key.id, labelskey.id, labelskey.label)}
                                                            className={useStyles.chip}
                                                            variant="outlined"
                                                            size="small"
                                                        />
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    }

                                    {(key.collaborators.length > 0) &&
                                        <div style={{ display: "flex" }}>{
                                            key.collaborators.map(collaborator => {
                                                return (
                                                    <div className="collab" key={collaborator.userId}>
                                                        <Tooltip title={collaborator.email}>
                                                            <Avatar>
                                                                <span>{collaborator.firstName.toString().substring(0, 1).toUpperCase()}</span>
                                                            </Avatar>
                                                        </Tooltip>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    }
                                </CardBody>
                                <CardBody >
                                    <div className={modalbottom}>
                                        <Reminder
                                            toolsPropsToReminder={this.handleReminder}
                                            noteID={key.id}
                                            id="color-picker"
                                        >
                                        </Reminder>

                                            <CollaboratorComponent
                                                noteID={key.id}
                                                collaborators={key.collaborators}
                                                removeCollaborator={this.removeCollaborator}
                                                saveCollaborator={this.saveCollaborator}
                                            />

                                        <ColorPallete
                                            toolsPropsToColorpallete={this.handleColorChanger}
                                            noteID={key.id}
                                            id="color-picker"
                                        >
                                        </ColorPallete>

                                            <Tooltip title="Archive">
                                                <img className="img"
                                                    src={require('../assets/img/archived.svg')}
                                                    alt="color picker"
                                                    onClick={() => this.handleArchive(key.id, true)}
                                                />
                                            </Tooltip>
                                        <CardLink className="add-image">
                                            <Tooltip title="add image">
                                                <img className="img"
                                                    src={require('../assets/img/add_image.svg')}
                                                    alt="color picker"
                                                />
                                            </Tooltip>
                                        </CardLink>
                                        <MoreOptions
                                            toolsPropsToMoreOptions={this.handleDeleteNote}
                                            noteID={key.id}
                                            id="color-picker"
                                            moreOptionLabelToAllNote={this.moreOptionLabelToAllNote}
                                            props={this.props.props}
                                        >
                                        </MoreOptions>
                                    </div>
                                </CardBody>
                                {(key.questionAndAnswerNotes.length > 0) &&
                                    <Tooltip title="Reply">
                                        <div
                                            className="q-a-asked"
                                            style={{ borderTop: "1px solid gray", borderBottom: "none", cursor: "pointer" }}
                                            onClick={() => this.handleQuestionAnsAnswer(key.id)}
                                        >
                                            <div>
                                                <span><strong>Question Asked</strong></span>
                                            </div>
                                            <div className="innerHTML"
                                                dangerouslySetInnerHTML={{ __html: key.questionAndAnswerNotes[key.questionAndAnswerNotes.length - 1].message }}
                                                style={{ maxWidth: "200px" }}
                                            >
                                            </div>
                                        </div>
                                    </Tooltip>
                                }
                            </Card>
                        </Container>
                        <ToastContainer />
                        {(this.state.noteId === key.id) &&
                            <Dialog
                                key={key.id}
                                open={this.state.modal}
                                onClose={this.handleClose}
                                aria-labelledby="responsive-dialog-title"
                                className="dialog-bottom-icons"
                            >
                                <Card className="take-note-user-card-dialog"
                                    onChange={() => this.handleColorChanger(key.color, key.id)}
                                    style={{ backgroundColor: key.color }}
                                >
                                    <CardBody className="user-card-body-desc">
                                        <div>
                                            <InputBase
                                                name="title"
                                                value={this.state.title}
                                                onChange={this.handleChange}
                                                margin="dense"
                                                variant="outlined"
                                                multiline
                                                style={{ backgroundColor: key.color }}
                                                placeholder="Title"
                                                className="dialog-input"
                                            />

                                            <InputBase
                                                name="description"
                                                value={this.state.description}
                                                onChange={this.handleChange}
                                                margin="dense"
                                                variant="outlined"
                                                placeholder="Description"
                                                multiline
                                                style={{ backgroundColor: key.color }}
                                                className="dialog-input"
                                            />
                                        </div>
                                        {(key.reminder.length > 0) &&
                                            <div>
                                                <Chip
                                                    label={key.reminder.toString().substring(0, 24)}
                                                    onDelete={() => this.handleDeleteChip(key.id)}
                                                    className={useStyles.chip}
                                                    variant="outlined"
                                                    size="small"
                                                />
                                            </div>
                                        }
                                        {(key.noteLabels.length > 0) &&
                                            <div style={{ display: "flex", flexWrap: "wrap", width: "100%" }}>{
                                                key.noteLabels.map(labelskey => {
                                                    return (
                                                        (labelskey.isDeleted === false)&&
                                                        <div>
                                                            <Chip
                                                                label={labelskey.label}
                                                                onDelete={() => this.handleDeletelabel(key.id, labelskey.id, labelskey.label)}
                                                                className={useStyles.chip}
                                                                variant="outlined"
                                                                size="small"
                                                            />
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        }
                                        {(key.collaborators.length > 0) &&
                                            <div style={{ display: "flex" }}>{
                                                key.collaborators.map(collaborator => {
                                                    return (
                                                        <div className="collab" key={collaborator.userId}>
                                                            <Tooltip title={collaborator.email}>
                                                                <Avatar>
                                                                    <span>{collaborator.firstName.toString().substring(0, 1).toUpperCase()}</span>
                                                                </Avatar>
                                                            </Tooltip>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        }
                                    </CardBody>
                                    <div
                                        className="modal-footer-note"
                                    >
                                            <Reminder
                                                toolsPropsToReminder={this.handleReminder}
                                                noteID={key.id}
                                                id="color-picker"
                                            >
                                            </Reminder>

                                            <CollaboratorComponent
                                                noteID={key.id}
                                                collaborators={key.collaborators}
                                                removeCollaborator={this.removeCollaborator}
                                                saveCollaborator={this.saveCollaborator}
                                            />
                                            <ColorPallete
                                                toolsPropsToColorpallete={this.handleColorChanger}
                                                noteID={key.id}
                                                id="color-picker"
                                            >
                                            </ColorPallete>
                                        <CardLink
                                            onClick={() => this.handleArchive(key.id, true)}>
                                            <Tooltip title="Archive">
                                                <img className="img"
                                                    src={require('../assets/img/archived.svg')}
                                                    alt="color picker" />
                                            </Tooltip>
                                        </CardLink>
                                            <Tooltip title="add image">
                                                <img className="img"
                                                    src={require('../assets/img/add_image.svg')}
                                                    alt="color picker"
                                                />
                                            </Tooltip>
                                        <MoreOptions
                                            toolsPropsToMoreOptions={this.handleDeleteNote}
                                            noteID={key.id}
                                            id="color-picker"
                                            moreOptionLabelToAllNote={this.moreOptionLabelToAllNote}
                                            props={this.props.props}
                                        >
                                        </MoreOptions>

                                        <CardLink ></CardLink>
                                        <Button
                                            className="close-btn"
                                            onClick={this.handleToggleClose}
                                        >
                                            Close
                                        </Button>
                                    </div>
                                    {(key.questionAndAnswerNotes.length > 0) &&
                                        <Tooltip title="Reply">
                                            <div
                                                className="q-a-asked"
                                                style={{ borderTop: "1px solid gray", borderBottom: "none", cursor: "pointer" }}
                                                onClick={() => this.handleQuestionAnsAnswer(key.id)}
                                            >
                                                <div>
                                                    <span><strong>Question Asked</strong></span>
                                                </div>

                                                <div className="innerHTML"
                                                    dangerouslySetInnerHTML={{ __html: key.questionAndAnswerNotes[key.questionAndAnswerNotes.length - 1].message }}>
                                                </div>
                                            </div>
                                        </Tooltip>
                                    }
                                </Card>
                            </Dialog>
                        }
                    </MuiThemeProvider>
                </div>
            )
        })
        return (
            <div className={containerAllnotes}>
                <div className={listView}>
                    {notes}
                </div>

                <Snackbar
                    // key={this.state.messageInfo}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center"
                    }}
                    open={this.state.openSnackbar}
                    autoHideDuration={1000}
                    onClose={this.handleCloseSnackbar}
                    // onExited={this.handleExitedSnackbar}
                    ContentProps={{
                        "aria-describedby": "message-id"
                    }}
                    message={<span id="message-id">{this.state.messageInfo}</span>}
                    action={[
                       
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            onClick={this.handleCloseSnackbar}
                        >
                            <CloseIcon />
                        </IconButton>
                    ]}
                />
            </div>
        )
    }
}

export default DisplayCard