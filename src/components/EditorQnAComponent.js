import { Editor } from 'react-draft-wysiwyg';
import React, { Component } from 'react'
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
// import htmlToDraft from 'draftjs-to-html';
import { Button } from '@material-ui/core';
import QAService from '../services/QuestionAndAnswerServices'
import { withRouter } from 'react-router-dom'
import NoteService from '../services/NoteServices';


const QASevices = new QAService();
const NoteServices = new NoteService();
class EditorQnAComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
            editorText: '',
            askQuestion: false,
            allNotes: []
        }

        this.handleAddQuestion = this.handleAddQuestion.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    componentDidMount() {
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
            .then(() => {
                console.log("Note added successfully");
                this.setState({ editorState: EditorState.createEmpty() })
            })
            .catch(() => {
                console.log("Error in add question");
            })
    }
    render() {
        const { editorState } = this.state;
        console.log("this.prosp", this.props.noteId);

        const titleDescription = this.state.allNotes.map(key => {
            return (
                (this.props.noteId === key.id) ?
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
                    :
                    null
            )
        })

        const questionAndAnswerNotes = this.state.allNotes.map(key => {
            return (
                (this.props.noteId === key.id) &&
                key.questionAndAnswerNotes
            )
        })

        console.log("questionNotes", questionAndAnswerNotes);
        

        const questionAsked = questionAndAnswerNotes.map(key => {
            return (
                   key.message
            )
        })

        console.log("questionNotes", questionAsked);



        return (
            <div className="main-q-a-div">
                {titleDescription}
                <div className="q-a-title-desc">
                    <div>
                        <span><strong>Question Asked</strong></span>
                    </div>
                {questionAsked}
                </div>
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



