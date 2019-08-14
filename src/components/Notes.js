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
    componentDidMount() {
        //Print All notes
        this.getAllNotes();
    }

    getAllNotes = async () => {
        await NoteServices.getAllNotes()
            .then(allNotes => {
                var allNotesArray =[];
                for (let i = allNotes.data.data.data.length-1; i >=0 ; i--) {
                    allNotesArray.push(allNotes.data.data.data[i])
                }
                this.setState({ allNotes: allNotesArray})
                // console.log("this data", this.state.allNotes);
            })
            .catch(err => {
                console.log(err);
            })
    }

    getAllReminderNotes = async () => {
        await NoteServices.getAllNotes()
            .then(allNotes => {
                var allNotesArray =[];
                for (let i = allNotes.data.data.data.length-1; i >=0 ; i--) {
                    allNotesArray.push(allNotes.data.data.data[i])
                }
                this.setState({ allNotes: allNotesArray})
                // console.log("this data", this.state.allNotes);
            })
            .catch(err => {
                console.log(err);
            })
    }

    getAllArchiveNotes = async () => {
        await NoteServices.getAllNotes()
            .then(allNotes => {
                var allNotesArray =[];
                for (let i = allNotes.data.data.data.length-1; i >=0 ; i--) {
                    allNotesArray.push(allNotes.data.data.data[i])
                }
                this.setState({ allNotes: allNotesArray})
                // console.log("this data", this.state.allNotes);
            })
            .catch(err => {
                console.log(err);
            })
    }

    getAllTrashNotes = async () => {
        await NoteServices.getAllNotes()
            .then(allNotes => {
                var allNotesArray =[];
                for (let i = allNotes.data.data.data.length-1; i >=0 ; i--) {
                    allNotesArray.push(allNotes.data.data.data[i])
                }
                this.setState({ allNotes: allNotesArray})
                // console.log("this data", this.state.allNotes);
            })
            .catch(err => {
                console.log(err);
            })
    }
    
    render() {
        return (
                <DisplayCard
                allNotes = {this.state.allNotes}
                />
        )
    }
}
