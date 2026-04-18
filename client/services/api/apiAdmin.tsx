import axios from "../../config/axiosConfig";

export const apiGetContacts = () => new Promise(async (resolve, reject) => {
    try {
        const responsive = await axios({
            method: "GET",
            url: "/api/user/gets-contact"
        })
        return resolve(responsive);
    } catch (err) {
        reject(err);
    }
})

export const apiDeleteContact = (id: string) => new Promise(async (resolve, reject) => {
    try {
        const responsive = await axios({
            method: "DELETE",
            url: `/api/user/delete-contact/${id}`,
        })
        return resolve(responsive);
    } catch (err) {
        reject(err);
    }
})

export const apiDeletesContacts = () => new Promise(async (resolve, reject) => {
    try {
        const responsive = await axios({
            method: "DELETE",
            url: `/api/user/deletes-contact`,
        })
        return resolve(responsive);
    } catch (err) {
        reject(err);
    }
})

