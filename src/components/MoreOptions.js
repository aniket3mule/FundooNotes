import React, { Component } from 'react';
import { Tooltip, Card, ClickAwayListener } from '@material-ui/core';

class MoreOptions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            isDeleted:false
        }
        this.handleToggle = this.handleToggle.bind(this);
        this.handleDeleteNote = this.handleDeleteNote.bind(this);
    }
   
    closePopper() {
        this.setState({
            open: false
        })
    }
   
    handleToggle() {
        this.setState({ open: !this.state.open });
        //this.props.handleToggle(!this.state.open)
    }

    handleDeleteNote(){
        this.props.toolsPropsToMoreOptions(this.props.noteID);
    }
    render() {

        return (
            <div className="remind-me-icon">
                <Tooltip title="More">
                    <img src={require('../assets/img/more_options.svg')}
                        className="img"
                        alt="remind me"
                        onClick={this.handleToggle}
                    />
                </Tooltip>
                <div>
                    {this.state.open ?
                        <ClickAwayListener onClickAway={() => this.closePopper()}>
                            <Card className="remind-me">
                                <div >
                                    <div className="remind-day" onClick={this.handleDeleteNote}>
                                        <div>
                                            Delete Note
                                       </div>
                                    </div>
                                   
                                    <div className="remind-day" onClick={this.handleAddLabel}>
                                        <div>
                                            Add label
                                       </div>
                                    </div>
                                </div>
                            </Card>
                        </ClickAwayListener>

                        : null}
                </div>
            </div>

        )
    }
}
export default MoreOptions;
