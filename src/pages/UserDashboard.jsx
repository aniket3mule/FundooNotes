import React, { Component } from 'react';
import DashboardComponent from '../components/DashboardComponent'
import CreateNote from '../components/CreateNote';
import AllNotes from '../components/GetAllNotes'
import { withRouter } from 'react-router-dom'

class UserDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            slidecards: false,
            searchNote: '',
            listGridView: false,
            status: false,
        }
        this.noteToCards = React.createRef();
        this.archiveNote = React.createRef();
        // this.getNewNote = this.getNewNote.bind(this)

    }
    slidecard = () => {
        this.setState({
            slidecards: !this.state.slidecards
        })
    }

    getNewNote = (newNote) => {
        console.log("newnote==>", newNote);

        this.noteToCards.current.displayCard(newNote);
    }
    archiveNote = (noteId) => {
        this.archiveNote.current.displayArchiveCard(noteId)
    }

    searchNote = (value) => {
        this.setState({ searchNote: value })
    }

    listGridView = (listGridView) => {
        this.setState({
            listGridView: !listGridView
        })

        console.log(this.state.listGridView);
    }

    DashboardToPage = (value) => {
        this.setState({ status: value })
    }

    render() {

        if (localStorage.getItem('token1') !== "true") {
            return (
                // this.props.history.push('signin')
                window.location.href = 'signin'
            )
        }
        else {
            const slide = this.state.slidecards ? "afterslide" : "beforeslide";

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
                    <div className={slide}>
                        <div>
                            <div>
                                <CreateNote getNewNote={this.getNewNote} />
                            </div>
                            <div className="all-note-div">
                                <AllNotes
                                    ref={this.noteToCards}
                                    searchNote={this.state.searchNote}
                                    listGridView={this.state.listGridView}
                                />
                            </div>
                        </div>
                    </div>
                </div>

            );
        }
    }
}

export default withRouter(UserDashboard);