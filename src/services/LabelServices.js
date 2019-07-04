import axios from 'axios'

const BaseURL = "http://34.213.106.173/api/"
const token = localStorage.getItem("token");

class LabelServices {

    addLabels(data){
        // console.log(localStorage.getItem("token"));
        return axios.post(`${BaseURL}/noteLabels`, data, {
            headers:{
                'Authorization' : token
            }
        })
       
    }
}

export default LabelServices;