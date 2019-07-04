import React, { Component } from 'react'
import { Card, CardText, CardBody, CardTitle, CardLink, Label } from 'reactstrap'
import NoteServices from '../services/NoteServices';
import ColorPallete from './Color';
import Tooltip from '@material-ui/core/Tooltip';
import Reminder from './Reminder';
import MoreOptions from './MoreOptions'

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
            label:'',
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
                    'labelIdList':[this.state.label],
                    'color': this.state.color,
                    'isArchived': this.state.isArchived,
                }
                let formData = new FormData();    //formdata object
                formData.append('title', this.state.title);   //append the values with key, value pair
                formData.append('description', this.state.description);
                formData.append('reminder', this.state.reminder);
                formData.append('labelIdList', this.state.label);
                formData.append('color', this.state.color);
                formData.append('isArchived', this.state.isArchived);


                console.log("create note 40", data);
                console.log("label",  this.state.label);
                
                addNotes(data)
                    .then(response => {
                        console.log("create note 44 ", response);
                        this.setState({ newNote: response.data.status.details })

                        console.log("create note 47", this.state.newNote);

                        this.props.getNewNote(this.state.newNote);
                    })
                    .catch(err => {
                        console.log("Eroorrrrrr....", err);
                        // toast.info("Error in Create Note", {
                        //     position: toast.POSITION.TOP_CENTER
                        // });
                    })
            }
        } catch {

        }
    }

    handleAddNote = (value)=>{
        this.setState({
            label:value
        })
    }
    render() {
        // const { description, title } = this.state;

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
                        <CardText>
                            <CardLink ><i className="fa fa-pencil fa-fw fa-lg " aria-hidden="true"></i></CardLink>
                            <CardLink ><i className="fa fa-check-square-o fa-fw fa-lg " aria-hidden="true"></i></CardLink>
                        </CardText>
                    </CardBody>
                </Card>
            </div>
            :
            <div className="take-note-div-desc">
                <Card className="take-note-card-description ">
                    <CardBody className="card-body-desc">
                        <CardTitle>
                            <input type="text"
                                className="take-note-input"
                                placeholder="Title"
                                name="title"
                                value={this.state.title}
                                onChange={this.handleChange}
                            />
                        </CardTitle>
                        <CardText>
                            <textarea
                                className="take-note-input note-description"
                                placeholder="Take a note"
                                name="description"
                                value={this.state.description}
                                onChange={this.handleChange}
                            />
                        </CardText>
                    </CardBody>
                    <CardBody className="card-bottom">

                        <Reminder
                            toolsPropsToReminder={this.handleReminder}
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
                        ></ColorPallete>

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
                            addLabelToCreateNote={this.handleAddNote}
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

