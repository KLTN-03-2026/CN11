const services = require("../services/Categories.service");

class CategoriesController {
    async createCategories(req, res) {
        try {
            const responsive = await services.createCategories(req.body);
            return res.status(200).json(responsive);
        } catch (error) {
            return res.status(500).json({
                error: -1,
                message: "Interal Server Error"
            })
        }
    }

    async getCategories(req, res) {
        try {
            const responsive = await services.getCategories();
            return res.status(200).json(responsive);
        } catch (error) {
            return res.status(500).json({
                error: -1,
                message: "Interal Server Error"
            })
        }
    }

    async deleteCategories(req, res) {
        try {
            const {id} = req.params;
            const responsive = await services.deleteCategories(id);
            return res.status(200).json(responsive);
        } catch (error) {
            return res.status(500).json({
                error: -1,
                message: "Interal Server Error"
            })
        }
    }


}

module.exports = new CategoriesController();