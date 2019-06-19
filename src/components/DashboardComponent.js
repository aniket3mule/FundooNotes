import React, { Component } from 'react'
import InputBase from '@material-ui/core/InputBase';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { withRouter } from 'react-router-dom';
import DrawerMenu from './DrawerMenu';
import SearchAppBar from './SearchAppBar'
import { MenuItem, Button, Menu } from '@material-ui/core'
import AccountCircle from '@material-ui/icons/AccountCircle';

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
                top: 2,
                left: 'auto',
            },
            InputRoot: {
                color: 'inherit',
            },
        }
    }
});

class DashboardComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            AnchorEl:null,
            setAnchorEl : null,
            mobileMoreAnchorEl : null,
            setMobileMoreAnchorEl : null
            
        }
        
    }

    handleToggle = () => {
        this.setState({ open: !this.state.open });
    }
    handleClick = (event) => {
        this.setState({[this.AnchorEl] : event.currentTarget});
    }

    handleClose = () => {
        this.setState({[this.AnchorEl] : null});
    }

    handleProfileMenuOpen = (event) => {
        this.setState({[this.setAnchorEl] : event.currentTarget});
    }

     handleMobileMenuClose = () => {
        this.setState({[this.setMobileMoreAnchorEl] : null});
    }

    handleMenuClose = ()=> {
        this.setState({[this.setAnchorEl] : null});
        this.handleMobileMenuClose();
    }

    handleMobileMenuOpen= (event) =>{
        this.setState({[this.setMobileMoreAnchorEl] : event.currentTarget});
    }

    render() {
        const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={this.anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={this.isMenuOpen}
            onClose={this.handleMenuClose}
        >
            <MenuItem onClick={this.handleMenuClose}>Logout</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={this.mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={this.isMobileMenuOpen}
            onClose={this.handleMobileMenuClose}
        >
            <MenuItem onClick={this.handleProfileMenuOpen}>
                <IconButton
                    aria-label="Account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

        return (
            <div>
                <MuiThemeProvider theme={thm}>
                    <AppBar position="relative" >
                        <Toolbar className="toolBar" >
                            <IconButton color="inherit" aria-label="Open drawer" >
                                <MenuIcon id="menu" onClick={this.handleToggle} />
                            </IconButton>
                            <img className="img" src={require('../assets/img/keep_48dp.png')} alt="keep icon" />
                            <strong>FundooNotes</strong>
                                <div className="input-group input-group-search">
                                    <input type="text" className="form-control inputbase"  placeholder="Search...." />
                                    <div className="input-group-prepend">
                                        {/* <SearchIcon /> */}
                                        <button className="btn fa fa-search search-button" outline color="white"  >
                                        </button>
                                    </div>
                                </div>
                            <div>
                            {/* <IconButton>
                                    <AccountCircle>
                                    </AccountCircle>
                                </IconButton>  */}
                            </div>
                            {renderMobileMenu}
                      {renderMenu}
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

