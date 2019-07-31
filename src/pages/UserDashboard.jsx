import React, { Component } from 'react';
import DashboardComponent from '../components/DashboardComponent'
import CreateNote from '../components/CreateNote';
import AllNotes from '../components/GetAllNotes'
// import { withRouter } from 'react-router-dom'

class UserDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            slidecards: false,
            searchNote: '',
            listGridView: false,
            isReminder: false,
            isTrash: false,
            isArchive: false,
            isNotes: true,
        }
        this.noteToCards = React.createRef();
        this.archiveNote = React.createRef();
        // this.labelToCards = React.createRef();
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

    DashboardToPage = (isReminder, isTrash, isArchive, isNotes) => {
        this.setState({
            isReminder: isReminder, 
            isTrash: isTrash,
            isArchive: isArchive,
            isNotes: isNotes
         })
         console.log("dashboard page satte=>", this.state.isArchive , this.state.isTrash, this.state.isReminder, this.state.isNotes);
    }
    // GetAllLabelToDrawerMenu = (newLabel) => {
    //     console.log("newnote==>", newLabel);
    //     this.labelToCards.current.displayCard(newLabel);
    // }

    render() {
        if (localStorage.getItem('token1') !== "true") {
            return (
                
                <div>
                    {this.props.history.push('/signin')}
                </div>
            )
        }
        else {
            const slide = this.state.slidecards ? "afterslide" : "beforeslide";
            const listView = this.state.listGridView ? "list-view-allNotes":"allDemo" 
            return (
                <div>
                    <div>
                        <DashboardComponent
                            slidecard={this.slidecard}
                            searchNote={this.searchNote}
                            listGridView={this.listGridView}
                            DashboardToPage={this.DashboardToPage}
                            props={this.props}
                            
                        />
                    </div>
                    <div className={slide}>
                        <div className="create-note-margin">
                            {(!this.state.isTrash && !this.state.isArchive) &&
                            <div>
                                <CreateNote getNewNote={this.getNewNote} />
                            </div>
                            }
                            <div className={listView}>
                                <AllNotes
                                    wrappedComponentRef={this.noteToCards}
                                    searchNote={this.state.searchNote}
                                    listGridView={this.state.listGridView}
                                    isReminder ={this.state.isReminder}
                                    isArchive = {this.state.isArchive}
                                    isTrash = {this.state.isTrash}
                                    isNotes = {this.state.isNotes}
                                    props={this.props}
                                />
                            </div>
                            {/* <div>
                                <GetAllLabels
                                GetAllLabelToDrawerMenu={this.GetAllLabelToDrawerMenu}
                                >

                                </GetAllLabels>
                            </div> */}
                        </div>
                    </div>
                </div>

            );
        }
    }
}

export default UserDashboard;