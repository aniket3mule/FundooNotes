import { Editor } from 'react-draft-wysiwyg';
import React, { Component } from 'react'
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
// import htmlToDraft from 'draftjs-to-html';
import { Button, Tooltip } from '@material-ui/core';
import QAService from '../services/QuestionAndAnswerServices'
import { withRouter } from 'react-router-dom'
import NoteService from '../services/NoteServices';
import ThumbUpOutlined from '@material-ui/icons/ThumbUpAltOutlined'
import ThumbUp from '@material-ui/icons/ThumbUp'
import QuestionAndAnswerServices from '../services/QuestionAndAnswerServices';


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

    handleLike = (parentId) => {
        var data = {
            'like': true
        }
        QASevices.likeQuestion(data, parentId)
            .then(response => {
                console.log("like response", response);
                this.getAllNotes();
                // this.setState({
                //     likeCount: response.data.data.count
                // })
            })
    }

    handleUnlike = (parentId) => {
        var data = {
            'like': false
        }

        QASevices.likeQuestion(data, parentId)
            .then(response => {
                console.log("like response", response);
                this.getAllNotes();
                // this.setState({
                //     likeCount: response.data.data.count
                // })
            })
    }

    decodeHtml(html) {
        var txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
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
                        {(key.questionAndAnswerNotes.length > 0) &&
                            <div className="q-a-asked" >
                                <div>
                                    <span><strong>Question Asked</strong></span>
                                </div>

                                <div className="innerHTML" dangerouslySetInnerHTML= {{__html: key.questionAndAnswerNotes[key.questionAndAnswerNotes.length - 1].message}}>
                                    {/* {key.questionAndAnswerNotes[key.questionAndAnswerNotes.length - 1].message} */}
                                </div>
                                {/* {this.decodeHtml(key.questionAndAnswerNotes[key.questionAndAnswerNotes.length - 1].message)} */}
                            </div>
                        }
                        {(key.questionAndAnswerNotes.length > 0) &&
                            <div className="q-a-asked">
                                <div style={{ display: "flex" }}>
                                    <div style={{ borderRadius: "50%", border: "1px solid lightgray", height: "50px", width: "50px" }}>
                                        <img
                                            src={localStorage.getItem('ProfileImage')}
                                            alt="profile pic"
                                            style={{ borderRadius: "50%", margin: "10%" }}
                                            className="profile-pic"
                                        />
                                    </div>
                                    <div style={{ display: "flex", marginLeft: "2.3vh"}}>
                                        <div style={{ padding: "5px" }}>
                                            <strong>{localStorage.getItem('firstName')} {localStorage.getItem('lastName')} </strong>
                                        </div>
                                        <div style={{ padding: "4px" }}>
                                            <span style={{ fontSize: "0.7rem" }}>{key.questionAndAnswerNotes[key.questionAndAnswerNotes.length - 1].createdDate}</span>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ display: "flex", marginLeft: "10vh" }}>
                                <div className="innerHTML" 
                                dangerouslySetInnerHTML= {{__html: key.questionAndAnswerNotes[key.questionAndAnswerNotes.length - 1].message}}>
                                    {/* {key.questionAndAnswerNotes[key.questionAndAnswerNotes.length - 1].message} */}
                                </div>
                                    {key.questionAndAnswerNotes[key.questionAndAnswerNotes.length - 1].like.map(likeDetails => {
                                            return (
                                                (likeDetails.like === true) ?
                                                    <div style={{ paddingLeft: "5vh", cursor:"pointer" }}>
                                                        <ThumbUp
                                                            onClick={() => this.handleUnlike(key.questionAndAnswerNotes[key.questionAndAnswerNotes.length - 1].id)}
                                                        />
                                                    </div>
                                                    :
                                                    <div style={{ paddingLeft: "5vh", cursor:"pointer" }}>
                                                        <ThumbUpOutlined
                                                            onClick={() => this.handleLike(key.questionAndAnswerNotes[key.questionAndAnswerNotes.length - 1].id)} />
                                                    </div>
                                                    )
                                        })
                                    }
                                    <div>
                                        <span>
                                        {key.questionAndAnswerNotes[key.questionAndAnswerNotes.length - 1].like.length} </span>
                                        <span> Likes</span>
                                    </div>
                                </div>
                            </div>
                        }

                    </div>
                    :
                    null
            )
        });

        return (
            <div className="main-q-a-div">
                {titleDescription}
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



