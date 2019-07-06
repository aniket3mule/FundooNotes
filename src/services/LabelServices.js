import axios from 'axios'

const BaseURL = "http://34.213.106.173/api/noteLabels"
const token = localStorage.getItem("token");

class LabelServices {

    addLabels(data){
        // console.log(localStorage.getItem("token"));
        return axios.post(`${BaseURL}`, data, {
            headers:{
                'Authorization' : token
            }
        })
       
    }

    getLabels(){
        return axios.get(`${BaseURL}/getNoteLabelList   `, {
            headers:{
                'Authorization' : token
            }
        })
    }
}

export default LabelServices;