import React, { Component } from 'react'
import { Tooltip } from '@material-ui/core';
import NoteService from '../services/NoteServices';
const NoteServices = new NoteService();
class AddImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addImage: '',
        }
    }
    handleAddImage = (e) => {
        console.log("add image", e.target.files[0]);
        const formData = new FormData()

        var data ={
            'noteId': this.props.noteId,
            'file' : e.target.files[0]
        }
        formData.append('noteId', this.props.noteId)
        formData.append('file', e.target.files[0])
        this.props.AddImageToCreateNote(e.target.files[0])
        console.log("formdata ",data);
        
        NoteServices.updateNote(data)
        .then(res => {
            console.log("image upload then",res);
        })
        .catch(err => {
            console.log("image upload catch",err);
        })
    }
    render() {
        return (
            <div>
                <input
                    accept="image/*"
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={this.handleAddImage}
                    style={{ display: "none" }}
                />
                <label htmlFor="contained-button-file">
                    <Tooltip title="Add image">
                        <img className="img"
                            src={require('../assets/img/add_image.svg')}
                            alt="color picker"
                            htmlFor="contained-button-file"
                        />
                    </Tooltip>
                </label>
            </div>
        )
    }
}

export default AddImage