const { or } = require("sequelize");
const db = require("../models");

class LogService {
    getLogs() {
        return new Promise(async (relsove, reject) => {
            try {
                const responsive = await db.Log.findAll({
                    attributes: {
                        exclude: ["role", "codeuser"]
                    },
                    order: [['createdAt', 'DESC']],
                    include: [
                        { model: db.Role, as: "role_log", attributes: ["code", "value"] },
                        { model: db.User, as: "user", attributes: ["username", "email", "phone", "isVerify", "address"] },
                    ],
                    nest: true
                })
                return relsove({
                    error: responsive ? 0 : 1,
                    message: responsive ? "Lấy thành công !" : "Lấy không thành công !.",
                    data: responsive
                })
            } catch (error) {
                reject(error);
            }
        })
    }

    getFloors() {
        return new Promise(async (relsove, reject) => {
            try {
                const responsive = await db.Floor.findAll({
                    attributes: {
                        exclude: ["createdAt", "active", "updatedAt"]
                    },
                    order: [['createdAt', 'DESC']],
                })
                return relsove({
                    error: responsive ? 0 : 1,
                    message: responsive ? "Lấy thành công !" : "Lấy không thành công !.",
                    data: responsive
                })
            } catch (error) {
                reject(error);
            }
        })
    }

    getFloorsTable(codefloor, codehour) {
        return new Promise(async (relsove, reject) => {
            try {
                const responsive = await db.OrderTableStatus.findAll({
                    attributes: {
                        exclude: ["updatedAt", "codetable", "codefloor", "codehour"]
                    },
                    order: [['id', 'ASC']],
                    where: {
                        codefloor,
                        codehour
                    },
                    include: [
                        { model: db.TableStatus, as: "order_customer", attributes: ["customer"] },
                        { model: db.Table, as: "order_table_name", attributes: ["codetable", "name", "url", "active"] },
                        { model: db.Floor, as: "order_floor", attributes: ["codefloor", "name"] },
                        { model: db.HourService, as: "order_hour_name", attributes: ["codehour", "hour"] },
                    ],
                    raw: true,
                    nest: true
                })
                return relsove({
                    error: responsive ? 0 : 1,
                    message: responsive ? "Lấy thành công !" : "Lấy không thành công !.",
                    data: responsive
                })
            } catch (error) {
                reject(error);
            }
        })
    }

    getFloorsTableData(codefloor) {
        return new Promise(async (relsove, reject) => {
            try {
                const responsive = await db.Table.findAll({
                    where: { codefloor },
                    order: [['id', 'ASC']],
                    include: [
                        { model: db.TableStatus, as: "table_status", attributes: ["customer"] },
                    ],
                    raw: true,
                    nest: true
                })
                return relsove({
                    error: responsive ? 0 : 1,
                    message: responsive ? "Lấy thành công !" : "Lấy không thành công !.",
                    data: responsive
                })
            } catch (error) {
                reject(error);
            }
        })
    }

    getHours() {
        return new Promise(async (relsove, reject) => {
            try {
                const responsive = await db.HourService.findAll({
                    where: { active: true },
                    order: [['hour', 'ASC']],
                    attributes: ["id", "hour", "codehour", "active"]
                })
                return relsove({
                    error: responsive ? 0 : 1,
                    message: responsive ? "Lấy thành công !" : "Lấy không thành công !.",
                    data: responsive
                })
            } catch (error) {
                reject(error);
            }
        })
    }
}

module.exports = new LogService();