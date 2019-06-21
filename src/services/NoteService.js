import axios from 'axios'
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'

const addNotes = "http://34.213.106.173/api/notes/addNotes";
const getAllNotes = "http://34.213.106.173/api/notes/getNotesList"
const token = localStorage.getItem("token");

class NoteServices {

    addNotes(data){
        // console.log(localStorage.getItem("token"));
        axios.post(`${addNotes}`, data, {
            headers:{
                'Authorization' : token
            }
        })
        .then(response => {
            console.log(response);
            toast.success("Note Saved", {
                position: toast.POSITION.TOP_CENTER
            });
        })
        .catch(err => {
            console.log("Eroorrrrrr....",err);
            toast.info("Error in connection", {
                position: toast.POSITION.TOP_CENTER
            });
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
}

export default NoteServices;