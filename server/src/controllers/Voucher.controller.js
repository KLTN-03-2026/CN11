const services = require("../services/Voucher.service");

class VoucherController {
    async createVoucher(req, res) {
        try {
            const responsive = await services.createVoucher(req.body);
            return res.status(200).json(responsive);
        } catch (error) {
            return res.status(500).json({
                error: -1,
                message: "Interal Server Error"
            })
        }
    }

    async vouchers(req, res) {
        try {
            const responsive = await services.vouchers();
            return res.status(200).json(responsive);
        } catch (error) {
            return res.status(500).json({
                error: -1,
                message: "Interal Server Error"
            })
        }
    }

    async deletevouchers(req, res) {
        try {
            const {id}  =req.params;
            const responsive = await services.deletevouchers(id);
            return res.status(200).json(responsive);
        } catch (error) {
            return res.status(500).json({
                error: -1,
                message: "Interal Server Error"
            })
        }
    }
}

module.exports = new VoucherController();