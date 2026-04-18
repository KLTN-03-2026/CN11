const services = require("../services/User.service");

class UserController {
    async addContact(req, res) {
        try {
            const responsive = await services.addContactServices(req.body);
            return res.status(200).json(responsive);

        } catch (error) {
            return res.status(500).json({
                error: -1,
                message: "Interal Server Error"
            })
        }
    }

    async getsContact(req, res) {
        try {
            const responsive = await services.getsContactServices();
            return res.status(200).json(responsive);

        } catch (error) {
            return res.status(500).json({
                error: -1,
                message: "Interal Server Error"
            })
        }
    }

    async deleteContact(req, res) {
        try {
            const responsive = await services.deleteContactServices(req.params.id);
            return res.status(200).json(responsive);

        } catch (error) {
            return res.status(500).json({
                error: -1,
                message: "Interal Server Error"
            })
        }
    }

    async deletesContact(req, res) {
        try {
            const responsive = await services.deletesContactServices();
            return res.status(200).json(responsive);

        } catch (error) {
            return res.status(500).json({
                error: -1,
                message: "Interal Server Error"
            })
        }
    }

    async updateAccount(req, res) {
        try {
            const {id} = req.params;
            const responsive = await services.updateAccount(req.body,id);
            return res.status(200).json(responsive);

        } catch (error) {
            return res.status(500).json({
                error: -1,
                message: "Interal Server Error"
            })
        }
    }

    async updateVerify(req, res) {
        try {
            const {id} = req.params;
            const responsive = await services.updateVerify(req.body,id);
            return res.status(200).json(responsive);

        } catch (error) {
            return res.status(500).json({
                error: -1,
                message: "Interal Server Error"
            })
        }
    }

    async updateAvatar(req, res) {
        try {
            const {id} = req.params;
            const responsive = await services.updateAvatar(req.body,id);
            return res.status(200).json(responsive);

        } catch (error) {
            return res.status(500).json({
                error: -1,
                message: "Interal Server Error"
            })
        }
    }

    async getUsers(req, res) {
        try {
            const responsive = await services.getUsers();
            return res.status(200).json(responsive);

        } catch (error) {
            return res.status(500).json({
                error: -1,
                message: "Interal Server Error"
            })
        }
    }

   

    async setRole(req, res) {
        try {
            const {id} = req.params;
            const responsive = await services.setRole(req.body,id);
            return res.status(200).json(responsive);

        } catch (error) {
            return res.status(500).json({
                error: -1,
                message: "Interal Server Error"
            })
        }
    }
}

module.exports = new UserController();