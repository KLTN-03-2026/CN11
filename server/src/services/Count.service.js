const { Op } = require("sequelize");
const db = require("../models");

class CountServices {
    accounts() {
        return new Promise(async (reslove, reject) => {
            try {
                const responsive = await db.User.count();

                return reslove({
                    error: 0,
                    message: "Lấy thành công !",
                    data: responsive
                })

            } catch (error) {
                reject(error);
            }
        })
    }

    accountsStaff() {
        return new Promise(async (reslove, reject) => {
            try {
                const responsive = await db.User.findAndCountAll({
                    where: { rolecode: "R4" }
                });

                return reslove({
                    error: 0,
                    message: "Lấy thành công !",
                    data: responsive.count
                })

            } catch (error) {
                reject(error);
            }
        })
    }

    accountsChef() {
        return new Promise(async (reslove, reject) => {
            try {
                const responsive = await db.User.findAndCountAll({
                    where: { rolecode: "R2" }
                });

                return reslove({
                    error: 0,
                    message: "Lấy thành công !",
                    data: responsive.count
                })

            } catch (error) {
                reject(error);
            }
        })
    }

    accountsCustomer() {
        return new Promise(async (reslove, reject) => {
            try {
                const responsive = await db.User.findAndCountAll({
                    where: { rolecode: "R3" }
                });

                return reslove({
                    error: 0,
                    message: "Lấy thành công !",
                    data: responsive.count
                })

            } catch (error) {
                reject(error);
            }
        })
    }

    getRolesNoVerify() {
        return new Promise(async (relsove, reject) => {
            try {
                const responsive = await db.User.findAndCountAll({
                    where: { rolecode: "" }
                })
                return relsove({
                    error: 0,
                    message: "Lấy thành công !",
                    data: responsive.count
                })
            } catch (error) {
                reject(error);
            }
        })
    }

    foodsCount() {
        return new Promise(async (relsove, reject) => {
            try {
                const responsive = await db.Food.count()
                return relsove({
                    error: 0,
                    message: "Lấy thành công !",
                    data: responsive
                })
            } catch (error) {
                reject(error);
            }
        })
    }

    tableBlankCount() {
        return new Promise(async (relsove, reject) => {
            try {
                const responsive = await db.TableStatus.count({
                    where: { isorder: false }
                })
                return relsove({
                    error: 0,
                    message: "Lấy thành công !",
                    data: responsive
                })
            } catch (error) {
                reject(error);
            }
        })
    }

    orderTodayCount() {
        return new Promise(async (relsove, reject) => {
            try {

                const startOfDay = new Date();
                startOfDay.setHours(0, 0, 0, 0);

                const endOfDay = new Date();
                endOfDay.setHours(23, 59, 59, 999);

                const count = await db.OrderTable.count({
                    where: {
                        createdAt: {
                            [Op.between]: [startOfDay, endOfDay],
                        },
                    },
                });

               
                return relsove({
                    error: 0,
                    message: "Lấy thành công !",
                    data: count
                })
            } catch (error) {
                reject(error);
            }
        })
    }
}

module.exports = new CountServices();