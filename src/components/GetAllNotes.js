import React, { Component } from 'react';
import { Card, CardBody, CardText, CardTitle, CardLink, Label, Container } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import GetNote from '../services/NoteService'
import {toast} from 'react-toastify'


const NoteService = new GetNote();
class GetAllNotes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allNotes: [],
            open: false,
            title: '',
            description: '',
            noteId: '',
            modal: false
        }

        this.handleToggleOpen = this.handleToggleOpen.bind(this);
        // this.handleModal = this.handleModal.bind(this)
    }

    componentDidMount() {

        //Print All notes
        NoteService.getAllNotes()
            .then(allNotes => {
                this.setState({ allNotes: allNotes.data.data.data })
                console.log("this data", this.state.allNotes);
            })
            .catch(err => {
                console.log(err);
            })
    }

    handleToggle = (e) => {
        this.setState({ open: !this.state.open });
        
    }

    handleToggleOpen= ( id, oldTitle, oldDescription)=> {
        this.setState(prevState => ({
            modal: !prevState.modal,
            noteId: id,
            title: oldTitle,
            description : oldDescription
        }));

        console.log("id ......", id);
        console.log("note id ......", this.state.noteId);
//update existing Note
        try {
            if ( this.state.modal && (this.state.description !== null || this.state.title !== null)) {
                var data = {
                    'noteId': this.state.noteId,
                    'title': this.state.title,
                    'description': this.state.description
                    
                }
                let formData = new FormData();    //formdata object
                formData.append('noteId', this.state.noteId);
                formData.append('title', this.state.title);   //append the values with key, value pair
                formData.append('description', this.state.description);
                console.log(data);
                NoteService.updateNote(data)
                .then(response => {
                    console.log(response);
                    toast.success("Note Saved", {
                        position: toast.POSITION.TOP_CENTER
                    });
                })
                .catch(err => {
                    console.log("Eroorrrrrr....",err);
                    toast.info("Error in connection", {
                        position: toast.POSITION.TOP_CENTER
                    });
                })
            }
        } catch {

        }
    }
    displayCard=(newCard)=>{
        this.setState({
            allNotes:[...this.state.allNotes,newCard]
        })
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        
        var notes = this.state.allNotes.map((key) => {
            return (!this.state.modal ?
                <div>
               <Container className="card-margin">
                <Card className="take-note-user-card-description ">
                    <CardBody className="-user-card-body-desc">
                        <CardTitle>
                            <input type="text"
                                className="take-note-input"
                                placeholder="Title"
                                value={key.title}
                                onClick={() => this.handleToggleOpen(key.id, key.title, key.description)}
                            />
                        </CardTitle>
                        <CardText>
                            <textarea
                                className="take-note-input note-description"
                                rows="5"
                                placeholder="Take a note"
                                value={key.description}
                                onClick={() => this.handleToggleOpen(key.id, key.title, key.description)}
                            />
                        </CardText>
                    </CardBody>
                    <CardBody className="card-bottom">
                        <CardText>
                            <CardLink ><i className="fa fa-bell-o fa-fw " aria-hidden="true"></i></CardLink>
                            <CardLink ><img className="img" src={require('../assets/img/colaborator.svg')} alt="color picker" /></CardLink>
                            <CardLink ><img className="img" src={require('../assets/img/color.svg')} alt="color picker" /></CardLink>
                            <CardLink ><img className="img" src={require('../assets/img/archived.svg')} alt="color picker" /></CardLink>
                            <CardLink ><i className="fa fa-picture-o fa-fw " aria-hidden="true"></i></CardLink>
                            <CardLink ><i className="fa fa-check-square-o fa-fw " aria-hidden="true"></i></CardLink>
                        </CardText>
                    </CardBody>
                </Card>
                </Container>
                </div>            
                :
                (this.state.noteId === key.id) ?

                    <div>
                        <Modal 
                        isOpen={this.state.modal}
                        fade={false}
                        toggle={this.toggle} 
                        className={this.props.className}
                        centered
                        >
                            <ModalHeader toggle={this.handleModal}>
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
                            
                                <CardLink ><i className="fa fa-bell-o fa-fw" aria-hidden="true"></i></CardLink>
                                <CardLink ><i className="fa fa-user-plus fa-fw fa-lg" aria-hidden="true"></i></CardLink>
                                <CardLink ><img className="img" src={require('../assets/img/color.svg')} alt="color picker" /></CardLink>
                                <CardLink ><i className="fa fa-archive fa-fw fa-lg" aria-hidden="true"></i></CardLink>
                                <CardLink ><i className="fa fa-picture-o fa-fw fa-lg" aria-hidden="true"></i></CardLink>
                                <CardLink ><i className="fa fa-check-square-o fa-fw fa-lg" aria-hidden="true"></i></CardLink>
                                <CardLink ></CardLink>
                                <CardLink ></CardLink>
                            
                            <CardLink 
                                    className="close-btn"
                                    onClick={this.handleToggleOpen}
                                >
                                    <Label>Close</Label>
                                </CardLink>
                            </ModalFooter>
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