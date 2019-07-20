import { Editor } from 'react-draft-wysiwyg';
import React, { Component } from 'react'
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
// import htmlToDraft from 'draftjs-to-html';
import { Button } from '@material-ui/core';
import QAService from '../services/QuestionAndAnswerServices'
import { withRouter } from 'react-router-dom'
import NoteService from '../services/NoteServices';
import CloseIcon from '@material-ui/icons/Close'


const QASevices = new QAService();
const NoteServices = new NoteService();
class EditorQnAComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
            editorText: '',
            askQuestion: false,
            allNotes: [],
            message: '',
        }

        this.handleAddQuestion = this.handleAddQuestion.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    componentDidMount() {
        this.getAllNotes();
    }

    getAllNotes() {
        NoteServices.getAllNotes()
            .then((allNotes) => {
                this.setState({
                    allNotes: allNotes.data.data.data
                })
            })
    }

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
            editorText: draftToHtml(convertToRaw(editorState.getCurrentContent()))
        });
    };

    handleClose() {
        this.props.history.push('/dashboard');
    }

    handleAddQuestion() {
        console.log("Note Id: ", this.props.noteId, this.state.editorText);
        var data = {
            'message': this.state.editorText,
            'notesId': this.props.noteId
        }

        QASevices.addQuestion(data)
            .then((response) => {
                console.log("Note added successfully", response.data.data.details.message);
                this.setState({
                    message: response.data.data.details.message,
                    editorState: EditorState.createEmpty()
                })
                this.getAllNotes();
            })
            .catch(() => {
                console.log("Error in add question");
            })
    }
    handleRemoveQuestion = () => {

    }

    render() {
        const { editorState } = this.state;
        console.log("this.prosp", this.props.noteId);
        // var date;
        // date = new Date();
        var questionDate;

        const titleDescription = this.state.allNotes.map(key => {
            return (
                (this.props.noteId === key.id) ?
                    <div key={key.id}>
                        <div className="q-a-title-desc">
                            <div>
                                <div>
                                    {key.title}
                                </div>
                                <div>
                                    {key.description}
                                </div>
                            </div>
                            <Button
                                // className="close-btn"
                                onClick={this.handleClose}
                                style={{ cursor: "pointer" }}
                            >
                                <span style={{ textTransform: "none" }}> Close </span>
                            </Button>

                        </div>

                        <div className="q-a-asked">
                            <div>
                                <span><strong>Question Asked</strong></span>
                            </div>
                            {(key.questionAndAnswerNotes.length > 0) &&
                                <div style={{ display: "flex", justifyContent: "flex-start", flexFlow: "column" }}>{
                                    key.questionAndAnswerNotes.map(questionAndAnswerNotes => {
                                        return (

                                            <div>
                                                <div className="q-a-Font">
                                                    <div style={{ display: "flex",
                                                    justifyContent: "space-between",
                                                    borderBottom: "1px solid gray" }}>
                                                        <div>{questionAndAnswerNotes.message}</div>
                                                        <CloseIcon
                                                            onClick={this.handleRemoveQuestion}
                                                        />
                                                        <div style={{ display: "none" }}></div>
                                                    </div>
                                                </div>
                                                <div style={{ display: "flex" }}>
                                                    <div style={{ borderRadius: "50%", border: "1px solid lightgray", height: "50px", width: "50px" }}>
                                                        <img
                                                            src={localStorage.getItem('ProfileImage')}
                                                            alt="profile pic"
                                                            style={{ borderRadius: "50%", margin: "10%" }}
                                                            className="profile-pic"
                                                        />

                                                    </div>
                                                    <div>
                                                        <div style={{ display: "flex", justifyContent: "" }}>
                                                            <div style={{ padding: "5px" }}>
                                                                <strong>{localStorage.getItem('firstName')} {localStorage.getItem('lastName')} </strong>
                                                            </div>
                                                            <div style={{ padding: "4px" }}>
                                                                <span style={{ fontSize: "0.7rem" }}>{questionAndAnswerNotes.createdDate}</span>
                                                            </div>
                                                        </div>

                                                        <div>
                                                            {questionAndAnswerNotes.message}
                                                        </div>
                                                    </div>
                                                </div>




                                            </div>

                                        )
                                    })}
                                </div>
                            }
                        </div>

                    </div>
                    :
                    null
            )
        })
        return (
            <div className="main-q-a-div">
                {titleDescription}
                {/* {this.state.message} */}


                <div>
                    <Editor
                        editorState={editorState}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        onEditorStateChange={this.onEditorStateChange}
                        placeholder="Type here............."
                    />

                    <Button
                        className="close-btn"
                        onClick={this.handleAddQuestion}
                        style={{ cursor: "pointer" }}
                    >
                        <span style={{ textTransform: "none" }}> Ask </span>
                    </Button>
                </div>

            </div>
        )
    }
}

export default withRouter(EditorQnAComponent)



