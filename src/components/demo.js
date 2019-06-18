import React, { Component } from 'react'
import InputBase from '@material-ui/core/InputBase';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { MuiThemeProvider, createMuiTheme} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import {withRouter} from 'react-router-dom';
import DrawerMenu from './drawer';
import AccountMenu from './appBar'

const thm = createMuiTheme({
overrides: {
MuiDrawer: {
paperAnchorLeft: {
top: 80,
width: 280,
background: 'white'
},
paperAnchorDockedLeft: {
borderColor: "white"
},
},
MuiAppBar: {
colorPrimary: {
color:'black',
backgroundColor: 'lightgray'
},
root: {
top: 2,
left: 'auto',
},
InputRoot: {
color: 'inherit',
},
}}});


class DashboardComponent extends Component{

constructor(props){
super(props);
this.state={
open:false
}
}


handleToggle=()=>{
this.setState({ open: !this.state.open });
}
render(){
return (
<MuiThemeProvider theme={thm}>

<div>

<AppBar position="static" >
<Toolbar className="toolBar" ><img className="img" src={require('../assets/images/keep-512.png')} alt="keep icon" /><b>FundooNotes</b>
<IconButton color="inherit" aria-label="Open drawer" >
<MenuIcon id="menu" onClick={this.handleToggle} />
</IconButton>
<div className="iconAdjust">
<div className="searchIcon">
<InputBase className="srch"
placeholder="Search…"
/>
<div className="search">
<IconButton><SearchIcon > </SearchIcon></IconButton>
</div>
</div>
</div>
<AccountMenu PopperProps={this.state.open}></AccountMenu>
</Toolbar>
<DrawerMenu
appBarProps={this.state.open}
/>
</AppBar>
</div>
</MuiThemeProvider>

)
}
}
export default withRouter(DashboardComponent);
import React, { Component } from 'react';
import { Drawer } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';


class DrawerMenu extends Component {

constructor() {
super();

this.state = {
open: false,
}
}
render() {
return (
<div>
<Drawer
variant="persistent"
open={this.props.appBarProps}
width={250}
>
<MenuItem id="noteMenu" >
<img src={require('../assets/images/note.svg')} alt="note icon"
style={{ marginRight: "50px" }} />
NOTES
</MenuItem>

<MenuItem id="reminderMenu" >
<img src={require('../assets/images/menuReminder.svg')} alt="reminder icon"
style={{ marginRight: "50px" }} />
REMAINDERS
</MenuItem>

<div style={{ borderBottom: "1px solid lightgrey", borderTop: "1px solid lightgrey" }}>
<div style={{ marginRight: "218px", fontSize: "13px", marginBottom: "10px", marginTop: "10px", fontFamily: "arial" }}>
LABELS
</div>

<div>
<MenuItem>

<img src={require('../assets/images/menuEdit.svg')} alt="edit icon"
style={{ marginRight: "50px" }} />
EDIT LABELS
</MenuItem>
</div>

</div>

<MenuItem id="archiveMenu" >
<img src={require('../assets/images/menuArchive.svg')} alt="archive icon"
style={{ marginRight: "50px" }} />
ARCHIVE
</MenuItem>

<MenuItem id="trashIcon" >
<img src={require('../assets/images/menuTrash.svg')} alt="trash icon"
style={{ marginRight: "50px" }} />
TRASH
</MenuItem>

</Drawer>

</div>
)
}
}

export default DrawerMenu;
import React, { Component } from 'react';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Paper from '@material-ui/core/Paper';
import {MenuItem,IconButton} from '@material-ui/core'
import Popper from '@material-ui/core/Popper';
// import{anchorEl, setAnchorEl} from '@material-ui/core';



class AccountMenu extends Component {

constructor() {
super();

this.state = {
open: false,
}

}
render() {
return (
<div>
<Popper
variant="contained"
open={this.props.PopperProps}
width={100}>
<IconButton
aria-controls="menu-list-grow"
aria-haspopup="true"
>
<Paper> <AccountCircle>
<MenuItem>
<MenuItem>
Logout
</MenuItem>
</MenuItem>
</AccountCircle> </Paper>
</IconButton>
</Popper>
</div>
)
}
}