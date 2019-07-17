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

    changesColorNotes(note){
        return axios.post(`${BaseURL}/changesColorNotes`, note, {
            headers:{
                'Authorization' : token
            }
        })
    }

    updateReminderNotes(note){
        return axios.post(`${BaseURL}/addUpdateReminderNotes`, note, {
            headers:{
                'Authorization' : token
            }
        })
    }

    removeReminderNotes(note){
        return axios.post(`${BaseURL}/removeReminderNotes`, note, {
            headers:{
                'Authorization' : token
            }
        })
    }

    trashNote(note){
        return axios.post(`${BaseURL}/trashNotes`, note, {
            headers:{
                'Authorization' : token
            }
        })
    }

    deleteForeverNote(note){
        return axios.post(`${BaseURL}/deleteForeverNotes`, note, {
            headers:{
                'Authorization' : token
            }
        })
    }

    getTrashNotes(){
        return axios
        .get(`${BaseURL}/getTrashNotesList`, {
            headers:{
                'Authorization' : token
            }
        })
        
    }

    getReminderNotesList(){
        return axios
        .get(`${BaseURL}/getReminderNotesList`, {
            headers:{
                'Authorization' : token
            }
        })
    }

    getArchiveNotesList(){
        return axios
        .get(`${BaseURL}/getArchiveNotesList`, {
            headers:{
                'Authorization' : token
            }
        })
    }

    addcollaboratorsNotes(data, noteId){
        return axios
        .post(`${BaseURL}/${noteId}/AddcollaboratorsNotes`, data,{
            headers:{
                'Authorization' : token
            }
        })
    }

    removeCollaboratorsNotes(noteId, collaboratorUserId){
        return axios
        .delete(`${BaseURL}/${noteId}/removeCollaboratorsNotes/${collaboratorUserId}`,{
            headers:{
                'Authorization' : token
            }
        })
    }
    
}

export default NoteServices;