import React, { Component } from 'react'
import { Popover, PopoverBody, PopoverHeader } from 'reactstrap'
import IconButton from '@material-ui/core/IconButton';
import { withRouter } from 'react-router-dom';
import { Button, Tooltip, ClickAwayListener } from '@material-ui/core';
import Services from '../services/UserServices';

const profile = new Services();
const url = "http://34.213.106.173/"

class UploadImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            popoverOpen: false,
            profilePic: '',
        }
    }

    componentDidMount() {
        if (localStorage.getItem("ProfileImage") !== null) {
            this.setState({
                profilePic: localStorage.getItem("ProfileImage")
            })
        }
    }

    handlePopover = () => {
        this.setState({ popoverOpen: !this.state.popoverOpen });
    }
    handleLogout = () => {
        localStorage.clear();
        this.props.history.push('/signin');
    }

    handleClickAway = () => {
        this.setState({popoverOpen: false})
    }
    handleProfilePic = (event) => {
        const formData = new FormData()
        formData.append('file', event.target.files[0])
        profile.uploadProfileImage(formData)
            .then(response => {
                localStorage.setItem('ProfileImage', url+response.data.status.imageUrl)
                this.setState({
                    profilePic: url + response.data.status.imageUrl
                })
                console.log("Image URL", this.state.profilePic);
            })
            .catch(error => {
                console.log("error while uploading image ",error);
            })
    }

    render() {
        return (
            <ClickAwayListener onClickAway={this.handleClickAway}>
            <div>
                
                <div className="user-profile">
                    <div id="Popover1">
                        <IconButton className="user-profile-btn" >
                            <Tooltip title="Profile">
                            <img
                                src={this.state.profilePic}
                                alt="profile pic"
                                style={{ borderRadius: "50%" }}
                                className="profile-pic"
                            />
                            </Tooltip>
                        </IconButton>
                    </div>
                </div>
                <div>
                    <Popover
                        placement="bottom"
                        isOpen={this.state.popoverOpen}
                        target="Popover1"
                        toggle={this.handlePopover}
                    >
                        <PopoverHeader>
                            <div className="user-profile-info">
                                <input
                                    accept="image/*"
                                    id="contained-button-file"
                                    multiple
                                    type="file"
                                    onChange={this.handleProfilePic}
                                    style={{ display: "none" }}
                                />
                                <label htmlFor="contained-button-file">
                                    <IconButton component="span">
                                        <Tooltip title="Change profile">
                                        <img
                                            htmlFor="contained-button-file"
                                            src={this.state.profilePic}
                                            alt="profile pic"
                                            style={{ borderRadius: "50%" }}
                                            className="profile-pic-popover"
                                        />
                                        </Tooltip>
                                    </IconButton>
                                </label>

                                <div>
                                    <label>{localStorage.getItem('firstName')}</label>
                                    <label>{localStorage.getItem('email')}</label>
                                </div>
                            </div>
                        </PopoverHeader>
                        <PopoverBody className="profile-bottom">
                            <div>
                                <Button variant="outlined" disabled><span className="add-account">Add account</span></Button>
                            </div>
                            <div>
                                <Button variant="outlined" onClick={this.handleLogout}><span className="add-account">Sign out</span></Button>
                            </div>
                        </PopoverBody>
                    </Popover>
                </div>
               
            </div>
            </ClickAwayListener>
        )
    }
}


export default withRouter(UploadImage);

