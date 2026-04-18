const services = require("../services/Count.service");

class CountController {
    async accounts(req, res) {
        try {
            const responsive = await services.accounts();
            return res.status(200).json(responsive);
        } catch (error) {
            return res.status(500).json({
                error: -1,
                message: "Interal Server Error"
            })
        }
    }

    async accountsStaff(req, res) {
        try {
            const responsive = await services.accountsStaff();
            return res.status(200).json(responsive);
        } catch (error) {
            return res.status(500).json({
                error: -1,
                message: "Interal Server Error"
            })
        }
    }

    async accountsCustomer(req, res) {
        try {
            const responsive = await services.accountsCustomer();
            return res.status(200).json(responsive);
        } catch (error) {
            return res.status(500).json({
                error: -1,
                message: "Interal Server Error"
            })
        }
    }

    async accountsChef(req, res) {
        try {
            const responsive = await services.accountsChef();
            return res.status(200).json(responsive);
        } catch (error) {
            return res.status(500).json({
                error: -1,
                message: "Interal Server Error"
            })
        }
    }

    async getRolesNoVerify(req, res) {
        try {
            const responsive = await services.getRolesNoVerify();
            return res.status(200).json(responsive);

        } catch (error) {
            return res.status(500).json({
                error: -1,
                message: "Interal Server Error"
            })
        }
    }

    async foodsCount(req, res) {
        try {
            const responsive = await services.foodsCount();
            return res.status(200).json(responsive);

        } catch (error) {
            return res.status(500).json({
                error: -1,
                message: "Interal Server Error"
            })
        }
    }

    async tableBlankCount(req, res) {
        try {
            const responsive = await services.tableBlankCount();
            return res.status(200).json(responsive);

        } catch (error) {
            return res.status(500).json({
                error: -1,
                message: "Interal Server Error"
            })
        }
    }
}

module.exports = new CountController();