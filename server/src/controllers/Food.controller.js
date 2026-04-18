const services = require("../services/Food.service");

class FoodController {
    async createFood(req, res) {
        try {
            const responsive = await services.createFood(req.body);
            return res.status(200).json(responsive);
        } catch (error) {
            return res.status(500).json({
                error: -1,
                message: "Interal Server Error"
            })
        }
    }

    async updateFood(req, res) {
        try {
            const {id} = req.params;
            const responsive = await services.updateFood(req.body,id);
            return res.status(200).json(responsive);
        } catch (error) {
            return res.status(500).json({
                error: -1,
                message: "Interal Server Error"
            })
        }
    }

    async getFoods(req, res) {
        try {
       
            const responsive = await services.getFoods();
            return res.status(200).json(responsive);
        } catch (error) {
            return res.status(500).json({
                error: -1,
                message: "Interal Server Error"
            })
        }
    
    }
    async deleteFood(req, res) {
        try {
            const {id} = req.params;
            const responsive = await services.deleteFood(id);
            return res.status(200).json(responsive);
        } catch (error) {
            return res.status(500).json({
                error: -1,
                message: "Interal Server Error"
            })
        }
    }
}

module.exports = new FoodController();