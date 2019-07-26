import React, { Component } from 'react'
import { Card, CardText, CardBody, CardTitle, CardLink, Label } from 'reactstrap'
import NoteServices from '../services/NoteServices';
import ColorPallete from './Color';
import Tooltip from '@material-ui/core/Tooltip';
import { Chip, Avatar, InputBase } from '@material-ui/core';
import Reminder from './Reminder';
import { makeStyles } from '@material-ui/core/styles';
import MoreOptions from './MoreOptions'
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
const addNotes = new NoteServices().addNotes;
class CreateNote extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            description: '',
            title: '',
            newNote: [],
            reminder: '',
            color: '',
            isArchived: false,
            labelIdList: '',
            label: '',
            collaboratorId: '',
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleToggleOpen = (e) => {
        this.setState({
            open: true,
            description: '',
            title: '',
            color: '',
            reminder: '',
            isArchived: false,
            labelIdList: '',
            label: '',
        })
    }

    handleReminder = (reminderdate) => {
        this.setState({ reminder: reminderdate })
    }

    handleColorChanger = (value) => {

        this.setState({ color: value })
    }

    handleArchive = () => {
        this.setState({ isArchived: true });
        console.log(this.state.isArchived);

    }

    handleToggle = () => {
        this.setState({ open: !this.state.open });
        try {
            if (this.state.description !== '' && this.state.title !== '') {
                var data = {
                    'title': this.state.title,
                    'description': this.state.description,
                    'reminder': this.state.reminder,
                    'labelIdList': [this.state.labelIdList],
                    'color': this.state.color,
                    'isArchived': this.state.isArchived,
                }
                let formData = new FormData();    //formdata object
                formData.append('title', this.state.title);   //append the values with key, value pair
                formData.append('description', this.state.description);
                formData.append('reminder', this.state.reminder);
                formData.append('labelIdList', this.state.labelIdList);
                formData.append('color', this.state.color);
                formData.append('isArchived', this.state.isArchived);

                console.log("create note 78", data);
                console.log("label 80", this.state.labelIdList, this.state.label);

                addNotes(data)
                    .then(response => {
                        console.log("create note 83 ", response);
                        this.setState({ newNote: response.data.status.details })
                        console.log("create note 85", this.state.newNote);
                        this.props.getNewNote(this.state.newNote);
                    })
                    .catch(err => {
                        console.log("Eroorrrrrr....", err);
                    })
            }
        } catch {

        }
    }

    addLabelToCreateNote = (labelIdList, label) => {
        console.log("labelidlist >>>>", labelIdList);

        this.setState({
            labelIdList: labelIdList,
            label: label
        })
    }

    handleLabelDeleteChip = () => {
        this.setState({
            label: '',
        })
    }
    handleReminderDeleteChip = () => {
        this.setState({
            reminder: ''
        })
    }

    SaveCollaboratorToCreateNote = (collaboratorId) => {
        this.setState({
            collaboratorId: collaboratorId
        })
    }
    render() {
        return (!this.state.open ?
            <div className="take-note-div">
                <Card className="take-note-card " >
                    <CardBody className="card-body-text">
                        <CardText>
                            <input
                                type="text"
                                className="take-note-input"
                                placeholder="Take a note..."
                                onClick={this.handleToggleOpen}
                            />
                        </CardText>
                        <CardText className="create-note-icons">
                            <CardLink ><i className="fa fa-pencil fa-fw fa-lg " aria-hidden="true"></i></CardLink>
                            <CardLink ><i className="fa fa-check-square-o fa-fw fa-lg " aria-hidden="true"></i></CardLink>
                        </CardText>
                    </CardBody>
                </Card>
            </div>
            :
            <div className="take-note-div-desc">
                <Card className="take-note-card-description "

                    style={{ backgroundColor: this.state.color }}>
                    <CardBody className="card-body-desc">
                        <CardTitle>

                            <InputBase
                                id="outlined-dense-multiline"
                                margin="dense"
                                variant="outlined"
                                multiline
                                className="take-note-input"
                                placeholder="Title"
                                name="title"
                                value={this.state.title}
                                onChange={this.handleChange}
                                style={{ backgroundColor: this.state.color }}

                            />
                        </CardTitle>
                        <div>
                            <InputBase
                                id="outlined-dense-multiline"
                                margin="dense"
                                variant="outlined"
                                multiline
                                className="take-note-input note-description"
                                placeholder="Take a note"
                                name="description"
                                value={this.state.description}
                                onChange={this.handleChange}
                                style={{ backgroundColor: this.state.color }}
                            />
                            <div className="create-note-chip">
                                {(this.state.reminder !== '') ?
                                    <div>
                                        <Chip
                                            label={this.state.reminder.toString().substring(0, 24)}
                                            onDelete={this.handleReminderDeleteChip}
                                            className={useStyles.chip}
                                            variant="outlined"
                                            size="small"
                                        />
                                    </div>
                                    :
                                    null
                                }

                                {(this.state.label !== '') &&
                                    <div>
                                        <Chip
                                            // avatar={<Avatar alt="Natacha" src="/static/images/avatar/1.jpg" />}
                                            label={this.state.label}
                                            onDelete={this.handleLabelDeleteChip}
                                            className={useStyles.chip}
                                            variant="outlined"
                                            size="small"
                                        />
                                    </div>
                                }
                                {(this.state.collaboratorId !== '') &&
                                    <div className="collab">
                                        <Tooltip title={this.state.collaboratorId}>
                                            <Avatar>
                                                <span>{this.state.collaboratorId.toString().substring(0, 1)}</span>
                                            </Avatar>
                                        </Tooltip>
                                    </div>
                                }
                            </div>
                        </div>
                    </CardBody>
                    <CardBody className="create-card-bottom">
                        <Reminder
                            toolsPropsToReminder={this.handleReminder}
                            id="color-picker"
                        >
                        </Reminder>

                        <CardLink>
                            <CollaboratorComponent
                                CreateNoteToCollaborator={true}
                                removeCollaborator={this.removeCollaborator}
                                SaveCollaboratorToCreateNote={this.SaveCollaboratorToCreateNote}
                            />
                        </CardLink>

                        <ColorPallete
                            toolsPropsToColorpallete={this.handleColorChanger}
                            />

                        <CardLink
                            onClick={this.handleArchive}
                        >
                            <Tooltip title="Archive">
                                <img className="img"
                                    src={require('../assets/img/archived.svg')}
                                    alt="color picker"
                                />
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
                            addLabelToCreateNote={this.addLabelToCreateNote}
                            noteID={''}
                        >
                        </MoreOptions>
                        <CardLink ></CardLink>

                        <CardLink
                            className="close-btn"
                            onClick={this.handleToggle}
                        >
                            <Label>Close</Label>
                        </CardLink>
                    </CardBody>
                </Card>
            </div>
        )
    }
}
export default CreateNote;

