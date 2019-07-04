import React, { Component } from 'react';
import { Tooltip, Card, ClickAwayListener, Input } from '@material-ui/core';
import LabelService from '../services/LabelServices';

const LabelServices = new LabelService();

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
        this.handleChange = this.handleChange.bind(this)

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

    handleAddLabel(){
        this.setState({ addLabel: !this.state.addLabel });
    }

    handleChange= (e) =>{
        this.setState({label: e.target.value})
        console.log("label state more option",this.state.label);
    }
    addLabel = ()=>{
        const userId = localStorage.getItem('userid')
        var label = {
            'label': this.state.label,
            'isDeleted': false,
            'userId': userId,
        }

        LabelServices.addLabels(label)
        .then(response => {
            console.log("new label ", response);
            
        })


        this.props.addLabelToCreateNote(this.state.label)
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
                    {
                        this.state.open ?
                        <ClickAwayListener onClickAway={() => this.closePopper()}>
                            <Card className="remind-me">
                                {
                                    this.state.addLabel ?
                                <div>
                                    <div className="remind-heading">
                                        Label note:
                                    </div>
                                    <div onClick={this.handleRemindToday}>
                                        <div>
                                            <Input
                                            placeholder="Enter Label name" 
                                            name="label"
                                            value={this.state.label}
                                            color="black"
                                            style={{height:'70%', width:'100%'}}
                                            onChange={this.handleChange}
                                            />
                                       </div>
                                       <div>
                                       </div>
                                       <div onClick={this.addLabel} style={{cursor:'pointer'}}>
                                           <img
                                           src={require('../assets/img/add_label.svg')}
                                           alt="add label"
                                           className="img"
                                           />
                                           <span>Create</span>
                                           <label>"{this.state.label}"</label>
                                       </div>
                                    </div>
                                </div>
                                :
                                
                                <div>
                                    {
                                        this.props.noteID ==='' 
                                    ?
                                    null 
                                    :
                                    <div className="remind-day" onClick={this.handleDeleteNote}>
                                        <div>
                                            Delete Note
                                       </div>
                                    </div>
                                   }
                                    <div className="remind-day" onClick={this.handleAddLabel}>
                                        <div>
                                            Add label
                                       </div>
                                    </div>
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
