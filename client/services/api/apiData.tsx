import axios from "../../config/axiosConfig";

export const apiGetContacts = () => new Promise(async(resolve,reject)=>{
    try {
        const responsive = await axios({
            method:"GET",
            url:"/api/user/gets-contact"
        })
        return resolve(responsive);
    } catch (err) {
     reject(err);   
    }
})