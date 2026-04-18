import { PayloadAddContact, PayloadUpdateAvatar, PayloadUpdateEmail, PayloadUpdatePass } from "@/types/user";
import axios from "../../config/axiosConfig";


export const apiSendUpdatePass = (payload: PayloadUpdatePass) => new Promise(async (resolve, reject) => {
    try {
        const responsive = await axios({
            method: "PUT",
            url: "/api/auth/update-pass",
            data: payload
        })
        return resolve(responsive);
    } catch (err) {
        reject(err);
    }
})

export const apiSendUpdateEmail = (payload: PayloadUpdateEmail) => new Promise(async (resolve, reject) => {
    try {
        const responsive = await axios({
            method: "PUT",
            url: "/api/auth/update-email",
            data: payload
        })
        return resolve(responsive);
    } catch (err) {
        reject(err);
    }
})

export const apiSendUpdateAvatar = (payload: PayloadUpdateAvatar) => new Promise(async (resolve, reject) => {
    try {
        const responsive = await axios({
            method: "PUT",
            url: "/api/auth/update-avatar",
            data: payload
        })
        return resolve(responsive);
    } catch (err) {
        reject(err);
    }
})

export const apiAddContact = (payload: PayloadAddContact) => new Promise(async (resolve, reject) => {
    try {
        const responsive = await axios({
            method: "POST",
            url: "/api/user/add-contact",
            data: payload
        })
        return resolve(responsive);
    } catch (err) {
        reject(err);
    }
})


