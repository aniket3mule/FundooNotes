import React, { Component } from 'react'
import DashboardComponent from '../components/DashboardComponent'
import EditorQnAComponent from '../components/EditorQnAComponent'

export default class QnAEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slidecards: false,
        }
    }

    slidecard = () => {
        this.setState({
            slidecards: !this.state.slidecards
        })
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

    render() {
        console.log("this.props", this.props);
        
        if (localStorage.getItem('token1') !== "true") {
            return (
                // this.props.history.push('signin')
                window.location.href = 'signin'
            )
        }
        else {
            return (
                <div>
                    <DashboardComponent
                        QnAEditor={true}
                        slidecard={this.slidecard}
                        searchNote={this.searchNote}
                        listGridView={this.listGridView}
                        DashboardToPage={this.DashboardToPage}
                        props={this.props}
                    />
                    <EditorQnAComponent
                    noteId ={this.props.location.state}
                    props={this.props}
                    />
                </div>
            )
        }
    }
}
