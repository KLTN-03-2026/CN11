const services = require("../services/Bell.service");

class BellController {
    async createBell(req, res) {
        try {
            const responsive = await services.createBell(req.body);
            return res.status(200).json(responsive);
        } catch (error) {
            return res.status(500).json({
                error: -1,
                message: "Interal Server Error"
            })
        }
    }

    async bells(req, res) {
        try {
            const { id } = req.params;
            const responsive = await services.bells(id);
            return res.status(200).json(responsive);
        } catch (error) {
            return res.status(500).json({
                error: -1,
                message: "Interal Server Error"
            })
        }
    }

    async bellsToUser(req, res) {
        try {
            const { id } = req.params;
            const responsive = await services.bellsToUser(id);
            return res.status(200).json(responsive);
        } catch (error) {
            return res.status(500).json({
                error: -1,
                message: "Interal Server Error"
            })
        }
    }

    async belltypes(req, res) {
        try {
            const responsive = await services.belltypes();
            return res.status(200).json(responsive);
        } catch (error) {
            return res.status(500).json({
                error: -1,
                message: "Interal Server Error"
            })
        }
    }

    async deleteBells(req, res) {
        try {
            const { id } = req.params;
            const responsive = await services.deleteBells(id);
            return res.status(200).json(responsive);
        } catch (error) {
            return res.status(500).json({
                error: -1,
                message: "Interal Server Error"
            })
        }
    }

    async updateBell(req, res) {
        try {
            const { id,codebell } = req.params;
            const responsive = await services.updateBell(id,codebell);
            return res.status(200).json(responsive);
        } catch (error) {
            return res.status(500).json({
                error: -1,
                message: "Interal Server Error"
            })
        }
    }

}

module.exports = new BellController();