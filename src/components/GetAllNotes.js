import React, { Component } from 'react';
import { Card, CardBody, CardText, CardTitle, CardLink, Label } from 'reactstrap';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import GetNote from '../services/NoteService'

const allNotes = new GetNote();
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
        const printAllNotes = allNotes.getAllNotes();
        printAllNotes
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

    handleToggleOpen(id) {
       // this.setState({ open: true });
        this.setState({ noteId: id });
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
        console.log("id ......", id);

        console.log("note id ......", this.state.noteId);

        try {
            if ( this.state.modal && (this.state.description !== null || this.state.title !== null)) {
                var data = {
                    'title': this.state.title,
                    'description': this.state.description,
                    'nodeId': this.state.noteId
                }
                let formData = new FormData();    //formdata object
                formData.append('title', this.state.title);   //append the values with key, value pair
                formData.append('description', this.state.description);
                formData.append('noteId', this.state.noteId);

                //console.log(data);
                allNotes.addNotes(data)
            }
        } catch {

        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    // handleModal() {
    //     this.setState(prevState => ({
    //         modal: !prevState.modal
    //     }));
    // }

    render() {
        var notes = this.state.allNotes.map((key) => {
            return (!this.state.modal ?
                <Card className="take-note-card-description ">
                    <CardBody className="card-body-desc">
                        <CardTitle>
                            <input type="text"
                                className="take-note-input"
                                placeholder="Title"
                                name="title"
                                value={key.title}
                                onClick={() => this.handleToggleOpen(key.id)}
                            />
                        </CardTitle>
                        <CardText>
                            <textarea
                                className="take-note-input note-description"
                                rows="5"
                                placeholder="Take a note"
                                name="description"
                                value={key.description}
                                onClick={() => this.handleToggleOpen(key.id)}
                            />
                        </CardText>
                    </CardBody>
                    <CardBody className="card-bottom">
                        <CardText>
                            <CardLink ><i className="fa fa-bell-o fa-fw " aria-hidden="true"></i></CardLink>
                            <CardLink ><i className="fa fa-user-plus fa-fw" aria-hidden="true"></i></CardLink>
                            <CardLink ><img className="img" src={require('../assets/img/color.svg')} alt="color picker" /></CardLink>
                            <CardLink ><i className="fa fa-archive fa-fw" aria-hidden="true"></i></CardLink>
                            <CardLink ><i className="fa fa-picture-o fa-fw " aria-hidden="true"></i></CardLink>
                            <CardLink ><i className="fa fa-check-square-o fa-fw " aria-hidden="true"></i></CardLink>
                        </CardText>
                    </CardBody>
                </Card>
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
                                    value={key.title}
                                />
                            </ModalHeader>
                            <ModalBody>
                            <textarea
                                    className="take-note-input note-description"
                                    rows="5"
                                    placeholder="Take a note"
                                    name="description"
                                    value={key.description}
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
                 





                    <Card className="take-note-card-description ">
                        <CardBody className="card-body-desc">
                            <CardTitle>
                               
                            </CardTitle>
                            <CardText>
                                <textarea
                                    className="take-note-input note-description"
                                    rows="5"
                                    placeholder="Take a note"
                                    name="description"
                                    value={key.description}
                                    onChange={this.handleChange}
                                />
                            </CardText>
                        </CardBody>
                        <CardBody className="card-bottom">
                            <CardText>
                                <CardLink ><i className="fa fa-bell-o fa-fw" aria-hidden="true"></i></CardLink>
                                <CardLink ><i className="fa fa-user-plus fa-fw fa-lg" aria-hidden="true"></i></CardLink>
                                <CardLink ><img className="img" src={require('../assets/img/color.svg')} alt="color picker" /></CardLink>
                                <CardLink ><i className="fa fa-archive fa-fw fa-lg" aria-hidden="true"></i></CardLink>
                                <CardLink ><i className="fa fa-picture-o fa-fw fa-lg" aria-hidden="true"></i></CardLink>
                                <CardLink ><i className="fa fa-check-square-o fa-fw fa-lg" aria-hidden="true"></i></CardLink>
                                <CardLink ></CardLink>
                                <CardLink ></CardLink>
                            </CardText>

                            <CardText>
                                
                            </CardText>
                        </CardBody>
                    </Card>
                    </div>
                :
                    null
            )

        })
        return (
            <div>
                {notes}
            </div>
        )
    }
}

export default GetAllNotes;