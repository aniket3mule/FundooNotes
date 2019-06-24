import React, { Component } from 'react';
import { Card, CardBody, CardText, CardTitle, CardLink, Label, Container } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Tooltip } from 'reactstrap';
import GetNote from '../services/NoteService'
import {toast,ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import ColorPallete from './Color';

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
            modal: false,
            isArchived : true,
            tooltipOpen: false
        }

        this.handleToggleOpen = this.handleToggleOpen.bind(this);
        // this.handleModal = this.handleModal.bind(this)
    }

    componentDidMount() {
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
            if ( this.state.modal && (this.state.description !== oldTitle || this.state.title !== oldDescription)) {
                var data = {
                    'noteId': this.state.noteId,
                    'title': this.state.title,
                    'description': this.state.description
                }
                let formData = new FormData();    //formdata object
                formData.append('noteId', this.state.noteId);
                formData.append('title', this.state.title);   //append the values with key, value pair
                formData.append('description', this.state.description);
               
                console.log("get all note data",data);
               
                NoteService.updateNote(data)
                .then(response => {
                    console.log("uddate note function",response);
                    toast.success("Note Saved", {
                        position: toast.POSITION.TOP_CENTER
                    });
                })
                .catch(err => {
                    console.log("Eroorrrrrr....",err);
                    toast.info("Error in update note", {
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

    handleArchive = (noteId) => {
        // this.props.archiveNote(noteId);
        console.log(noteId);
        this.setState({ isArchived: !this.state.isArchived });
       console.log(this.state.isArchived);
       
        var note = {
            'noteIdList' : [noteId],
            'isArchived': this.state.isArchived,
        }

        //Update service
        NoteService.archiveNote(note)
        .then(response => {
            console.log(response);
            toast.success("Note archived ", {
                position: toast.POSITION.TOP_CENTER
            });
        })
        .catch(err => {
            console.log("Eroorrrrrr....",err);
            toast.info("Error in note archive", {
                position: toast.POSITION.TOP_CENTER
            });
        })
    }

    handleColorChanger= (value,noteId) =>{
        var note={}

    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleToggleTooltip = () => {
        console.log("tooltips......",this.state.tooltipOpen)
        this.setState({
            tooltipOpen: !this.state.tooltipOpen
        });
        
      }

    render() {
        var notes = this.state.allNotes.map((key) => {
            return (!this.state.modal ?
                <div key= {key.id}>
               <Container className="card-margin" >
                <Card className="take-note-user-card-description ">
                    <CardBody className="-user-card-body-desc">
                        <CardTitle>
                            <input
                            type="text"
                            className="take-note-input"
                            placeholder="Title"
                            value={key.title}
                            onClick={() => this.handleToggleOpen(key.id, key.title, key.description)}
                            readOnly
                            />
                        </CardTitle>
                        <CardText>
                            <textarea
                                className="take-note-input note-description"
                                rows="5"
                                placeholder="Take a note"
                                value={key.description}
                                onClick={() => this.handleToggleOpen(key.id, key.title, key.description)}
                                readOnly
                            />
                        </CardText>
                    </CardBody>
                    <CardBody className="card-bottom">
                       
                            <CardLink 
                            onClick={this.handleRemainder}
                            >
                            <i className="fa fa-bell-o fa-fw " aria-hidden="true"/>
                            </CardLink>
                            <CardLink>
                            <img className="img"
                            src={require('../assets/img/colaborator.svg')}
                            alt="color picker"
                            />
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
                            <img className="img" 
                            src={require('../assets/img/archived.svg')}
                            alt="color picker" 
                            />
                            </CardLink>
                           
                            <CardLink >
                            <i className="fa fa-picture-o fa-fw " aria-hidden="true"/>
                            </CardLink>
                            <CardLink >
                            <i className="fa fa-check-square-o fa-fw " aria-hidden="true"/>
                            </CardLink>
                    </CardBody>
                </Card>
                </Container>
                <ToastContainer/>
                </div>            
                :
                (this.state.noteId === key.id) ?
                    <div key={key.id}>
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
                            
                            <CardLink onClick={this.handleRemainder}>
                                <i className="fa fa-bell-o fa-fw fa-lg " aria-hidden="true"/>
                            </CardLink>
                            <CardLink >
                                <img className="update-card-img" 
                                src={require('../assets/img/colaborator.svg')} 
                                alt="color picker" />
                            </CardLink>
                            
                            <ColorPallete
                            toolsPropsToColorpallete={this.handleColorChanger}
                            noteID={key.id}
                            id="color-picker"
                            >
                          </ColorPallete>
                          

                            <CardLink 
                            onClick={()=> this.handleArchive(key.id)}>
                                <img className="update-card-img"
                                src={require('../assets/img/archived.svg')}
                                alt="color picker" />
                            </CardLink>
                            <CardLink >
                                <i className="fa fa-picture-o fa-fw fa-lg " aria-hidden="true" />
                            </CardLink>
                            <CardLink >
                                <i className="fa fa-check-square-o fa-fw fa-lg" aria-hidden="true"/>
                            </CardLink>
                            <CardLink ></CardLink>
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