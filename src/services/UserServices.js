import axios from 'axios'
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'
// import { withRouter } from 'react-router-dom'
require('dotenv').config();
// const API = process.env.API;
// const login = process.env.LOGIN;
// const register = process.env.REGISTER;

const BaseURL = "http://fundoonotes.incubation.bridgelabz.com/api/user";
class Services {
    loginService (data){
        
        return axios.post(`${BaseURL}/login`, data)
    }

    userRegister(data){
        return axios.post(`${BaseURL}/userSignUp`,data)
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

    searchUserList(data){
        return axios.post(`${BaseURL}/searchUserList`, data, {
            headers:{
                'Authorization' : localStorage.getItem('token')
            }
        })
    }

    shoppingServiceDetails(){
        return axios.get(`${BaseURL}/service`, {
            headers:{
                'Authorization' : localStorage.getItem('token')
            }
        })
    }
    
}

export default Services;