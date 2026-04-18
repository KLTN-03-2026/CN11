const services = require("../services/Condition.service");

class ConditionController {
    async createCondition(req, res) {
        try {
            const responsive = await services.createCondition(req.body);
            return res.status(200).json(responsive);
        } catch (error) {
            return res.status(500).json({
                error: -1,
                message: "Interal Server Error"
            })
        }
    }

    async deleteCondition(req, res) {
        try {
            const { id } = req.params;
            const responsive = await services.deleteCondition(id);
            return res.status(200).json(responsive);
        } catch (error) {
            return res.status(500).json({
                error: -1,
                message: "Interal Server Error"
            })
        }
    }


    async conditions(req, res) {
        try {
            const responsive = await services.conditions();
            return res.status(200).json(responsive);
        } catch (error) {
            return res.status(500).json({
                error: -1,
                message: "Interal Server Error"
            })
        }
    }

}

module.exports = new ConditionController();