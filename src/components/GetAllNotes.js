import React, { Component } from 'react';
import { Card, CardBody, CardTitle, CardLink, Label, Container } from 'reactstrap';
import GetNote from '../services/NoteServices';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Reminder from './Reminder'
import ColorPallete from './Color';
import Tooltip from '@material-ui/core/Tooltip';
import { Chip, Dialog } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MoreOptions from './MoreOptions';
import RemindersDisplayComponent from './ReminderComponent';
import TrashComponent from './TrashComponent'
import ArchivedComponent from './ArchivedComponent';
import CollaboratorComponent from './CollaboratorComponent';


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

const NoteService = new GetNote();

function searchingFor(search) {
    return function (x) {
        return x.title.includes(search) || x.description.includes(search)
    }
}
class GetAllNotes extends Component {
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
        }

        this.handleToggleOpen = this.handleToggleOpen.bind(this);
        this.displayCard = this.displayCard.bind(this)
        this.getUpdateNotes = this.getUpdateNotes.bind(this)
    }

    getUpdateNotes () {
        NoteService.getAllNotes()
            .then(allNotes => {
                this.setState({ allNotes: allNotes.data.data.data })
                // console.log("this data", this.state.allNotes);
            })
            .catch(err => {
                console.log(err);
            })
    }

    componentDidMount(){
        //Print All notes
        this.getUpdateNotes();
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
                       this.getUpdateNotes();
                    })
                    .catch(err => {
                        console.log("Eroorrrrrr....", err);
                    })
            }
        } catch {

        }
    }

    handleArchive = (noteId, isArchive) => {
        console.log(noteId);
        this.setState({ isArchived: isArchive });
        console.log(this.state.isArchived);
            
        
        var note = {
                'noteIdList': [noteId],
                'isArchived': this.state.isArchived
            }

            //Update service
            NoteService.archiveNote(note)
                .then(response => {
                    console.log(response);
                    this.getUpdateNotes()
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
            .then(response => {
                this.getUpdateNotes();
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
                this.getUpdateNotes();
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
                this.getUpdateNotes();
            })
            .catch(err => {
                console.log("Eroorrrrrr....", err);
            })

    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleToggleTooltip = () => {
        console.log("tooltips......", this.state.tooltipOpen)
        this.setState({
            tooltipOpen: !this.state.tooltipOpen
        });

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
                this.getUpdateNotes();
            })
            .catch(err => {
                console.log("Eroorrrrrr....", err);
            })
    }

    displayCard(newNote) {
        console.log("display card==>", newNote);

        this.setState({
            allNotes: [...this.state.allNotes, newNote]
        })
    }

    handleClose = () => {
        this.setState({
            modal: false
        })
    }

    ReminderComponentToAllNotes = (allNotes) =>{
        this.setState({
            allNotes:allNotes
        })
    }
    render() {
        console.log(this.props.isNotes);
        var listgridvalue = this.props.listGridView;
        const listgridview = listgridvalue ? "list-view" : null;
        const modalbottom = listgridvalue ? "list-view-bottom" : "card-bottom";

        var notes = this.state.allNotes.filter(searchingFor(this.props.searchNote)).map((key) => {
            return (
                (
                    key.isArchived === false
                    && key.isDeleted === false
                )
                &&

                <div key={key.id} className={listgridview}>
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
                                           <CollaboratorComponent
                                           />
                                       
                                    </CardLink>

                                    <ColorPallete
                                        toolsPropsToColorpallete={this.handleColorChanger}
                                        noteID={key.id}
                                        id="color-picker"
                                    >
                                    </ColorPallete>

                                    <CardLink
                                        onClick={() => this.handleArchive(key.id, true)}
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
                    <ToastContainer />

                    {(this.state.noteId === key.id) &&
                        <div key={key.id} >
                            <Dialog
                                key={key.id}
                                open={this.state.modal}
                                onClose={this.handleClose}
                                aria-labelledby="responsive-dialog-title"
                                className="dialog-bottom-icons"
                            >

                                <Card className="take-note-user-card-description "
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
                                    <CardBody >
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
                                                
                                                <CollaboratorComponent
                                                />
                                            </CardLink>
                                            <CardLink >
                                            <ColorPallete
                                                toolsPropsToColorpallete={this.handleColorChanger}
                                                noteID={key.id}
                                                id="color-picker"
                                            >
                                            </ColorPallete>
                                            </CardLink>
                                            <CardLink
                                                onClick={() => this.handleArchive(key.id, true)}>
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
                                    </CardBody>
                                </Card>
                            </Dialog>
                        </div>}
                </div>
            )
        })
        return (
                (this.props.isNotes=== true) ?
                <div className="card-grid">
                    {notes}
                </div>
                :
                null
        ||
                (this.props.isReminder===true) ?
                   <div className="card-grid">
                    <RemindersDisplayComponent
                    listGridView={this.props.listGridView}
                    ReminderComponentToAllNotes ={this.ReminderComponentToAllNotes}
                    searchNote = {this.props.searchNote}
                    handleArchive = {this.handleArchive}

                />
                </div>
                :
                null
        ||
                
                    (this.props.isTrash===true ) ?
                    <div className="card-grid">
                    <TrashComponent
                    listGridView={this.props.listGridView}
                    ReminderComponentToAllNotes ={this.ReminderComponentToAllNotes}
                    searchNote = {this.props.searchNote}
                />
            </div>
            :
            null
        ||

        (this.props.isArchive  === true) ?
        <div className="card-grid">
            <ArchivedComponent
            listGridView={this.props.listGridView}
            ReminderComponentToAllNotes ={this.ReminderComponentToAllNotes}
            searchNote = {this.props.searchNote}
            handleArchive = { this.handleArchive}
            handleDeleteNote = {this.handleDeleteNote}
        />
        </div>
        :
        null
        )
    }
}

export default GetAllNotes;