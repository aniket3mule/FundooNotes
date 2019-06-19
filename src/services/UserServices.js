import axios from 'axios'
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'
// import { withRouter } from 'react-router-dom'
require('dotenv').config();
const API = process.env.API;


class Services {

    
    loginService (data){
        
        return axios.post(`${API}/login`, data)
    }

    userRegister(data){
        axios.post('register',data)
        .then(response => {
            console.log(response);
            toast.success("Registration successfull.... Please click login", {
                position: toast.POSITION.TOP_CENTER
            });
        })
        .catch(err => {
            console.log(err);
            toast.info("Email ID already registered", {
                position: toast.POSITION.TOP_CENTER
            });
        })
    }

    forgetPassService(data){
        console.log('service : 4 ',data);
        axios.post('forgetpassword', data)
        .then(response => {
            console.log(response);
            toast.success("link is send to your email id. Please check Email", {
                position: toast.POSITION.TOP_CENTER
            });
        })
        .catch(err =>{
            console.log(err);
            toast.success("Email ID not registered", {
                position: toast.POSITION.TOP_CENTER
            });
        })
    }
    
    resetPasswordService(data, token){
        axios.post('resetpassword', data, {
            
            headers:{
                'token' : token
            }
        })
        .then(response => {
            console.log(response);
        })
        .catch(err =>{
            console.log(err);       
        })
    }
}

export default Services;