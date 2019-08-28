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
    
    render() {
        console.log("this.props", this.props);
        
        return (
                <DisplayCard
                allNotes = {this.state.allNotes}
                />
        )
    }
}
