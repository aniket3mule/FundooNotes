import React, { Component } from 'react'
import MenuItem from '@material-ui/core/MenuItem'
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Popover, PopoverBody } from 'reactstrap'
import IconButton from '@material-ui/core/IconButton';
import { withRouter } from 'react-router-dom';

class UploadImage extends Component {
    constructor(props){
        super(props);
        this.state = {
            popoverOpen: false,
        }
    }

    componentDidMount() {
        if (localStorage.getItem("profilePic") !== 'undefined') {
            this.setState({
                profilePic: localStorage.getItem("profilePic")
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

    render() {
        return (
            <div>
            <div className="user-profile">
           
                <div id="Popover1">
                <IconButton >
                <img 
                src="http://34.213.106.173/images/1562587189446blob"
                alt="profile pic"
                style={{borderRadius:"50%"}}
                className="profile-pic"
                />
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
                    <PopoverBody>
                        <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
                    </PopoverBody>
                </Popover>
            </div>
            </div>
        )
    }
}


export default withRouter(UploadImage);

