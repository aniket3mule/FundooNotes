import React, { Component } from 'react';
import { Drawer } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';

class DrawerMenu extends Component {

    constructor(props) {
        super(props);
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
                    width={200}
                >
                    <MenuItem id="note-menu" >
                        <i class="fa fa-sticky-note-o fa-fw fa-lg" aria-hidden="true"></i>
                        NOTES
                    </MenuItem>

                    <MenuItem id="reminder-menu" >
                        <i class="fa fa-bell-o fa-fw fa-lg" aria-hidden="true"></i>
                        REMAINDERS
                    </MenuItem>

                    <div style={{ borderBottom: "1px solid lightgrey", borderTop: "1px solid lightgrey" }}>
                        <div style={{ marginRight: "218px", fontSize: "12px", marginBottom: "10px", marginTop: "10px", fontFamily: "arial" }}>
                            LABELS
                    </div>
                        <div>
                            <MenuItem>
                                <i class="fa fa-pencil-square-o fa-fw fa-lg" aria-hidden="true"></i>
                                EDIT LABELS
                            </MenuItem>
                        </div>
                    </div>

                    <MenuItem id="archive-menu" >
                        <i class="fa fa-archive fa-fw fa-lg" aria-hidden="true"></i>
                        ARCHIVE
                    </MenuItem>

                    <MenuItem id="trash-icon" >
                        <i class="fa fa-trash-o fa-fw fa-lg" aria-hidden="true"></i>
                        TRASH
                    </MenuItem>
                </Drawer>
            </div>
        )
    }
}

export default DrawerMenu;