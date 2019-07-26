import React, { Component } from 'react';
import { Tooltip, Card } from '@material-ui/core';
import CreateLabel from './CreateLabel';
// import EditorQnAComponent from './EditorQnAComponent'
import { withRouter } from 'react-router-dom';

class MoreOptions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            isDeleted: false,
            addLabel: false,
            label: '',
            askQuestion: false
        }
        this.handleToggle = this.handleToggle.bind(this);
        this.handleDeleteNote = this.handleDeleteNote.bind(this);
        this.handleAddLabel = this.handleAddLabel.bind(this);
        this.handleAskQuestion = this.handleAskQuestion.bind(this);
        this.handleClose = this.handleClose.bind(this);


    }

    closePopper() {
        this.setState({
            open: false,
            addLabel: false
        })
    }

    handleToggle() {
        this.setState({
            open: !this.state.open,
            addLabel: false
        });
        //this.props.handleToggle(!this.state.open)
    }

    handleDeleteNote() {
        this.props.toolsPropsToMoreOptions(this.props.noteID);
    }

    handleRestore = () => {
        this.props.moreOptionsToTrashNotes(this.props.noteID);
    }

    handleAddLabel() {
        this.setState({ addLabel: !this.state.addLabel });
    }

    handleAskQuestion(e) {
        // this.setState({ askQuestion: true });
        e.preventDefault();
        this.props.history.push("/questionanswer", this.props.noteID)
    }


    handleClose(value) {
        this.setState({
            askQuestion: value
        })
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
                <div >
                    {this.state.open ?
                        // <ClickAwayListener onClickAway={() => this.closePopper()}>
                        <Card className="more-options">
                            {
                                this.state.addLabel ?
                                    <CreateLabel
                                        addLabelToMoreOptions={this.addLabelToMoreOptions}
                                        addLabelOpen={this.state.addLabel}
                                        style={{ width: "100%" }}
                                        noteID = {this.props.noteID}
                                    />
                                    :
                                    <div style = {{width: "100px"}}>
                                        {
                                            this.props.noteID === ''
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
                                        {this.props.isTrashed === true ?
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
                                        }{
                                            this.props.isTrashed === true ?
                                                null
                                                :
                                                <div>
                                                    <div className="remind-day" onClick={this.handleAskQuestion}>
                                                        <div>
                                                            Ask Question
                                                            </div>
                                                    </div>
                                                </div>
                                        }
                                    </div>
                            }
                        </Card>
                        : null
                    }
                </div>
            </div>
        )
    }
}
export default withRouter(MoreOptions);
