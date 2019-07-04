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
import {Tooltip} from '@material-ui/core'

const thm = createMuiTheme({
    overrides: {
        MuiDrawer: {
            paperAnchorLeft: {
                top: 65,
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
            view: false,
            popoverOpen: false,
            listgrid:false,
            searchNote:'',
        }
    }

    handleToggle = () => {
        this.props.slidecard();
        this.setState({ open: !this.state.open });
    }

    handlePopover = () => {
        this.setState({ popoverOpen: !this.state.popoverOpen });
    }

    handleLogout = () =>{
        localStorage.clear();
        this.props.history.push('/signin');
    }

    handleChange =(e) =>{
        this.setState({[e.target.name] : e.target.value});
        this.props.searchNote(e.target.value);
    }

    handleToggleView = (e) => {
        this.setState({ view: !this.state.view });
        this.props.listGridView(this.state.view)
        console.log(this.state.view);
        
    }
    
    render() {
        return (
            <div>
                <MuiThemeProvider theme={thm}>
                    <AppBar position="fixed" >
                        <Toolbar className="toolBar" >
                            <IconButton color="inherit" 
                            aria-label="Open drawer"
                            onClick={this.handleToggle} >
                                <MenuIcon id="menu"  />
                            </IconButton>
                           <div>
                            <img className="img"
                            src={require('../assets/img/keep_48dp.png')}
                            alt="keep icon"
                            />
                            </div>
                           
                            <span className="fundoo-text">FundooNotes</span>
                            <div className="input-group input-group-search">
                                <div className="input-group-prepend">
                                    {/* <SearchIcon /> */}
                                    <button className="btn fa fa-search search-button" outline ="true" color="white" />
                                </div>
                                <input 
                                type="text" 
                                className=" input" 
                                placeholder="Search...." 
                                value = {this.state.searchValue}
                                onChange={this.handleChange}/>
                            </div>
                            {!this.state.view ?
                             <Tooltip title="List view">
                            <div onClick={this.handleToggleView}>
                            <img className="img"
                            src={require('../assets/img/list_view.svg')}
                            alt="list icon"
                            />
                            
                            </div>
                            </Tooltip> :
                             <Tooltip title="Grid view">
                            <div onClick={this.handleToggleView}>
                            <img className="img"
                            src={require('../assets/img/grid_view.svg')}
                            alt="list icon"
                            />
                            </div> 
                            </Tooltip>
                            }
                            <div>
                                {/* <IconButton id="Popover1"> */}
                                    <AccountCircle id="Popover1">
                                    </AccountCircle>
                                {/* </IconButton> */}
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

