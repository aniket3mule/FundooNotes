import React, { Component } from 'react';
import { Card, CardBody, CardTitle, CardLink, Label, Container } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import GetNote from '../services/NoteService';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Reminder from './Reminder'
import ColorPallete from './Color';
import Tooltip from '@material-ui/core/Tooltip';
import { Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MoreOptions from './MoreOptions';

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

function searchingFor(search){
    return function (x){
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
            tooltipOpen: false,
            color: '',
            reminder: '',
        }

        this.handleToggleOpen = this.handleToggleOpen.bind(this);
        this.displayCard=this.displayCard.bind(this)
        // this.handleModal = this.handleModal.bind(this)
    }

    componentWillMount() {
        //Print All notes
        NoteService.getAllNotes()
            .then(allNotes => {
                this.setState({ allNotes: allNotes.data.data.data })
                // console.log("this data", this.state.allNotes);
            })
            .catch(err => {
                console.log(err);
            })
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
                        // toast.success("Note Saved", {
                        //     position: toast.POSITION.TOP_CENTER
                        // });
                        // this.props.getNewNote(this.state.newNote);
                    })
                    .catch(err => {
                        console.log("Eroorrrrrr....", err);
                        // toast.info("Error in update note", {
                        //     position: toast.POSITION.TOP_CENTER
                        // });
                    })
            }
        } catch {

        }
    }
    
    handleArchive = (noteId) => {
        // this.props.archiveNote(noteId);
        console.log(noteId);
        this.setState(prevState => ({
            isArchived: !prevState.isArchived
        }));
        // this.setState({ isArchived: !this.state.isArchived });
        console.log(this.state.isArchived);

        var note = {
            'noteIdList': [noteId],
            'isArchived': this.state.isArchived,
        }

        //Update service
        NoteService.archiveNote(note)
            .then(response => {
                console.log(response);
                // toast.success("Note archived ", {
                //     position: toast.POSITION.TOP_CENTER
                // });
            })
            .catch(err => {
                console.log("Eroorrrrrr....", err);
                // toast.info("Error in note archive", {
                //     position: toast.POSITION.TOP_CENTER
                // });
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
                // this.setState({
                //     allNotes: [...this.state.allNotes, response]
                // })
            })
            .catch(err => {
                console.log("Eroorrrrrr....", err);
                // toast.info("Error in note archive", {
                //     position: toast.POSITION.TOP_CENTER
                // });
            })

    }

    handleReminder = (reminderdate, noteId) => {
        console.log(reminderdate);


        this.setState({ reminder: reminderdate })
        // console.log("state ", this.state.reminder);

        var note = {
            'noteIdList': [noteId],
            'reminder': reminderdate,
        }

        NoteService.updateReminderNotes(note)
            .then(response => {
                console.log("update reminder >>>",response);
                
            })
            .catch(err => {
                console.log("Eroorrrrrr....", err);
            })

    }

    handleDeleteChip = (noteId)=>{
        // this.setState({
        //     allNotes: [...this.state.allNotes]
        // })
        var note = {
            'noteIdList': [noteId],
            'reminder': ''
        }

        NoteService.updateReminderNotes(note)
            .then(response => {
                console.log("update reminder >>>",response);
                this.setState({
                    allNotes: [...this.state.allNotes]
                })
                
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

    handleDeleteNote = (noteId) =>{
        var note = {
            'noteIdList': [noteId],
        }

        NoteService.deleteNote(note)
            .then(response => {
                console.log(response);
                let newArray = this.state.allNotes
                console.log("new array",newArray);

                for (let i = 0; i < newArray.length; i++) {
                    // console.log("new aarray",note.noteIdList[i]);
                    if (newArray[i].id === note.noteIdList[i]) {
                        // console.log("new aarray",newArray[i].noteIdList);
                        newArray.splice(i, 1);
                        this.setState({
                            allNotes: newArray
                        })
                    }
                }
            })
            .catch(err => {
                console.log("Eroorrrrrr....", err);
            })
    }

    displayCard(newNote){
        console.log("display card==>",newNote);
        
        this.setState({
            allNotes: [...this.state.allNotes, newNote]
        })
    }

    render() {
        var notes = this.state.allNotes.filter(searchingFor(this.props.searchNote)).map((key) => {
            return (!this.state.modal && key.isArchived === false ?
                <div key={key.id} >
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
                                
                                {(key.reminder.length>0) ?
                                <div>
                                <Chip
                                    // avatar={<Avatar alt="Natacha" src="/static/images/avatar/1.jpg" />}
                                    label={key.reminder.toString().substring(0, 24)}
                                    onDelete ={() => this.handleDeleteChip(key.id)}
                                    className={useStyles.chip}
                                    variant="outlined"
                                />
                                </div>
                            : 
                            null 
                            }
                            </CardBody>
                            <CardBody className="card-bottom">
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
                                    onClick={() => this.handleArchive(key.id)}
                                >
                                    <Tooltip title="Archive">
                                        <img className="img"
                                            src={require('../assets/img/archived.svg')}
                                            alt="color picker"
                                        />
                                    </Tooltip>
                                </CardLink>

                                <CardLink >
                                    <Tooltip title="Add image">
                                        <img className="update-card-img"
                                            src={require('../assets/img/add_image.svg')}
                                            alt="add_image" />
                                    </Tooltip>
                                </CardLink>

                                <MoreOptions
                                toolsPropsToMoreOptions={this.handleDeleteNote}
                                noteID={key.id}
                                id="color-picker">
                                </MoreOptions>
                            </CardBody>
                        </Card>
                    </Container>
                    <ToastContainer />
                </div>
                :
                (this.state.noteId === key.id) ?
                    <div key={key.id}>
                        <Modal
                            isOpen={this.state.modal}
                            fade={false}
                            toggle={this.handleToggleOpen}
                            className={this.props.className}
                            centered
                        >
                            <ModalHeader toggle={this.handleToggleOpen}>
                                <input type="text"
                                    className="take-note-input"
                                    placeholder="Title"
                                    name="title"
                                    value={this.state.title}
                                    onChange={this.handleChange}
                                />
                            </ModalHeader>
                            <ModalBody>
                                <textarea
                                    className="take-note-input note-description"
                                    rows="5"
                                    placeholder="Take a note"
                                    name="description"
                                    value={this.state.description}
                                    onChange={this.handleChange}
                                />
                            </ModalBody>
                            <ModalFooter className="modal-footer-note">
                                <CardLink onClick={this.handleRemainder}>
                                    <Reminder
                                        toolsPropsToReminder={this.handleReminder}
                                        noteID={key.id}
                                        id="color-picker"
                                    >
                                    </Reminder>
                                </CardLink>

                                <CardLink >
                                    <Tooltip title="Collaborator">
                                        <img className="update-card-img"
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
                                    onClick={() => this.handleArchive(key.id)}>
                                    <Tooltip title="Archive">
                                        <img className="update-card-img"
                                            src={require('../assets/img/archived.svg')}
                                            alt="color picker" />
                                    </Tooltip>
                                </CardLink>
                                <CardLink >
                                    <Tooltip title="Add image">
                                        <img className="update-card-img"
                                            src={require('../assets/img/add_image.svg')}
                                            alt="add_image" />
                                    </Tooltip>
                                </CardLink>

                                <CardLink ></CardLink>
                                <MoreOptions
                                toolsPropsToColorpallete={this.handleMoreOptions}
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
                            </ModalFooter>
                            <ToastContainer/>
                        </Modal>
                    </div>

                    :
                    null
            )
        })
        return (
            <div className="card-grid">
                {notes}
            </div>
        )
    }
}

export default GetAllNotes;