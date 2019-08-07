import axios from "axios";
const BaseURL = "http://34.213.106.173/api/productcarts/"
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
