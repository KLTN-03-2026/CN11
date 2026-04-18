const services = require("../services/Email.service");

class EmailController {
    async sendEmailOrder(req, res) {
        try {
       

            const responsive = await services.sendEmailOrderService(req.body);
            return res.status(200).json(responsive);

        } catch (error) {
            return res.status(500).json({
                error: -1,
                message: "Interal Server Error"
            })
        }
    }

    async sendOTPEmail(req, res) {
        try {
            const { email,otp } = req.body;

            const responsive = await services.sendOtpEmailService(email,otp);
            return res.status(200).json(responsive);

        } catch (error) {
            return res.status(500).json({
                error: -1,
                message: "Interal Server Error"
            })
        }
    }

    async sendOTPResetPass(req, res) {
        try {
            const { email,otp } = req.body;

            const responsive = await services.sendOTPResetPass(email,otp);
            return res.status(200).json(responsive);

        } catch (error) {
            return res.status(500).json({
                error: -1,
                message: "Interal Server Error"
            })
        }
    }

    async sendEmailRecieve(req, res) {
        try {
            const { email,time } = req.body;

            const responsive = await services.sendEmailRecieveService(email,time);
            return res.status(200).json(responsive);

        } catch (error) {
            return res.status(500).json({
                error: -1,
                message: "Interal Server Error"
            })
        }
    }

    async sendEmailMessage(req, res) {
        try {
            
            const {id} = req.params;
            const responsive = await services.sendMessageContact(req.body,id);
            return res.status(200).json(responsive);

        } catch (error) {
            return res.status(500).json({
                error: -1,
                message: "Interal Server Error"
            })
        }
    }

    async sendVerifyEmail(req, res) {
        try {
            const responsive = await services.sendVerifyEmail(req.body);
            return res.status(200).json(responsive);

        } catch (error) {
            return res.status(500).json({
                error: -1,
                message: "Interal Server Error"
            })
        }
    }
}

module.exports = new EmailController();