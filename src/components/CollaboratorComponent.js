import React, { Component } from 'react'
import { Tooltip, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';

class CollaboratorComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            closeEdit:false,
        }
        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClose = this.handleClose.bind(this);
    }

    closePopper() {
        this.setState({
            open: false,
        })
    }

    handleClickOpen() {
        this.setState({
            open: true,
        })
    }

    handleClose() {
        this.setState({
            open: false,
        })
    }

    handleCloseEdit = () =>{
        this.setState({
            closeEdit : !this.state.closeEdit
        })
    }

    render() {
        return (
            <div>
                <div onClick={this.handleClickOpen} style={{ cursor: 'pointer' }}>
                <Tooltip title="Collaborator">
                    <img
                        src={require('../assets/img/colaborator.svg')}
                        alt="Collaborator"
                    />
                </Tooltip>
                </div>
                
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="responsive-dialog-title"
                >
                    <div style={{minHeight:"300px", minWidth:"550px"}}>
                    <DialogTitle id="responsive-dialog-title">
                        Collaborator
                    </DialogTitle>
                    <DialogContent
                    style={{minHeight:"200px", minWidth:"250px"}}
                    >
                        <div className="create-label-div">
                        </div>
                    </DialogContent>
                    <DialogActions >
                        <span>Close</span>
                    </DialogActions>
                    </div>
                </Dialog>
            </div>
        )
    }
}

export default CollaboratorComponent;