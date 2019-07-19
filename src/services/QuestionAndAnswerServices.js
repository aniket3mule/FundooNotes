import axios from 'axios'

const BaseURL = "http://34.213.106.173/api"
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
}

export default QuestionAndAnswerServices