import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import DrawerMenu from './DrawerMenu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import {Popover, PopoverBody } from 'reactstrap'

const thm = createMuiTheme({
    overrides: {
        MuiDrawer: {
            paperAnchorLeft: {
                top: 70,
                width: 240,
                background: 'white'
            },
            paperAnchorDockedLeft: {
                borderColor: "white"
            },
        },
        MuiAppBar: {
            colorPrimary: {
                color: 'black',
                backgroundColor: 'whitesmoke'
            },
            root: {
                 left: 'auto',
            }
        }
    }
});

class DashboardComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            popoverOpen: false
        }
    }

    handleToggle = () => {
        this.setState({ open: !this.state.open });
    }

    handlePopover = () => {
        this.setState({ popoverOpen: !this.state.popoverOpen });
    }

    handleLogout = () =>{
        localStorage.clear();
        this.props.history.push('/signin');
    }
    
    render() {
        return (
            <div>
                <MuiThemeProvider theme={thm}>
                    <AppBar position="relative" >
                        <Toolbar className="toolBar" >
                            <IconButton color="inherit" 
                            aria-label="Open drawer"
                            onClick={this.handleToggle} >
                                <MenuIcon id="menu"  />
                            </IconButton>
                           
                            <img className="img"
                            src={require('../assets/img/keep_48dp.png')}
                            alt="keep icon"
                            />
                           
                            <span className="fundoo-text">FundooNotes</span>
                            <div className="input-group input-group-search">
                                <div className="input-group-prepend">
                                    {/* <SearchIcon /> */}
                                    <button className="btn fa fa-search search-button" outline ="true" color="white" />
                                </div>
                                <input type="text" className=" input" placeholder="Search...." />
                            </div>
                           
                            <div>
                                <IconButton id="Popover1">
                                    <AccountCircle>
                                    </AccountCircle>
                                </IconButton>

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
                        </Toolbar>
                        <DrawerMenu
                            appBarProps={this.state.open}
                        />
                    </AppBar>
                </MuiThemeProvider>
            </div>
        )
    }
}
export default withRouter(DashboardComponent);

