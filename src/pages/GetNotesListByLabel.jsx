import React, { Component } from 'react'
import DashboardComponent from '../components/DashboardComponent';
import GetNotesListByLabelComponent from '../components/GetNotesListByLabelComponent'
export default class GetNotesListByLabel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            slidecard: false,
            isReminder: false,
            isTrash: false,
            isArchive: false,
            isNotes: false,
            searchNote: ''
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

    listGridView = (listGridView) => {
        this.setState({
            listGridView: !listGridView
        })
        console.log("list grid reminder", this.state.listGridView);
    }
    render() {
        console.log("getnote list by label page", this.props.location.state);
        
        const slide = this.state.slidecards ? "afterslide" : "beforeslide";
        return (
            <div>
                <div>
                    <DashboardComponent
                        slidecard={this.slidecard}
                        searchNote={this.searchNote}
                        listGridView={this.listGridView}
                        DashboardToPage={this.DashboardToPage}
                        props ={this.props}
                    />
                </div>
                <div className={slide}>
                        <div  className="create-note-margin container-allnotes">
                            <GetNotesListByLabelComponent
                                 props={this.props}
                                 searchNote={this.state.searchNote}
                                 labelName ={this.props.location.state}
                            />
                        </div>
                </div>
            </div>
        )
    }
}
