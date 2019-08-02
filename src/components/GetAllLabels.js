import React, { Component } from 'react'
import LabelService from '../services/LabelServices';
import { MenuItem, Checkbox, FormControlLabel, InputBase } from '@material-ui/core';
// import Check from '@material-ui/icons/Check'
import Edit from '@material-ui/icons/EditOutlined'
import NoteService from '../services/NoteServices';

const LabelServices = new LabelService();
const NoteServices = new NoteService();
export default class GetAllLabels extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allLabels: [],
            mouseOver: false,
            isChecked: [],
            NoteLabels: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleUserLabel = this.handleUserLabel.bind(this);
    }

    displayCard(newLabel) {
        console.log("display card==>", newLabel);

        this.setState({
            allLabels: [...this.state.allLabels, newLabel]
        })
    }

    async componentDidMount() {
        await this.getAllLabels();
        await this.getNotesLabelDetails();
        await this.compareNoteDetailsWithLabels();
    }

    getAllLabels = async () => {
        await LabelServices.getLabels()
            .then(allLabels => {
                this.setState({ allLabels: allLabels.data.data.details })
                console.log("this data", this.state.allLabels);
            })
            .catch(err => {
                console.log(err);
            })
    }

    getNotesLabelDetails = async () => {
        await NoteServices.getNotesLabelDetails(this.props.noteId)
            .then(response => {
                console.log("note labels==>", response.data);
                this.setState({
                    NoteLabels: response.data
                })
            })
    }

    compareNoteDetailsWithLabels = () => {
        // e.preventDefault();
        let labelDetails = [];
        labelDetails = this.state.allLabels.map(key => {
            return (
                key.label
            )
        })

        let noteLabels = []
        noteLabels = this.state.NoteLabels.map(noteLabels => { return noteLabels.label });

        console.log("note details array", labelDetails, "note labels array", noteLabels);
        var count = 0;
        for (let i = 0; i < labelDetails.length; i++) {
            for (let j = 0; j < noteLabels.length; j++) {
                console.log(labelDetails[i], noteLabels[j]);

                if (labelDetails[i] === noteLabels[j]) {
                    this.setState({
                        isChecked: [...this.state.isChecked, true]
                    })
                    break;
                }
                // else{
                //     break;
                // }
                else {
                    count++;
                    // this.countFalse(count);
                    if (count === noteLabels.length - 1) {
                        this.setState({
                            isChecked: [...this.state.isChecked, false]
                        })
                    }
                }
            }
        }
        console.log("this.ischeched", this.state.isChecked);
    }

    countFalse = (count) => {
        if (count > 1) {
            this.setState({
                isChecked: [...this.state.isChecked, false]
            })
        }
    }

    handleMounseEvent = (labelId) => {
        this.setState({
            mouseOver: !this.state.mouseOver,
            labelId: labelId,
        })
    }

    handleDeleteLabel = (labelId) => {
        this.setState({
            labelId: labelId
        })

        var labelData = {
            'id': labelId,
        }

        LabelServices.deleteNoteLabel(labelData.id)
            .then(() => {
                LabelServices.getLabels()
                    .then(allLabels => {
                        this.setState({ allLabels: allLabels.data.data.details })
                        console.log("this data", this.state.allLabels);
                        this.setState({
                            allLabel: [...this.state.allLabel, this.props.newLabel]
                        })
                    })
                    .catch(err => {
                        console.log(err);
                    })
            })
            .catch(error => {
                console.log(error);
            })
    }

    getNewNote = (newNote) => {
        console.log("newnote==>", newNote);
        this.labelToCards.current.displayCard(newNote);
        // this.props.getNewNote(newNote);
    }

    handleUserLabel(labelName) {
        this.props.props.history.push(`/usernote/${labelName}`,labelName)
    }

    handleChange(e, labelId) {
        let isChecked = e.target.checked;
        let checkedValue = e.target.value
        // do whatever you want with isChecked value
        console.log("checkbox value", isChecked, labelId, this.props.noteId);

        
        if (isChecked) {
            var addData = {
                'noteId': this.props.noteId,
                'labelId': labelId,
                data: {
                    'noteIdList': this.props.noteId,
                    'label': checkedValue
                }
            }
            NoteServices.addLabelToNotes(addData)
                .then(() => {
                    // this.props.getAllLabelsToCreateLabels(isChecked);
                    console.log("updated successfully");

                })
                .catch((err) => {
                    console.log("error in addlabeltonote", err);
                })
        }
        if (!isChecked) {
            var removeData = {
                'noteId': this.props.noteId,
                'labelId': labelId
            }
            NoteServices.removeLabelToNotes(removeData)
                .then(() => {
                    this.props.getAllLabelsToCreateLabels(isChecked);
                })
                .catch((err) => {
                    console.log("error in addlabeltonote", err);
                })
        }
    }

    // mapChecked =  () =>{
    //     var value= []
    //     for (let i = 0; i < this.state.allLabels.length; i++) {
    //         value = this.state.isChecked.map(isChecked => {return isChecked})
    //         console.log("value",value);
            
    //         if( i > 0){
    //             return value.splice(i,1)
    //         } else{
    //             return value 
    //         }
    //     }
           
        
    // }


    render() {
        // console.log("map",this.mapChecked());
        
        // console.log(this.state.isChecked.length);
        // console.log("getall labels render() ", this.props.noteId);
        // console.log("this.ischeched", this.state.isChecked);
        const labels = this.state.allLabels.map((key) => {
            return (
                this.props.sidebarLabel ?
                    <MenuItem key={key.id} onClick={() => this.handleUserLabel(key.label)}>
                        <img className="update-card-img"
                            src={require('../assets/img/label.svg')}
                            alt="label"
                        />
                        <span className="fundoo-text-sidebar">{key.label}</span>
                    </MenuItem>
                    :
                    this.props.editLabels ?
                        <div className="edit-label-dialog" key={key.id}>
                            {!this.state.mouseOver ?
                                <div className="edit_label_gray">
                                    <img className="update-card-img"
                                        src={require('../assets/img/edit_label_gray.png')}
                                        alt="label"
                                        onMouseOver={() => this.handleMounseEvent(key.id)}
                                    />
                                </div>
                                :
                                (this.state.labelId === key.id) ?
                                    <div className="delete_label_gray" key={key.id}>
                                        <img className="update-card-img"
                                            src={require('../assets/img/delete_grey.png')}
                                            alt="label"
                                            onMouseLeave={this.handleMounseEvent}
                                            onClick={() => this.handleDeleteLabel(key.id)}
                                        />
                                    </div>
                                    :
                                    <div className="edit_label_gray">
                                        <img className="update-card-img"
                                            src={require('../assets/img/edit_label_gray.png')}
                                            alt="label"
                                            onMouseOver={() => this.handleMounseEvent(key.id)}
                                        />
                                    </div>
                            }
                            <div style={{ display: "flex" }}>
                                <InputBase
                                    placeholder="create new label"
                                    name="label"
                                    value={key.label}
                                    onClick={() => this.handleCloseEdit(key.id)}
                                    readOnly
                                />
                                <Edit
                                    onClick={() => this.handleCloseEdit(key.id)}
                                />
                                {/* <Check
                                onClick={this.addLabel}
                                /> */}
                            </div>
                        </div>
                        :
                        this.props.createLabelNoteCreate &&
                        // this.state.isChecked.length === this.state.allLabels.length &&
//                         this.state.isChecked.map(checkedCheckbox => {
//                             console.log(checkedCheckbox);
//                         var i = 0; 
//                             if(this.state.allLabels.length > i){
// i++;
//                         console.log(i);

                            // this.state.allLabels.length > isChecked
                            // return (
                                <div key={key.id} style={{ marginLeft: "5%" }}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                onChange={(e) => this.handleChange(e, key.id)}
                                                value={key.label}
                                                color="primary"
                                                style={{ padding: "0" }}
                                                size="small"
                                                // {this.state.isChecked.map(checked => {}) }
                                                // checked={}
                                            />
                                        }
                                        label={key.label}
                                    />
                                </div>
                            // )
                        //     }
                        // })

           )
        })
        return (
            <div>
                {labels}
            </div>
        )
    }
}
