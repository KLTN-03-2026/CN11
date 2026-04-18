import { PayLoadLogin, PayLoadRegister } from "@/types/auth";
import axios from "../../config/axiosConfig";

export const apiLogin = (payload: PayLoadLogin) => new Promise(async (resolve, reject) => {
    try {
        const responsive = await axios({
            method: "POST",
            url: "/api/auth/login",
            data: payload
        })

        return resolve(responsive);
    } catch (err) {
        reject(err);
    }
})

export const apiRegister = (payload: PayLoadRegister) => new Promise(async (resolve, reject) => {
    try {
        const responsive = await axios({
            method: "POST",
            url: "/api/auth/register",
            data: payload
        })

        return resolve(responsive);
    } catch (err) {
        reject(err);
    }
})
