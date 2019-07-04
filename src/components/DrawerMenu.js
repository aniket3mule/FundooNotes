import React, { Component } from 'react';
import { Drawer } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { Label } from 'reactstrap'

class DrawerMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
        }
    }

    // getAllNotes = () => {

    // }
    render() {
        return (
            <div>
                <Drawer
                    variant="persistent"
                    open={this.props.appBarProps}
                    width={200}
                >
                    <MenuItem onClick={this.getAllNotes}>
                        <i className="fa fa-sticky-note-o fa-fw fa-lg" aria-hidden="true"></i>
                        <span className="fundoo-text"> NOTES</span>
                    </MenuItem>

                    <MenuItem >
                        <i className="fa fa-bell-o fa-fw fa-lg" aria-hidden="true"></i>
                        <span className="fundoo-text">REMINDERS</span>
                    </MenuItem>

                    <div style={{ borderBottom: "1px solid lightgrey", borderTop: "1px solid lightgrey" }}>
                        <div style={{ marginRight: "218px", fontSize: "12px", marginBottom: "10px", marginTop: "10px", fontFamily: "arial" }}>
                            <Label className="fundoo-text">LABELS</Label>
                        </div>
                        <div>
                            <MenuItem>
                                <i className="fa fa-pencil-square-o fa-fw fa-lg" aria-hidden="true"></i>
                                <span className="fundoo-text">EDIT LABELS</span>
                            </MenuItem>
                        </div>
                    </div>

                    <MenuItem >
                        <img className="update-card-img"
                            src={require('../assets/img/archived.svg')}
                            alt="color picker" />
                            <span className="fundoo-text">ARCHIVE</span>
                    </MenuItem>

                    <MenuItem>
                        <i className="fa fa-trash-o fa-fw fa-lg" aria-hidden="true"></i>
                        <span className="fundoo-text">TRASH</span>
                    </MenuItem>
                </Drawer>
            </div>
        )
    }
}

export default DrawerMenu;