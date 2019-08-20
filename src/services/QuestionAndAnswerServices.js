import axios from 'axios'

const BaseURL = "http://fundoonotes.incubation.bridgelabz.com/api"
const token = localStorage.getItem("token");

class QuestionAndAnswerServices {
    addQuestion(data){
        // console.log(localStorage.getItem("token"));
        return axios.post(`${BaseURL}/questionAndAnswerNotes/addQuestionAndAnswer`, data, {
            headers:{
                'Authorization' : token
            }
        })
    }

    likeQuestion(data, parentId){
        // console.log(localStorage.getItem("token"));
        return axios.post(`${BaseURL}/questionAndAnswerNotes/like/${parentId}`, data, {
            headers:{
                'Authorization' : token
            }
        })
    }

    replyQuestion(data){
        // console.log(localStorage.getItem("token"));
        return axios.post(`${BaseURL}/questionAndAnswerNotes/reply/${data.parentId}`, data.data, {
            headers:{
                'Authorization' : token
            }
        })
    }
}

export default QuestionAndAnswerServices