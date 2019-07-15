import axios from 'axios'
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'
// import { withRouter } from 'react-router-dom'
require('dotenv').config();
// const API = process.env.API;
// const login = process.env.LOGIN;
// const register = process.env.REGISTER;

const BaseURL = "http://34.213.106.173/api/user";
class Services {
    loginService (data){
        
        return axios.post(`${BaseURL}/login`, data)
    }

    userRegister(data){
        axios.post(`${BaseURL}/userSignUp`,data)
        .then(response => {
            console.log(response);
            toast.success("Registration successfull.... Please click login", {
                position: toast.POSITION.TOP_CENTER
            });
        })
        .catch(err => {
            console.log("Eroorrrrrr....",err);
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

    uploadProfileImage(data){
        return axios.post(`${BaseURL}/uploadProfileImage`, data, {
            headers:{
                'Authorization' : localStorage.getItem('token')
            }
        })
    }

    getAllUsers(){
        return axios.get(`${BaseURL}`, {
            headers:{
                'Authorization' : localStorage.getItem('token')
            }
        })
    }
}

export default Services;