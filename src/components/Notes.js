import React, { Component } from 'react'
import DisplayCard from './DisplayCard';
import NoteService from '../services/NoteServices';

const NoteServices = new NoteService();
export default class Notes extends Component {
    constructor(props){
        super(props);
        this.state={
            allNotes:[]
        }
    }
    componentDidMount(){
        NoteServices.getTrashNotes()
        .then(res => {
            this.setState({
                allNotes:res.data.data.data
            })
        })
    }

    componentDidUpdate(){
        console.log("Component did update");
        NoteServices.getTrashNotes()
        .then(res => {
            this.setState({
                allNotes:res.data.data.data
            })
        })
    }
    render() {
        return (
            <div>
                <DisplayCard
                allNotes = {this.state.allNotes}
                />
            </div>
        )
    }
}
