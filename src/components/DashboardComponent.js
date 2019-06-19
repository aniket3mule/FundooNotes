import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import DrawerMenu from './DrawerMenu';
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
        }
    }

    handleToggle = () => {
        this.setState({ open: !this.state.open });
    }
    render() {
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
                            <IconButton>
                                    <AccountCircle>
                                    </AccountCircle>
                                </IconButton> 
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

