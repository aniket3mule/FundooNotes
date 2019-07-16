import React, { Component } from 'react'
import { Tooltip, Dialog, DialogTitle, DialogContent, DialogActions, Button, List, ListItem, ListItemText, Paper } from '@material-ui/core';
import UserService from '../services/UserServices'
import NoteService from '../services/NoteServices'
import { MuiThemeProvider, createMuiTheme, } from '@material-ui/core';

const UserServices = new UserService();
const NoteServices = new NoteService();
const thm = createMuiTheme({
    overrides: {
        MuiDialog: {
            paperWidthSm: {
                overflow: "Hidden",
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
    }
});

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
        }
        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClose = this.handleClose.bind(this);
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
                console.log("conponent did mount ", this.state.userList);

            })
            .catch(err => {
                console.log("error in collab : ", err);
            })
    }

    closePopper() {
        this.setState({
            open: false,
        })
    }

    handleClickOpen() {
        this.setState({
            open: true,
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
            <Paper >
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

    suggetionSelected = (value) => {
        this.setState(() => ({
            searchText: value,
            suggetions: []
        }))

        var data = {
            "searchWord": value
        }

        UserServices.searchUserList(data)
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

    handleSaveCollaborator = () => {
        const { userDetails } = this.state;
        const user = userDetails.map(key => { return key })

        NoteServices.addcollaboratorsNotes(user[0], this.props.noteID)
            .then(() => {
                console.log("collab added successfully");
            })
            .catch(err => {
                console.log("err in collab", err);
            })
    }

    render() {
        console.log("user list data", this.state.searchText);
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
                        <div style={{ minHeight: "130px", minWidth: "500px", borderRadius: "8px" }}>
                            <div>
                                <DialogTitle id="responsive-dialog-title"
                                    style={{ borderBottom: "solid 1px lightgray", padding: "10px 24px" }}
                                >
                                    <span>Collaborator</span>
                                </DialogTitle>
                            </div>
                            <DialogContent
                                style={{ minHeight: "120px", minWidth: "250px" }}
                            >
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
                                <div className="collab-input-search" >
                                    <div className="collab-icon-sm">
                                        <img
                                            src={require('../assets/img/person_add_grey_18x18.svg')}
                                            alt="profile pic"
                                        />
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "column" }}>
                                        <div className="collab-input-search-div">
                                            <input
                                                className="collab-input"
                                                placeholder="Person or email to share with"
                                                type="text"
                                                name="collabSearch"
                                                value={searchText}
                                                onChange={this.handleOnchange}
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