import axios from "axios";
const BaseURL = "http://fundoonotes.incubation.bridgelabz.com/api/productcarts/"
export default class CartServices {
    addToCart(productId) {
        return axios.post(`${BaseURL}/addToCart`, productId, {
        })
    }


    getCartDetails() {
        return axios.get(`${BaseURL}/myCart`, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
    }

    placeOrder(data) {
        return axios.post(`${BaseURL}/placeOrder`,data, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
    }
}
