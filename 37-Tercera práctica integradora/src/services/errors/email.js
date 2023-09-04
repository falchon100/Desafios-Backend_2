import nodemailer from 'nodemailer'
import config from '../../config/config.js'


const transporter = nodemailer.createTransport({
    service:'gmail',
    port:8080,
    auth:{
        user:config.GMAIL_USER,
        pass:config.GMAIL_PASSWORD
    }
})


export const sendMail = async options =>{
    let result = await transporter.sendMail(options)
    return result;
}