import { Editor } from 'react-draft-wysiwyg';
import React, { Component } from 'react'
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Button } from '@material-ui/core';
import QAService from '../services/QuestionAndAnswerServices'
import NoteService from '../services/NoteServices';
import ThumbUpOutlined from '@material-ui/icons/ThumbUpAltOutlined'
import ThumbUp from '@material-ui/icons/ThumbUp'


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
        this.props.props.history.push('/dashboard');
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
            })
    }

    decodeHtml(html) {
        var txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }

    countLikes(likeValue) {
        var count = 0
        if (likeValue === true) {
            count++;
        }
        return count;
    }

    handleRepliedQuestions = (questionArray) =>{
        for (let i = 0; i < questionArray.length-1; i++) {
            for (let j = i+1; j < questionArray.length; j++) {
                if (questionArray[i].threadId === questionArray[j].threadId) {
                    return questionArray[i].message
                }
                else return null;
            }
        }
    }

    render() {
        const { editorState } = this.state;
        console.log("this.prosp", this.props.noteId);

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
                    </div>
                    :
                    null
            )
        });

        const AskedQuetionsList = this.state.allNotes.map(key => {
            return (
                (this.props.noteId === key.id) &&
                key.questionAndAnswerNotes.map(questionsListKey => {
                    return (
                        <div key={questionsListKey.id}>
                            <div className="innerHTML"
                                dangerouslySetInnerHTML={{ __html: questionsListKey.message }}>
                            </div>
                            <div className="innerHTML"
                                dangerouslySetInnerHTML={{ __html: this.handleRepliedQuestions(key.questionAndAnswerNotes) }}>
                            </div>
                        </div>
                    )
                })
            )
        })

        const ReplyQuestion = this.state.allNotes.map(key => {
            return (
                (this.props.noteId === key.id) &&
                key.questionAndAnswerNotes.map(questionsListKey => {
                    return (
                        <div key={questionsListKey.id}>
                            <div style={{ display: "flex" }}>
                                <div style={{ borderRadius: "50%", border: "1px solid lightgray", height: "50px", width: "50px" }}>
                                    <img
                                        src={localStorage.getItem('ProfileImage')}
                                        alt="profile pic"
                                        style={{ borderRadius: "50%", margin: "10%" }}
                                        className="profile-pic"
                                    />
                                </div>
                                <div style={{ display: "flex" }}>
                                    <div style={{ padding: "5px" }}>
                                        <strong style={{ fontSize: "0.7rem" }}>{localStorage.getItem('firstName')} {localStorage.getItem('lastName')} </strong>
                                    </div>
                                    <div style={{ padding: "4px" }}>
                                        <span style={{ fontSize: "0.7rem" }}>{questionsListKey.createdDate}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="like-reply-rate">
                                <div className="innerHTML"
                                    dangerouslySetInnerHTML={{ __html: questionsListKey.message }}>
                                </div>
                                {
                                    
                                }
                                {(questionsListKey.like.length > 0) ?
                                    questionsListKey.like.map(likeKey => {
                                        return (
                                            (likeKey.like === true) ?
                                                <div>
                                                    <div>
                                                        <ThumbUp
                                                            onClick={() => this.handleUnlike(questionsListKey.id)}
                                                        />
                                                        <span>{this.countLikes(likeKey.like)} Likes</span>
                                                    </div>
                                                </div>
                                                :
                                                <div>
                                                    <div>
                                                        <ThumbUpOutlined
                                                            onClick={() => this.handleLike(questionsListKey.id)}
                                                        />
                                                        <span>{this.countLikes(likeKey.like)} Likes</span>
                                                    </div>
                                                </div>
                                        )
                                    })
                                    :
                                    <div>
                                        <ThumbUpOutlined
                                            onClick={() => this.handleLike(questionsListKey.id)}
                                        />
                                        <span> {"0"} Likes</span>
                                    </div>
                                }
                                
                                <div>
                                    
                                </div>
                            </div>
                        </div>
                    )
                })
            )
        })

        return (
            <div className="main-q-a-div">
                {titleDescription}
                <div className="q-a-asked" >
                    <div>
                        <span><strong>Question Asked</strong></span>
                    </div>
                    {AskedQuetionsList}
                </div>
                <div className="q-a-asked" >
                    {ReplyQuestion}
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

export default EditorQnAComponent



