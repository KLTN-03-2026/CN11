const services = require("../services/Auth.service");

class AuthController {
    async login(req, res) {
        try {
            const responsive = await services.login(req.body);
            return res.status(200).json(responsive);
        } catch (error) {
            return res.status(500).json({
                error: -1,
                message: "Interal Server Error"
            })
        }
    }

    async register(req, res) {
        try {
            const responsive = await services.register(req.body);
            return res.status(200).json(responsive);
        } catch (error) {
            return res.status(500).json({
                error: -1,
                message: "Interal Server Error"
            })
        }
    }

    async updatePass(req, res) {
        try {
            const responsive = await services.updatePass(req.body);
            return res.status(200).json(responsive);
        } catch (error) {
            return res.status(500).json({
                error: -1,
                message: "Interal Server Error"
            })
        }
    }

    async updateEmail(req, res) {
        try {
            const responsive = await services.updateEmail(req.body);
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
            const responsive = await services.updateAvatar(req.body);
            return res.status(200).json(responsive);
        } catch (error) {
            return res.status(500).json({
                error: -1,
                message: "Interal Server Error"
            })
        }
    }

    async getUser(req, res) {
        try {
            const {codeuser} = req.user;
            const responsive = await services.getUser(codeuser);
            return res.status(200).json(responsive);
        } catch (error) {
            return res.status(500).json({
                error: -1,
                message: "Interal Server Error"
            })
        }
    }

    async getUserToRoleCode(req, res) {
        try {
            const {rolecode} = req.params;
            const responsive = await services.getUserToRoleCode(rolecode);
            return res.status(200).json(responsive);
        } catch (error) {
            return res.status(500).json({
                error: -1,
                message: "Interal Server Error"
            })
        }
    }

    // async createUserRecieveBell(req, res) {
    //     try {
    //         const {codeuser} = req.params;
    //         const responsive = await services.createUserRecieveBell(codeuser);
    //         return res.status(200).json(responsive);
    //     } catch (error) {
    //         return res.status(500).json({
    //             error: -1,
    //             message: "Interal Server Error"
    //         })
    //     }
    // }

    async getRoles(req, res) {
        try {
            
            const responsive = await services.getRoles();
            return res.status(200).json(responsive);
        } catch (error) {
            return res.status(500).json({
                error: -1,
                message: "Interal Server Error"
            })
        }
    }

    async getNoteWaiters(req, res) {
        try {
            
            const responsive = await services.getNoteWaiters();
            return res.status(200).json(responsive);
        } catch (error) {
            return res.status(500).json({
                error: -1,
                message: "Interal Server Error"
            })
        }
    }

    async createNoteWaiters(req, res) {
        try {
            
            const responsive = await services.createNoteWaiter(req.body);
            return res.status(200).json(responsive);
        } catch (error) {
            return res.status(500).json({
                error: -1,
                message: "Interal Server Error"
            })
        }
    }


}

module.exports = new AuthController();