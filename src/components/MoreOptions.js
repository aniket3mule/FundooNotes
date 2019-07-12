import React, { Component } from 'react';
import { Tooltip, Card, ClickAwayListener } from '@material-ui/core';
import CreateLabel from './CreateLabel';


class MoreOptions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            isDeleted:false,
            addLabel:false,
            label:'',
        }
        this.handleToggle = this.handleToggle.bind(this);
        this.handleDeleteNote = this.handleDeleteNote.bind(this);
        this.handleAddLabel = this.handleAddLabel.bind(this);

    }
   
    closePopper() {
        this.setState({
            open: false,
            addLabel:false
        })
    }
   
    handleToggle() {
        this.setState({ open: !this.state.open,
            addLabel:false});
        //this.props.handleToggle(!this.state.open)
    }

    handleDeleteNote(){
        this.props.toolsPropsToMoreOptions(this.props.noteID);
    }

    handleRestore = () => {
        this.props.restoreProps(this.props.noteID, false, this.props.noteTitle, this.props.noteDescription);
    }

    handleAddLabel(){
        this.setState({ addLabel: !this.state.addLabel });
    }
   
    render() {

        console.log("More Options",this.props.isTrashed);
        
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
                    {
                        this.state.open ?
                        <ClickAwayListener onClickAway={() => this.closePopper()}>
                            <Card className="remind-me">
                                {
                                    this.state.addLabel ?
                               
                                <CreateLabel
                                addLabelToMoreOptions = {this.addLabelToMoreOptions}
                                addLabelOpen = {this.state.addLabel}
                                style={{width:"100%"}}
                                />
                                :
                                <div>
                                    {
                                        this.props.noteID ==='' 
                                    ?
                                    null 
                                    :
                                    this.props.isTrashed === true ?
                                    <div className="remind-day" onClick={this.handleDeleteNote}>
                                        <div>
                                            Delete Forever
                                       </div>
                                    </div>
                                    :
                                    <div className="remind-day" onClick={this.handleDeleteNote}>
                                        <div>
                                            Delete Note
                                       </div>
                                    </div>
                                   }
                                   { this.props.isTrashed === true ?
                                    <div className="remind-day" onClick={this.handleRestore}>
                                        <div>
                                            Restore
                                       </div>
                                    </div>
                                    :
                                    <div className="remind-day" onClick={this.handleAddLabel}>
                                        <div>
                                            Add label
                                       </div>
                                    </div>
                                }
                                </div>
                                }
                            </Card>
                        </ClickAwayListener>
                        : null}
                </div>
            </div>

        )
    }
}
export default MoreOptions;
