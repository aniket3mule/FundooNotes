import React, { Component } from 'react';
import { Drawer } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { Label } from 'reactstrap'
import GetAllLabels from './GetAllLabels';
import CreateLabel from './CreateLabel';
// import LabelService from '../services/LabelServices';
// const LabelServices = new LabelService();
class DrawerMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            status: false,
        }
    }

    handleLabelOpen = ()=>{
        this.setState({open:!this.state.open})
    }

    handleSidebarStatus = ()=>{
        this.setState({status:true});
        this.props.DrawerMenuToDashboard(this.state.status);
    }

    render() {
        return (
            <div>
                
                <Drawer
                    variant="persistent"
                    open={this.props.appBarProps}
                    width={200}
                >
                    <MenuItem onClick={this.handleSidebarStatus}>
                    <img className="update-card-img"
                            src={require('../assets/img/notes.svg')}
                            alt="color picker" />
                    <span className="fundoo-text-sidebar">Notes</span>
                    </MenuItem>

                    <MenuItem onClick={this.handleSidebarStatus}>
                    <img className="update-card-img"
                            src={require('../assets/img/reminder.svg')}
                            alt="reminder" />
                        <span className="fundoo-text-sidebar">Reminders</span>
                    </MenuItem>

                    <div style={{ borderBottom: "1px solid lightgrey", borderTop: "1px solid lightgrey" }}>
                        <div style={{ marginRight: "218px", fontSize: "12px", marginBottom: "10px", marginTop: "10px", fontFamily: "arial" }}>
                            <Label className="fundoo-text-sidebar">Labels</Label>
                        </div>
                        <div>
                            <GetAllLabels
                            sidebarLabel = {true}
                            />
                            <MenuItem
                            onClick={this.handleLabelOpen}
                            >
                    
                            <CreateLabel
                            sidebarLabel = {this.state.open}
                            />
                            </MenuItem>
                        </div>
                    </div>

                    <MenuItem onClick={this.handleSidebarStatus}>
                        <img className="update-card-img"
                            src={require('../assets/img/archived.svg')}
                            alt="color picker" />
                            <span className="fundoo-text-sidebar">Archive</span>
                    </MenuItem>

                    <MenuItem onClick={this.handleSidebarStatus}>
                    <img className="update-card-img"
                    src={require('../assets/img/trash.svg')}
                    alt="trash notes"
                    />
                    <span className="fundoo-text-sidebar">Trash</span>
                    </MenuItem>
                </Drawer>
            </div>
        )
    }
}

export default DrawerMenu;