import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { MuiThemeProvider, createMuiTheme, } from '@material-ui/core';
import DrawerMenu from './DrawerMenu';
import { Tooltip } from '@material-ui/core'
import UserProfile from './UserProfile';

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
            listgrid: false,
            searchNote: '',
            allLabels: [],
            isReminder: false,
            isTrash: false,
            isArchive: false,
            isNotes: true,
        }
    }

    handleToggle = () => {
        this.props.slidecard();
        this.setState({ open: !this.state.open });
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        this.props.searchNote(e.target.value);
    }

    handleToggleView = (e) => {
        this.setState({ view: !this.state.view });
        this.props.listGridView(this.state.view)
    }

    DrawerMenuToDashboard = (isReminder, isTrash, isArchive, isNotes) => {
        this.setState({
            isReminder: isReminder,
            isTrash: isTrash,
            isArchive: isArchive,
            isNotes: isNotes
        })
        this.props.DashboardToPage(isReminder, isTrash, isArchive, isNotes);
    }


    render() {
        return (
            <div>
                <MuiThemeProvider theme={thm}>
                    <AppBar position="fixed" >
                        <Toolbar className="toolBar" >
                            <Tooltip title="Main menu">
                                <IconButton color="inherit"
                                    aria-label="Open drawer"
                                    onClick={this.handleToggle} >
                                    <MenuIcon id="menu" />
                                </IconButton>
                            </Tooltip>

                            <div style={{ width: "10%" }}>
                                {this.state.isNotes === true ?
                                    <div className="note-text-img">
                                        <img className="fundoo-note-img"
                                            src={require('../assets/img/keep_48dp.png')}
                                            alt="keep icon"
                                        />
                                        <div style={{ margin: "5%" }}>
                                            <span className="fundoo-text">Fundoo</span>
                                        </div>
                                    </div>

                                    :
                                    null
                                        ||
                                        this.state.isReminder === true ?
                                        <span className="fundoo-text">Reminders</span>
                                        :
                                        null
                                            ||
                                            this.state.isArchive === true ?
                                            <span className="fundoo-text">Archive</span>
                                            :
                                            null
                                                ||
                                                this.state.isTrash === true ?
                                                <span className="fundoo-text">Trash</span>
                                                :
                                                null
                                }
                            </div>
                            <div className="view-search-input">
                                <div className="input-group input-search">
                                    <div className="input-group-prepend">
                                        <button className="btn fa fa-search search-button" outline="true" color="white" />
                                    </div>
                                    <input
                                        type="text"
                                        className=" input"
                                        placeholder="Search...."
                                        value={this.state.searchValue}
                                        onChange={this.handleChange} />
                                </div>
                                {!this.props.QnAEditor ?

                                    !this.state.view ?
                                    <Tooltip title="List view">
                                        <div onClick={this.handleToggleView}
                                            className="list-view-div">
                                            <img className="img"
                                                src={require('../assets/img/list_view.svg')}
                                                alt="list icon"
                                            />
                                        </div>
                                    </Tooltip> :
                                    <Tooltip title="Grid view">
                                        <div onClick={this.handleToggleView}
                                            className="list-view-div">
                                            <img className="img"
                                                src={require('../assets/img/grid_view.svg')}
                                                alt="list icon"
                                            />
                                        </div>
                                    </Tooltip>
                                    :
                                    null
                                }

                            </div>

                            <UserProfile />
                        </Toolbar>
                        <DrawerMenu
                            appBarProps={this.state.open}
                            DrawerMenuToDashboard={this.DrawerMenuToDashboard}
                        />
                    </AppBar>
                </MuiThemeProvider>
            </div>
        )
    }
}
export default DashboardComponent;

