import axios from 'axios'

const BaseURL = "http://34.213.106.173/api/notes"
const token = localStorage.getItem("token");

class NoteServices {

    addNotes(data){
        // console.log(localStorage.getItem("token"));
        return axios.post(`${BaseURL}/addNotes`, data, {
            headers:{
                'Authorization' : token
            }
        })
       
    }

    getAllNotes(){
        return axios
        .get(`${BaseURL}/getNotesList`, {
            headers:{
                'Authorization' : token
            }
        })
        
    }

    updateNote(data){
        return axios.post(`${BaseURL}/updateNotes`, data, {
            headers:{
                'Authorization' : token
            }
        })
    }
    archiveNote(note){
        return axios.post(`${BaseURL}/archiveNotes`, note, {
            headers:{
                'Authorization' : token
            }
        })
    }
}

export default NoteServices;