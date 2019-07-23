import React, { Component } from 'react'
import DashboardComponent from '../components/DashboardComponent';
import NewReminderComponent from '../components/NewReminderComponent';
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

    DashboardToPage = (isReminder, isTrash, isArchive, isNotes) => {
        this.setState({
            isReminder: isReminder,
            isTrash: isTrash,
            isArchive: isArchive,
            isNotes: isNotes
        })
        console.log("dashboard page satte=>", this.state.isArchive, this.state.isTrash, this.state.isReminder, this.state.isNotes);
    }
    render() {
        return (
            <div>
                <div>
                    <DashboardComponent
                        slidecard={this.slidecard}
                        searchNote={this.searchNote}
                        listGridView={this.listGridView}
                        DashboardToPage={this.DashboardToPage}
                    />
                </div>
                <div >
                        <div>
                            {(!this.state.isTrash && !this.state.isArchive) &&
                            <div>
                                <CreateNote getNewNote={this.getNewNote} />
                            </div>
                            }
                <div>
                    <NewReminderComponent
                    searchNote={this.state.searchNote}
                    />
                </div>
            </div>
            </div>
            </div>
        )
    }
}
