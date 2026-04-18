import { PayloadEmailMessage, PayloadEmailOlder, PayloadEmailOTP, PayloadEmailRecieve, PayloadOTPResetPassword } from "@/types/email";
import axios from "../../config/axiosConfig";

export const apiSendEmailRecieve = (payload:PayloadEmailRecieve) => new Promise(async(resolve,reject)=>{
    try {
        const responsive = await axios({
            method:"POST",
            url:"/api/email/sendEmailRecieve",
            data:payload
        })
        return resolve(responsive);
    } catch (err) {
      reject(err);   
    } 
})

export const apiSendEmailOTP = (payload:PayloadEmailOTP) => new Promise(async(resolve,reject)=>{
    try {
        const responsive = await axios({
            method:"POST",
            url:"/api/email/sendOtpEmail",
            data:payload
        })
        return resolve(responsive);
    } catch (err) {
      reject(err);   
    } 
})

export const apiSendOTPResetPassword = (payload:PayloadOTPResetPassword) => new Promise(async(resolve,reject)=>{
    try {
        const responsive = await axios({
            method:"POST",
            url:"/api/email/sendOtp-ResetPassword",
            data:payload
        })
        return resolve(responsive);
    } catch (err) {
      reject(err);   
    } 
})

export const apiSendEmailOlder = (payload:PayloadEmailOlder) => new Promise(async(resolve,reject)=>{
    try {
        const responsive = await axios({
            method:"POST",
            url:"/api/email/sendEmailOrder",
            data:payload
        })
        return resolve(responsive);
    } catch (err) {
      reject(err);   
    } 
})

export const apiSendEmailMessage = (payload:PayloadEmailMessage) => new Promise(async(resolve,reject)=>{
    try {
        const responsive = await axios({
            method:"POST",
            url:"/api/email/sendEmailMessage",
            data:payload
        })
        return resolve(responsive);
    } catch (err) {
      reject(err);   
    } 
})

