import axios from 'axios'

const BaseURL = "http://fundoonotes.incubation.bridgelabz.com/api/noteLabels"
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

    deleteNoteLabel(id){
        console.log("label ID",id);
        
        return axios.delete(`${BaseURL}/${id}/deleteNoteLabel`, id, {
            headers:{
                'Authorization' :token
            }
        })
    }

    updateLabel(data){
        console.log("label ID");
        return axios.post(`${BaseURL}/${data.id}/updateNoteLabel`, data.data, {
            headers:{
                'Authorization' :token
            }
        })
    }
}

export default LabelServices;