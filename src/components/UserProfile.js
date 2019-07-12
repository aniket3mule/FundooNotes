import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import { IconButton, Tooltip, Button } from "@material-ui/core";
import { withRouter } from 'react-router-dom';
import Services from "../services/UserServices";

const profile = new Services();
const url = "http://34.213.106.173/"

const styles = theme => ({
  typography: {
    margin: theme.spacing(2)
  }
});

class UploadProfile extends React.Component {
  state = {
    anchorEl: null,
    profilePic: '',
  };

  componentDidMount() {
    if (localStorage.getItem("ProfileImage") !== null) {
      this.setState({
        profilePic: localStorage.getItem("ProfileImage")
      })
      console.log("Did mount", localStorage.getItem("ProfileImage"));
    }
  };

  handleLogout = () => {
    localStorage.clear();
    this.props.history.push('/signin');
  };

  handleClick = event => {
    this.setState({
      anchorEl: event.currentTarget
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null
    });
  };

  handleProfilePic = (event) => {
    console.log("Profile Image", event.target.files[0]);

    const formData = new FormData()
    formData.append('file', event.target.files[0])
    profile.uploadProfileImage(formData)
      .then(response => {
        localStorage.setItem('ProfileImage', url + response.data.status.imageUrl)
        this.setState({
          profilePic: url + response.data.status.imageUrl
        })
        console.log("Image URL", this.state.profilePic);

      })
      .catch(error => {
        console.log("error while uploading image ", error);
      })
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className="user-profile">
        <IconButton
          aria-owns={open ? "simple-popper" : undefined}
          aria-haspopup="true"
          variant="contained"
          onClick={this.handleClick}
          className="user-profile-btn"
        >
          <Tooltip title={
          <div>
            <div>
              <span  style={{fontSize:"14px"}}>BridgeLabz Account</span>
            </div>
            <div style={{fontSize:"12px"}}>
            <label>{localStorage.getItem('firstName')} {localStorage.getItem('lastName')}</label>
            </div>
            <div style={{fontSize:"12px"}}>
             {localStorage.getItem('email')}
            </div>
          </div>}>
            <img
              src={this.state.profilePic}
              alt="profile pic"
              style={{ borderRadius: "50%" }}
              className="profile-pic"
            />
          </Tooltip>
        </IconButton>
        <Popover
          id="simple-popper"
          open={open}
          anchorEl={anchorEl}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
        >
          <div className={classes.typography} >
            <div >
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

                <div className="user-information">
                  <label>{localStorage.getItem('firstName')} {localStorage.getItem('lastName')}</label>
                  <label>{localStorage.getItem('email')}</label>
                </div>
              </div>
            </div>

            <div className="profile-bottom">
              <div>
                <Button variant="outlined" disabled><span className="add-account">Add account</span></Button>
              </div>
              <div>
                <Button variant="outlined" onClick={this.handleLogout}><span className="add-account">Sign out</span></Button>
              </div>
            </div>
          </div>
        </Popover>
      </div>
    );
  }
}

UploadProfile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(UploadProfile));
