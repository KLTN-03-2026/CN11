const services = require("../services/Log.service");

class LogController {
    async getLogs(req, res) {
        try {
            const responsive = await services.getLogs();
            return res.status(200).json(responsive);
        } catch (error) {
            return res.status(500).json({
                error: -1,
                message: "Interal Server Error"
            })
        }
    }

    async getFloors(req, res) {
        try {
            const responsive = await services.getFloors();
            return res.status(200).json(responsive);
        } catch (error) {
            return res.status(500).json({
                error: -1,
                message: "Interal Server Error"
            })
        }
    }

    async getFloorsTable(req, res) {
        try {

            const { id,codehour } = req.params;

            const responsive = await services.getFloorsTable(id,codehour);
            return res.status(200).json(responsive);
        } catch (error) {
            return res.status(500).json({
                error: -1,
                message: "Interal Server Error"
            })
        }
    }

    async getFloorsTableData(req, res) {
        try {

            const { id } = req.params;

            const responsive = await services.getFloorsTableData(id);
            return res.status(200).json(responsive);
        } catch (error) {
            return res.status(500).json({
                error: -1,
                message: "Interal Server Error"
            })
        }
    }

    async getHours(req, res) {
        try {

            const responsive = await services.getHours();
            return res.status(200).json(responsive);
        } catch (error) {
            return res.status(500).json({
                error: -1,
                message: "Interal Server Error"
            })
        }
    }
}

module.exports = new LogController();