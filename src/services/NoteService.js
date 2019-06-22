import axios from 'axios'
import {  toast } from 'react-toastify';


const addNote = "http://34.213.106.173/api/notes/addNotes";
const getAllNotes = "http://34.213.106.173/api/notes/getNotesList"
const updateNote = "http://34.213.106.173/api/notes/updateNotes"
const token = localStorage.getItem("token");

class NoteServices {

    addNotes(data){
        // console.log(localStorage.getItem("token"));
        return axios.post(`${addNote}`, data, {
            headers:{
                'Authorization' : token
            }
        })
       
    }

    getAllNotes(){
        return axios
        .get(`${getAllNotes}`, {
            headers:{
                'Authorization' : token
            }
        })
        
    }

    updateNote(data){
        return axios.post(`${updateNote}`, data, {
            headers:{
                'Authorization' : token
            }
        })
    }
}

export default NoteServices;