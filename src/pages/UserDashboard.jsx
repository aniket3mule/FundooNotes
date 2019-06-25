import React, {Component} from 'react';
import DashboardComponent from '../components/DashboardComponent'
import CreateNote from '../components/CreateNote';
import AllNotes from '../components/GetAllNotes'
import {withRouter} from 'react-router-dom'

 class  UserDashboard extends Component{
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            slidecards:false
        }
        this.noteToCards = React.createRef();
        this.archiveNote = React.createRef();

    }
    slidecard=()=>{
        this.setState({
            slidecards:!this.state.slidecards
        })
    }
    getNewNote=(newCard)=>{
        this.noteToCards.current.displayCard(newCard);
    }
    archiveNote = (noteId)=>{
        this.archiveNote.current.displayArchiveCard(noteId)
    }

 
    render(){

        if(localStorage.getItem('token1') !== "true"){
            return(
                // this.props.history.push('signin')
              window.location.href = 'signin'
            )
          }
          else{
            const slide=this.state.slidecards?"afterslide":"beforeslide";

        return(
            <div>
                <div>
                <DashboardComponent
                slidecard={this.slidecard}
                />
                </div>
                <div className={slide}>
                    <div>
                <CreateNote getNewNote={this.getNewNote}/>
                </div>
                <div className="all-note-div">
                <AllNotes/>
                </div>
                </div>
            </div>
           
        );
          }
    }
}

export default withRouter(UserDashboard);