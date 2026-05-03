const services = require("../services/Cook.service");

class CookController {
    async cooks(req, res) {
        try {
            const responsive = await services.cooksWaites();
            return res.status(200).json(responsive);
        } catch (error) {
            return res.status(500).json({
                error: -1,
                message: "Interal Server Error"
            })
        }
    }

    async updateFoodStatus(req, res) {
        try {
            const responsive = await services.updateFoodStatus(req.body);
            return res.status(200).json(responsive);
        } catch (error) {
            return res.status(500).json({
                error: -1,
                message: "Interal Server Error"
            })
        }
    }

  
}

module.exports = new CookController();