import React, { Component } from 'react'
import DashboardComponent from '../components/DashboardComponent';
import ReminderComponent from '../components/ReminderComponent';
import CreateNote from '../components/CreateNote';

export default class NewReminder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            slidecard: false,
            isReminder: false,
            isTrash: false,
            isArchive: false,
            isNotes: false,
            searchNote:''
        }
    }
    slidecard = () => {
        this.setState({
            slidecards: !this.state.slidecards
        })
    }

    searchNote = (value) => {
        this.setState({ searchNote: value })
    }

    listGridView = (listGridView) => {
        this.setState({
            listGridView: !listGridView
        })
        console.log("list grid reminder",this.state.listGridView);
    }
    render() {
        const slide = this.state.slidecards ? "afterslide" : "beforeslide";
        return (
            <div>
                <div>
                    <DashboardComponent
                        slidecard={this.slidecard}
                        searchNote={this.searchNote}
                        listGridView={this.listGridView}
                        props ={this.props}
                        isReminder = {true}
                    />
                </div>
                <div className={slide}>
                        <div  className="create-note-margin">
                            {(!this.state.isTrash && !this.state.isArchive) &&
                            <div>
                                <CreateNote getNewNote={this.getNewNote} />
                            </div>
                            }
                <div className="container-allnotes">
                    <ReminderComponent
                    searchNote={this.state.searchNote}
                    listGridView={this.state.listGridView}
                    />
                </div>
            </div>
            </div>
            </div>
        )
    }
}
