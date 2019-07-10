// import React, { Component } from 'react';
// import { Card, CardBody, CardTitle, CardLink, Label, Container } from 'reactstrap';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.min.css';
// import Reminder from './Reminder'
// import ColorPallete from './Color';
// import Tooltip from '@material-ui/core/Tooltip';
// import { Chip, Dialog } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core/styles';
// import MoreOptions from './MoreOptions';

// const useStyles = makeStyles(theme => ({
//     root: {
//         display: 'flex',
//         justifyContent: 'center',
//         flexWrap: 'wrap',
//     },
//     chip: {
//         margin: theme.spacing(1),
//     },
// }));

// class DisplayRemindersComponent extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             noteId: '',
//             title: '',
//             description: '',
//             modal: false,
//         }
//     }

//     handleToggleOpen = (id, oldTitle, oldDescription) => {
//         this.setState(prevState => ({
//             modal: !prevState.modal,
//             noteId: id,
//             title: oldTitle,
//             description: oldDescription
//         }));
//     }

//     handleClose = () => {
//         this.setState({
//             modal: false
//         })
//     }
//     render() {
//         var listgridvalue = this.props.listGridView;
//         const listgridview = listgridvalue ? "list-view" : null;
//         const modalbottom = listgridvalue ? "list-view-bottom" : "card-bottom";

//         const allReminders = this.props.allNotes.map(key => {
//             return (
//                 (key.reminder.length > 0) &&
//                 <div key={key.id} className={listgridview}>
//                     <Container className="card-margin" >
//                         <Card className="take-note-user-card-description "
//                             onChange={() => this.handleColorChanger(key.color, key.id)}
//                             style={{ backgroundColor: key.color }}>
//                             <CardBody className="user-card-body-desc">
//                                 <CardTitle>
//                                     <input
//                                         type="text"
//                                         className="take-note-input"
//                                         placeholder="Title"
//                                         value={key.title}
//                                         onClick={() => this.handleToggleOpen(key.id, key.title, key.description)}
//                                         readOnly
//                                         style={{ backgroundColor: key.color }}
//                                     />
//                                 </CardTitle>
//                                 <textarea
//                                     className="take-note-input note-description"
//                                     rows="5"
//                                     placeholder="Take a note"
//                                     value={key.description}
//                                     onClick={() => this.handleToggleOpen(key.id, key.title, key.description)}
//                                     readOnly
//                                     style={{ backgroundColor: key.color }}
//                                 />

//                                 {(key.reminder.length > 0) &&
//                                     <div>
//                                         <Chip
//                                             // avatar={<Avatar alt="Natacha" src="/static/images/avatar/1.jpg" />}
//                                             label={key.reminder.toString().substring(0, 24)}
//                                             onDelete={() => this.handleDeleteChip(key.id)}
//                                             className={useStyles.chip}
//                                             variant="outlined"
//                                             size="small"
//                                         />
//                                     </div>
//                                 }
//                             </CardBody>
//                             <CardBody >
//                                 <div className={modalbottom}>
//                                     <Reminder
//                                         toolsPropsToReminder={this.handleReminder}
//                                         noteID={key.id}
//                                         id="color-picker"
//                                     >
//                                     </Reminder>

//                                     <CardLink>
//                                         <Tooltip title="Collaborator">
//                                             <img className="img"
//                                                 src={require('../assets/img/colaborator.svg')}
//                                                 alt="color picker"
//                                             />
//                                         </Tooltip>
//                                     </CardLink>

//                                     <ColorPallete
//                                         toolsPropsToColorpallete={this.handleColorChanger}
//                                         noteID={key.id}
//                                         id="color-picker"
//                                     >
//                                     </ColorPallete>

//                                     <CardLink
//                                         onClick={() => this.handleArchive(key.id)}
//                                     >
//                                         <Tooltip title="Archive">
//                                             <img className="img"
//                                                 src={require('../assets/img/archived.svg')}
//                                                 alt="color picker"
//                                             />
//                                         </Tooltip>
//                                     </CardLink>
//                                     <CardLink className="add-image">
//                                         <Tooltip title="add image">
//                                             <img className="img"
//                                                 src={require('../assets/img/add_image.svg')}
//                                                 alt="color picker"
//                                             />
//                                         </Tooltip>
//                                     </CardLink>
//                                     <MoreOptions
//                                         toolsPropsToMoreOptions={this.handleDeleteNote}
//                                         noteID={key.id}
//                                         id="color-picker">
//                                     </MoreOptions>
//                                 </div>
//                             </CardBody>
//                         </Card>
//                     </Container>
//                     <ToastContainer />

//                     {(this.state.noteId === key.id) &&
//                         <div key={key.id} >
//                             <Dialog
//                                 key={key.id}
//                                 open={this.state.modal}
//                                 onClose={this.handleClose}
//                                 aria-labelledby="responsive-dialog-title"
//                                 className="dialog-bottom-icons"
//                             >

//                                 <Card className="take-note-user-card-description "
//                                     onChange={() => this.handleColorChanger(key.color, key.id)}
//                                     style={{ backgroundColor: key.color }}>
//                                     <CardBody className="user-card-body-desc">
//                                         <CardTitle>
//                                             <textarea
//                                                 style={{ backgroundColor: key.color }}
//                                                 type="text"
//                                                 className="take-note-input"
//                                                 placeholder="Title"
//                                                 name="title"
//                                                 value={this.state.title}
//                                                 onChange={this.handleChange}
//                                                 rows="2"
//                                             />
//                                         </CardTitle>
//                                         <textarea
//                                             style={{ backgroundColor: key.color }}
//                                             className="take-note-input note-description"
//                                             rows="5"
//                                             placeholder="Take a note"
//                                             name="description"
//                                             value={this.state.description}
//                                             onChange={this.handleChange}
//                                         />

//                                         {(key.reminder.length > 0) &&
//                                             <div>
//                                                 <Chip
//                                                     // avatar={<Avatar alt="Natacha" src="/static/images/avatar/1.jpg" />}
//                                                     label={key.reminder.toString().substring(0, 24)}
//                                                     onDelete={() => this.handleDeleteChip(key.id)}
//                                                     className={useStyles.chip}
//                                                     variant="outlined"
//                                                     size="small"
//                                                 />
//                                             </div>
//                                         }
//                                     </CardBody>
//                                     <CardBody >
//                                         <div
//                                             className="modal-footer-note"
//                                         >
//                                             <CardLink onClick={this.handleRemainder}>
//                                                 <Reminder
//                                                     toolsPropsToReminder={this.handleReminder}
//                                                     noteID={key.id}
//                                                     id="color-picker"
//                                                 >
//                                                 </Reminder>
//                                             </CardLink>

//                                             <CardLink >
//                                                 <Tooltip title="Collaborator">
//                                                     <img className="img"
//                                                         src={require('../assets/img/colaborator.svg')}
//                                                         alt="color picker" />
//                                                 </Tooltip>
//                                             </CardLink>

//                                             <ColorPallete
//                                                 toolsPropsToColorpallete={this.handleColorChanger}
//                                                 noteID={key.id}
//                                                 id="color-picker"
//                                             >
//                                             </ColorPallete>

//                                             <CardLink
//                                                 onClick={() => this.handleArchive(key.id)}>
//                                                 <Tooltip title="Archive">
//                                                     <img className="img"
//                                                         src={require('../assets/img/archived.svg')}
//                                                         alt="color picker" />
//                                                 </Tooltip>
//                                             </CardLink>
//                                             <CardLink>
//                                                 <Tooltip title="add image">
//                                                     <img className="img"
//                                                         src={require('../assets/img/add_image.svg')}
//                                                         alt="color picker"
//                                                     />
//                                                 </Tooltip>
//                                             </CardLink>
//                                             <MoreOptions
//                                                 toolsPropsToColorpallete={this.handleMoreOptions}
//                                                 noteID={key.id}
//                                                 id="color-picker">

//                                             </MoreOptions>
//                                             <CardLink ></CardLink>
//                                             <CardLink
//                                                 className="close-btn"
//                                                 onClick={this.handleToggleOpen}
//                                             >
//                                                 <Label>Close</Label>
//                                             </CardLink>
//                                         </div>
//                                     </CardBody>
//                                 </Card>
//                             </Dialog>
//                         </div>}
//                 </div>

//             )
//         })
//         return (
//             <div>
//                 {allReminders}
//             </div>
//         )
//     }
// }

// export default DisplayRemindersComponent