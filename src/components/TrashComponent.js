import React, { Component } from 'react';
import { Card, CardBody, CardTitle, Container } from 'reactstrap';
import 'react-toastify/dist/ReactToastify.min.css';
import { Chip, Dialog, InputBase, Avatar, Tooltip } from '@material-ui/core';
import { makeStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import MoreOptions from './MoreOptions';
import GetNote from '../services/NoteServices';

const NoteService = new GetNote();
const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    chip: {
        margin: theme.spacing(1),
    },
}));

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

function searchingFor(search) {
    return function (x) {
        return x.title.includes(search) || x.description.includes(search)
    }
}

class TrashComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            noteId: '',
            title: '',
            description: '',
            modal: false,
            allNotes: [],
        }
    }
    
    componentDidMount(){
        this.getUpdatedNotes();
    }

    getUpdatedNotes(){
        NoteService.getTrashNotes()
        .then(response => {
            console.log("getALl notes in trash component ", response);
            this.setState({
                allNotes: response.data.data.data
            })
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

        //update existing Note
        try {
            if (this.state.modal && (this.state.description !== oldTitle || this.state.title !== oldDescription)) {
                var data = {
                    'noteId': this.state.noteId,
                    'title': this.state.title,
                    'description': this.state.description
                }
                let formData = new FormData();    //formdata object
                formData.append('noteId', this.state.noteId);
                formData.append('title', this.state.title);   //append the values with key, value pair
                formData.append('description', this.state.description);

                console.log("get all note data", data);

                NoteService.updateNote(data)
                    .then(response => {
                        console.log("uddate note function", response);
                        this.getUpdatedNotes();
                    })
                    .catch(err => {
                        console.log("Eroorrrrrr....", err);
                    })
            }
        } catch {
        }
    }

    handleClose = () => {
        this.setState({
            modal: false
        })
    }

    handleDeleteChip = (noteId) => {
        var note = {
            'noteIdList': [noteId],
            'reminder': []
        }

        NoteService.removeReminderNotes(note)
            .then(response => {
                console.log("update reminder >>>", response);
            })
            .catch(err => {
                console.log("Eroorrrrrr....", err);
            })
    }

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
                this.getUpdatedNotes();
            })
            .catch(err => {
                console.log("Eroorrrrrr....", err);
            })
    }

    handleColorChanger = (value, noteId) => {
        this.setState({ color: value })
        var note = {
            'noteIdList': [noteId],
            'color': value,
        }

        NoteService.changesColorNotes(note)
            .then(() => {
                this.getUpdatedNotes();
            })
            .catch(err => {
                console.log("Eroorrrrrr....", err);
            })
    }

    handleDeleteChip = (noteId) => {
        var note = {
            'noteIdList': [noteId],
            'reminder': []
        }

        NoteService.removeReminderNotes(note)
            .then(response => {
                console.log("update reminder >>>", response);
            })
            .catch(err => {
                console.log("Eroorrrrrr....", err);
            })
    }

    handleDelete = (noteId) => {
        var note = {
            'noteIdList': [noteId],
            'isDeleted': true
        }

        NoteService.deleteForeverNote(note)
            .then(response => {
                this.getUpdatedNotes();
            })
            .catch(err => {
                console.log("Eroorrrrrr....", err);
            })
    }

    handleRestore = (noteId) => {
        var note = {
            'noteIdList': [noteId],
            'isDeleted': false
        }

        NoteService.trashNote(note)
            .then(response => {
               this.getUpdatedNotes();
            })
            .catch(err => {
                console.log("Eroorrrrrr....", err);
            })
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        var listgridvalue = this.props.listGridView;
        const listgridview = listgridvalue ? "list-view-archive" : "default-view";
        const modalbottom = listgridvalue ? "list-view-bottom" : "card-bottom";
        const listView = listgridvalue ? null : "card-grid";
        const allTrash = this.state.allNotes.filter(searchingFor(this.props.searchNote)).map(key => {
            // console.log("key data",key)
            return (
                    ( key.isDeleted === true) &&
                    <div key={key.id} className={listgridview}>
                         <MuiThemeProvider theme={thm}>
                            <Container className="card-margin" >
                                <Card className="take-note-user-card-description "
                                    onChange={() => this.handleColorChanger(key.color, key.id)}
                                    style={{ backgroundColor: key.color }}>
                                    <CardBody className="user-card-body-desc">
                                        <CardTitle>
                                        <InputBase
                                            id="outlined-dense-multiline"
                                            value={key.title}
                                            onClick={() => this.handleToggleOpen(key.id, key.title, key.description)}
                                            margin="dense"
                                            variant="outlined"
                                            readOnly
                                            multiline
                                            style={{ backgroundColor: key.color }}

                                        />
                                    </CardTitle>
                                    <InputBase
                                        id="outlined-dense-multiline"
                                        value={key.description}
                                        onClick={() => this.handleToggleOpen(key.id, key.title, key.description)}
                                        margin="dense"
                                        variant="outlined"
                                        readOnly
                                        multiline
                                        style={{ backgroundColor: key.color }}
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
                                        {(key.collaborators.length > 0) &&
                                        <div style={{ display: "flex" }}>{
                                            key.collaborators.map(collaborator => {
                                                return (
                                                    <div className="collab">
                                                        <Tooltip title={collaborator.email}>
                                                            <Avatar>
                                                                <span>{collaborator.firstName.toString().substring(0, 1)}</span>
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
                                        <MoreOptions
                                                toolsPropsToMoreOptions={this.handleDelete}
                                                moreOptionsToTrashNotes={this.handleRestore}
                                                noteID={key.id}
                                                id="color-picker"
                                                isTrashed={true}
                                                >
                                            </MoreOptions>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Container>
                        {(this.state.noteId === key.id) &&
                            <div key={key.id} >
                                <Dialog
                                    key={key.id}
                                    open={this.state.modal}
                                    onClose={this.handleClose}
                                    aria-labelledby="responsive-dialog-title"
                                    className="dialog-bottom-icons"
                                >

                                    <Card className="take-note-user-card-dialog"
                                        onChange={() => this.handleColorChanger(key.color, key.id)}
                                        style={{ backgroundColor: key.color }}>
                                        <CardBody className="user-card-body-desc">
                                            <div>
                                            <InputBase
                                            id="outlined-dense-multiline"
                                            value={key.title}
                                            margin="dense"
                                            variant="outlined"
                                            readOnly
                                            multiline
                                            style={{ backgroundColor: key.color }}
                                            className="dialog-input"
                                        />
                                
                                    <InputBase
                                        id="outlined-dense-multiline"
                                        value={key.description}
                                        margin="dense"
                                        variant="outlined"
                                        readOnly
                                        multiline
                                        style={{ backgroundColor: key.color }}
                                        className="dialog-input"
                                    />
                                    </div>
                                            {(key.reminder.length > 0) &&
                                                <div>
                                                    <Chip
                                                        // avatar={<Avatar alt="Natacha" src="/static/images/avatar/1.jpg" />}
                                                        label={key.reminder.toString().substring(0, 24)}
                                                        onDelete={() => this.handleDeleteChip(key.id)}
                                                        className={useStyles.chip}
                                                        variant="outlined"
                                                        size="small"
                                                    />
                                                </div>
                                            }
                                            {(key.collaborators.length > 0) &&
                                        <div style={{ display: "flex" }}>{
                                            key.collaborators.map(collaborator => {
                                                return (
                                                    <div className="collab">
                                                        <Tooltip title={collaborator.email}>
                                                            <Avatar>
                                                                <span>{collaborator.firstName.toString().substring(0, 1)}</span>
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
                                                <MoreOptions
                                                toolsPropsToMoreOptions={this.handleDelete}
                                                moreOptionsToTrashNotes={this.handleRestore}
                                                noteID={key.id}
                                                id="color-picker"
                                                isTrashed={true}
                                                >
                                            </MoreOptions>
                                            </div>
                                    </Card>
                                </Dialog>
                            </div>}
                            </MuiThemeProvider>
                    </div>
            )
        })
        return (
            <div className={listView}>
                {allTrash}
            </div>
        )
    }
}

export default TrashComponent