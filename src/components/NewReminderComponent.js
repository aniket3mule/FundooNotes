import React, { Component } from 'react';
import { Card, CardBody, CardTitle, CardLink, Label, Container } from 'reactstrap';
import 'react-toastify/dist/ReactToastify.min.css';
import Reminder from './Reminder'
import ColorPallete from './Color';
import Tooltip from '@material-ui/core/Tooltip';
import { Chip, Dialog } from '@material-ui/core';
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
        MuiDialog:{
            paperWidthSm:{
                overflow: "visible",
                borderRadius:"10px",
            }
        }
    }
});

function searchingFor(search) {
    return function (x) {
        return x.title.includes(search) || x.description.includes(search)
    }
}

class RemindersDisplayComponent extends Component {
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
        NoteService.getReminderNotesList()
        .then(response => {
            console.log("trash notes ", response);
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
        const listgridview = listgridvalue ? "list-view" : "default-view";
        const modalbottom = listgridvalue ? "list-view-bottom" : "card-bottom";

        const allReminders = this.state.allNotes.filter(searchingFor(this.props.searchNote)).map(key => {
            // console.log("key data",key)
            return (
                    (key.reminder.length > 0 && key.isDeleted === false) &&
                    <div key={key.id} className={listgridview}>
                         <MuiThemeProvider theme={thm}>
                            <Container className="card-margin" >
                                <Card className="take-note-user-card-description "
                                    onChange={() => this.handleColorChanger(key.color, key.id)}
                                    style={{ backgroundColor: key.color }}>
                                    <CardBody className="user-card-body-desc">
                                        <CardTitle>
                                            <input
                                                type="text"
                                                className="take-note-input"
                                                placeholder="Title"
                                                value={key.title}
                                                onClick={() => this.handleToggleOpen(key.id, key.title, key.description)}
                                                readOnly
                                                style={{ backgroundColor: key.color }}
                                            />
                                        </CardTitle>
                                        <textarea
                                            className="take-note-input note-description"
                                            rows="5"
                                            placeholder="Take a note"
                                            value={key.description}
                                            onClick={() => this.handleToggleOpen(key.id, key.title, key.description)}
                                            readOnly
                                            style={{ backgroundColor: key.color }}
                                        />

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
                                    </CardBody>
                                    <CardBody >
                                        <div className={modalbottom}>
                                            <Reminder
                                                toolsPropsToReminder={this.handleReminder}
                                                noteID={key.id}
                                                id="color-picker"
                                            >
                                            </Reminder>

                                            <CardLink>
                                                <Tooltip title="Collaborator">
                                                    <img className="img"
                                                        src={require('../assets/img/colaborator.svg')}
                                                        alt="color picker"
                                                    />
                                                </Tooltip>
                                            </CardLink>

                                            <ColorPallete
                                                toolsPropsToColorpallete={this.handleColorChanger}
                                                noteID={key.id}
                                                id="color-picker"
                                            >
                                            </ColorPallete>

                                            <CardLink
                                                onClick={() => this.props.handleArchive(key.id, true)}
                                            >
                                                <Tooltip title="Archive">
                                                    <img className="img"
                                                        src={require('../assets/img/archived.svg')}
                                                        alt="color picker"
                                                    />
                                                </Tooltip>
                                            </CardLink>
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
                                                id="color-picker">
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
                                            <CardTitle>
                                                <textarea
                                                    style={{ backgroundColor: key.color }}
                                                    type="text"
                                                    className="take-note-input"
                                                    placeholder="Title"
                                                    name="title"
                                                    value={this.state.title}
                                                    onChange={this.handleChange}
                                                    rows="2"
                                                />
                                            </CardTitle>
                                            <textarea
                                                style={{ backgroundColor: key.color }}
                                                className="take-note-input note-description"
                                                rows="5"
                                                placeholder="Take a note"
                                                name="description"
                                                value={this.state.description}
                                                onChange={this.handleChange}
                                            />

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
                                        </CardBody>
                                            <div
                                                className="modal-footer-note"
                                            >
                                                <CardLink onClick={this.handleReminder}>
                                                    <Reminder
                                                        toolsPropsToReminder={this.handleReminder}
                                                        noteID={key.id}
                                                        id="color-picker"
                                                    >
                                                    </Reminder>
                                                </CardLink>

                                                <CardLink >
                                                    <Tooltip title="Collaborator">
                                                        <img className="img"
                                                            src={require('../assets/img/colaborator.svg')}
                                                            alt="color picker" />
                                                    </Tooltip>
                                                </CardLink>

                                                <ColorPallete
                                                    toolsPropsToColorpallete={this.handleColorChanger}
                                                    noteID={key.id}
                                                    id="color-picker"
                                                >
                                                </ColorPallete>

                                                <CardLink
                                                    onClick={() => this.props.handleArchive(key.id, true)}>
                                                    <Tooltip title="Archive">
                                                        <img className="img"
                                                            src={require('../assets/img/archived.svg')}
                                                            alt="color picker" />
                                                    </Tooltip>
                                                </CardLink>
                                                <CardLink>
                                                    <Tooltip title="add image">
                                                        <img className="img"
                                                            src={require('../assets/img/add_image.svg')}
                                                            alt="color picker"
                                                        />
                                                    </Tooltip>
                                                </CardLink>
                                                <MoreOptions
                                                    // toolsPropsToColorpallete={this.handleMoreOptions}
                                                    noteID={key.id}
                                                    id="color-picker">

                                                </MoreOptions>
                                                <CardLink ></CardLink>
                                                <CardLink
                                                    className="close-btn"
                                                    onClick={this.handleToggleOpen}
                                                >
                                                    <Label>Close</Label>
                                                </CardLink>
                                            </div>
                                    </Card>
                                </Dialog>
                            </div>}
                            </MuiThemeProvider>
                    </div>
            )
        })
        return (
            <div className="card-grid all-reminders">
                {allReminders}
            </div>
        )
    }
}

export default RemindersDisplayComponent