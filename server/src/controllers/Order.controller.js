const services = require("../services/Order.service");

class OrderController {
    async createOrder(req, res) {
        try {
            const responsive = await services.createOrder(req.body);
            return res.status(200).json(responsive);
        } catch (error) {
            return res.status(500).json({
                error: -1,
                message: "Interal Server Error"
            })
        }
    }

    async createOrderTable(req, res) {
        try {
            const responsive = await services.createOrderTable(req.body);
            return res.status(200).json(responsive);
        } catch (error) {
            return res.status(500).json({
                error: -1,
                message: "Interal Server Error"
            })
        }
    }


    async getOrders(req, res) {
        try {
            const responsive = await services.getOrders();
            return res.status(200).json(responsive);
        } catch (error) {
            return res.status(500).json({
                error: -1,
                message: "Interal Server Error"
            })
        }
    }

    async getOrdersTable(req, res) {
        try {
            const responsive = await services.getOrdersTable();
            return res.status(200).json(responsive);
        } catch (error) {
            return res.status(500).json({
                error: -1,
                message: "Interal Server Error"
            })
        }
    }
    
    async getOrdersTableHour(req, res) {
        try {
            const {id} = req.params;
            const responsive = await services.getOrdersTableHour(id);
            return res.status(200).json(responsive);
        } catch (error) {
            return res.status(500).json({
                error: -1,
                message: "Interal Server Error"
            })
        }
    }

    async updateOrdersTableHour(req, res) {
        try {
            const {id,codehour,codefloor} = req.params;
            const responsive = await services.updateOrdersTableHour(id,codehour,codefloor);
            return res.status(200).json(responsive);
        } catch (error) {
            return res.status(500).json({
                error: -1,
                message: "Interal Server Error"
            })
        }
    }

    async updateOrderTable(req, res) {
        try {
            const {id} = req.params;
            const responsive = await services.updateOrderTable(id);
            return res.status(200).json(responsive);
        } catch (error) {
            return res.status(500).json({
                error: -1,
                message: "Interal Server Error"
            })
        }
    }

    async deleteOrderTable(req, res) {
        try {
            const {id} = req.params;
            const responsive = await services.deleteOrderTable(id);
            return res.status(200).json(responsive);
        } catch (error) {
            return res.status(500).json({
                error: -1,
                message: "Interal Server Error"
            })
        }
    }
}

module.exports = new OrderController();