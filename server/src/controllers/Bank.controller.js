const services = require("../services/Bank.service");

class BankController {
    async createBank(req, res) {
        try {
            const responsive = await services.createBank(req.body);
            return res.status(200).json(responsive);
        } catch (error) {
            return res.status(500).json({
                error: -1,
                message: "Interal Server Error"
            })
        }
    }

    async getBanks(req, res) {
        try {
            const responsive = await services.getBanks();
            return res.status(200).json(responsive);
        } catch (error) {
            return res.status(500).json({
                error: -1,
                message: "Interal Server Error"
            })
        }
    }

    async getBanksRevueChart(req, res) {
        try {
            const responsive = await services.getBanksRevueChart();
            return res.status(200).json(responsive);
        } catch (error) {
            return res.status(500).json({
                error: -1,
                message: "Interal Server Error"
            })
        }
    }

    async updateBanks(req, res) {
        try {
            const { id } = req.params;
            const responsive = await services.updateBanks(id);
            return res.status(200).json(responsive);
        } catch (error) {
            return res.status(500).json({
                error: -1,
                message: "Interal Server Error"
            })
        }
    }
}

module.exports = new BankController();