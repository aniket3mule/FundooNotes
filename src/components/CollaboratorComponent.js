import React, { Component } from 'react'
import { Tooltip, Dialog, DialogTitle, DialogContent, DialogActions, Button, List, ListItem, ListItemText, Paper, Avatar, InputBase } from '@material-ui/core';
import UserService from '../services/UserServices'
import NoteService from '../services/NoteServices'
import { MuiThemeProvider, createMuiTheme, } from '@material-ui/core';
import Close from '@material-ui/icons/Close'

const UserServices = new UserService();
const NoteServices = new NoteService();
const thm = createMuiTheme({
    overrides: {
        MuiDialog: {
            paperWidthSm: {
                overflow: "Hidden",
                width: "100%"
            }
        },
        MuiPaper: {
            root: {
                margin: "1px 0 0 50px"
            },
            rounded: {
                borderRadius: "10px",
                boxShadow: "0 4px 6px rgb(143, 143, 143)"
            }
        },
        MuiListItem: {
            root: {
                textDecoration: "underline",
                cursor: "pointer",
                fontSize: "10px",
                height: "1.5rem",
                border: "solid 1px lightgray"
            }
        },
        MuiTypography: {
            body1: {
                fontSize: "12px"
            }
        },
        // MuiInputBase : {
        //     root:{
        //         fontSize:'0.8rem'
        //     }
        // }
    }
});

// const useStyles = makeStyles(theme => ({
//     root: {
//         fontSize:'0.6rem'
//     },
//     chip: {
//         margin: theme.spacing(1),
//     },
// }));

class CollaboratorComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            closeEdit: false,
            collabSearch: '',
            userList: [],
            suggetions: [],
            searchText: '',
            userDetails: [],
            collaborators:[],
        }
        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClose = this.handleClose.bind(this);
        this.handleSaveCollaborator = this.handleSaveCollaborator.bind(this);
        this.suggetionSelected = this.suggetionSelected.bind(this);
    }

    componentDidMount() {
        UserServices.getAllUsers()
            .then(response => {
                // console.log("All users list Collaborator", response.data);
                let userArray = [];
                userArray = response.data.map(key => {
                    return key.email;
                })
                this.setState({
                    userList: userArray
                })
                // console.log("conponent did mount ", this.state.userList);

            })
            .catch(err => {
                console.log("error in collab : ", err);
            })

            // this.setState({
            //     collaborators: this.props.collaborators
            // })
    }

    closePopper() {
        this.setState({
            open: false,
           
        })
    }

    handleClickOpen() {
        this.setState({
            open: true,
            // collaborators: this.props.collaborators
        })
    }

    handleClose() {
        this.setState({
            open: false,
        })
    }

    handleCloseEdit = () => {
        this.setState({
            closeEdit: !this.state.closeEdit
        })
    }

    removeCollaboratorsNotes= async (collaboratorUserId) =>{
        await NoteServices.removeCollaboratorsNotes( this.props.noteID, collaboratorUserId)
        .then((response) => {
            console.log("delete response", response);
            this.props.removeCollaborator(true);
            // this.setState({
            //     collaborators: this.props.updatedCollaborator
            // })
        })
    }

    handleOnchange = (e) => {
        const value = e.target.value;
        let suggetions = [];
        if (value.length > 0) {
            const regex = new RegExp(`^${value}`, 'i');
            suggetions = this.state.userList.sort().filter(v => regex.test(v));
        }
        this.setState(() => ({
            suggetions, searchText: value
        }))
    }

    renderSuggetions() {
        const { suggetions } = this.state;
        if (suggetions.length === 0) {
            return null
        }
        return (
            <Paper style={{height:"auto",maxHeight: "125px", overflow:"auto"}}>
                <List>
                    {suggetions.map((users) =>
                        users !== localStorage.getItem('email') &&
                        <ListItem onClick={() => this.suggetionSelected(users)} key={users.userId}><ListItemText>{users}</ListItemText>
                        </ListItem>
                    )}
                </List>
            </Paper>
        )
    }

    async suggetionSelected(value){
        this.setState(() => ({
            searchText: value,
            suggetions: [],
        }))

        var data = {
            "searchWord": value
        }

        await UserServices.searchUserList(data)
            .then(response => {
                console.log("user details", response);
                this.setState({
                    userDetails: response.data.data.details
                })
            })
            .catch(err => {
                console.log("error in searchUserList");
            })
    }

    async handleSaveCollaborator (){
        // this.props.SaveCollaboratorToCreateNote(this.state.searchText)
        const { userDetails } = this.state;
        const user = await userDetails.map(key => { 
            return key })

            if (this.props.CreateNoteToCollaborator) {
                this.props.SaveCollaboratorToCreateNote(user[0])
                this.setState({
                    open: false,
                    searchText: ''      
                })
            }else{
                NoteServices.addcollaboratorsNotes(user[0], this.props.noteID)
        
            .then(async (response) => {
                console.log("collab added successfully", response);
                
                await this.props.saveCollaborator(true);
                this.setState({
                    open: false,
                    searchText: ''      
                })
            })
            .catch(error => {
                console.log("err in collab", error);
            })
            }
    }

    render() {
        // console.log("user list data", this.state.searchText);
        var collaboratorUser = ''
        if (!this.props.CreateNoteToCollaborator) {
            collaboratorUser = this.props.collaborators.map(user => {
                return (
                    <div className="user-profile-info" key={user.userId}>
                        <Avatar>
                            <span>{user.firstName.toString().substring(0, 1).toUpperCase()}</span>
                        </Avatar>
    
                        <div className="collab-owner">
                            <div><strong>{user.email}</strong></div>
                        </div>
                        <div style={{alignSelf:"center", cursor: "pointer"}}>
                            <Tooltip title="Delete">
                            <Close
                            onClick={async() => await this.removeCollaboratorsNotes(user.userId)}
                            />
                            </Tooltip>
                        </div>
                    </div>
                )
            })
        }

        const { searchText } = this.state;
        return (
            <div>
                <MuiThemeProvider theme={thm}>
                    <div onClick={this.handleClickOpen} style={{ cursor: 'pointer' }}>
                        <Tooltip title="Collaborator">
                            <img
                                src={require('../assets/img/colaborator.svg')}
                                alt="Collaborator"
                            />
                        </Tooltip>
                    </div>

                    <Dialog
                        open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby="responsive-dialog-title"
                        style={{ borderRadius: "8px" }}
                    >
                        <div style={{ minHeight: "40%", minWidth: "50%", borderRadius: "8px" }}>
                            <div>
                                <DialogTitle id="responsive-dialog-title"
                                    style={{ borderBottom: "solid 1px lightgray", padding: "10px 24px" }}
                                >
                                    <span>Collaborator</span>
                                </DialogTitle>
                            </div>
                            <DialogContent>
                            <div className="user-profile-info">
                                    <div className="collab-icon-button">
                                        <img
                                            src={localStorage.getItem("ProfileImage")}
                                            alt="profile pic"
                                            className="collab-icon-image"
                                        />
                                    </div>

                                    <div className="collab-owner">
                                        <div><strong><span>{localStorage.getItem('firstName')} {localStorage.getItem('lastName')}</span></strong><i><span> {'(Owner)'}</span></i></div>
                                        <div>{localStorage.getItem('email')}</div>
                                    </div>
                                </div>
                                </DialogContent>
                            <DialogContent
                                style={{ maxHeight: "180px", minWidth: "250px" }}
                            >
                                {collaboratorUser}
                                
                            </DialogContent>
                            <DialogContent>
                            <div className="collab-input-search" >
                                    <div className="collab-icon-sm">
                                        <img
                                            src={require('../assets/img/person_add_grey_18x18.svg')}
                                            alt="profile pic"
                                        />
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "column", width:"100%" }}>
                                        <div className="collab-input-search-div">
                                            <InputBase
                                                placeholder="Person or email to share with"
                                                name="collabSearch"
                                                value={searchText}
                                                onChange={this.handleOnchange}
                                                style={{fontSize:'0.8rem', width:"100%"}}
                                            />
                                        </div>
                                    </div>
                                </div>
                                {this.renderSuggetions()}
                            </DialogContent>

                            <DialogActions style={{ backgroundColor: "rgba(0,0,0,0.07)" }}>
                                <Button
                                    className="close-btn"
                                    onClick={this.handleClose}
                                    style={{ cursor: "pointer" }}
                                >
                                    <span style={{ textTransform: "none" }}> Close </span>
                                </Button>
                                <Button
                                    className="close-btn"
                                    onClick={this.handleSaveCollaborator}
                                    style={{ cursor: "pointer" }}
                                >
                                    <span style={{ textTransform: "none" }}> Save </span>
                                </Button>
                            </DialogActions>
                        </div>
                    </Dialog>
                </MuiThemeProvider>
            </div>
        )
    }
}

export default CollaboratorComponent;