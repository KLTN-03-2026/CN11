const { or, where } = require("sequelize");
const db = require("../models");
const { generateCode, formatVND, parseVND } = require("../utils/generate.util");

class BankService {
    createBank({ codetable, codeorder, codeuser, total, method, status, date, hour }) {
        return new Promise(async (resolve, reject) => {
            try {
                const codebank = generateCode(10);
                let dataAll = [];
                const responsive = await db.BankHistory.create({
                    codebank,
                    codeorder,
                    codeuser,
                    total: formatVND(parseVND(total)),
                    method,
                    status,
                    date,
                    hour,
                    codetable
                })

                if (responsive) {
                    dataAll = await db.BankHistory.findAll({
                        nest: true,
                        raw: true,
                        order: [["createdAt", "DESC"]],
                        attributes: { exclude: ["codeuser"] },
                        include: [
                            { model: db.User, as: "user_bank", attributes: { exclude: ["password", "createdAt", "updatedAt"] } },
                            { model: db.Table, as: "table", attributes: { exclude: ["createdAt", "updatedAt"] } }
                        ]
                    })
                }
                return resolve({
                    error: responsive ? 0 : 1,
                    message: responsive ? "Tạo lịch sử thanh toán thành công" : "Tạo lịch sử thanh toán thất bại",
                    data: dataAll
                })
            } catch (error) {
                reject(error);
            }
        })
    }

    getBanks() {
        return new Promise(async (resolve, reject) => {
            try {

                const responsive = await db.BankHistory.findAll({
                    nest: true,
                    raw: true,
                    order: [["createdAt", "DESC"]],
                    attributes: { exclude: ["codeuser"] },
                    include: [
                        { model: db.User, as: "user_bank", attributes: { exclude: ["password", "createdAt", "updatedAt"] } },
                        { model: db.Table, as: "table", attributes: { exclude: ["createdAt", "updatedAt"] } }
                    ]
                })

                return resolve({
                    error: responsive ? 0 : 1,
                    message: responsive ? "Lấy lịch sử thanh toán thành công" : "Lấy lịch sử thanh toán thất bại",
                    data: responsive
                })
            } catch (error) {
                reject(error);
            }
        })
    }

    updateBanks(id) {
        return new Promise(async (resolve, reject) => {
            try {

                const responsive = await db.BankHistory.update({
                    status: "confirmed"
                }, { where: { codebank: id } })

                const dataAll = await db.BankHistory.findAll({
                    nest: true,
                    raw: true,
                    order: [["createdAt", "DESC"]],
                    attributes: { exclude: ["codeuser"] },
                    include: [
                        { model: db.User, as: "user_bank", attributes: { exclude: ["password", "createdAt", "updatedAt"] } },
                        { model: db.Table, as: "table", attributes: { exclude: ["createdAt", "updatedAt"] } }
                    ]
                })

                return resolve({
                    error: responsive ? 0 : 1,
                    message: responsive ? "Cập nhật lịch sử thanh toán thành công" : "Cập nhật lịch sử thanh toán thất bại",
                    data: dataAll
                })
            } catch (error) {
                reject(error);
            }
        })
    }

    getBanksRevueChart() {
        return new Promise(async (resolve, reject) => {
            try {

                const responsive = await db.BankHistory.findAll({
                    nest: true,
                    raw: true,
                    order: [["createdAt", "DESC"]],
                    attributes: ["createdAt", "total","id"],
                    
                })

                return resolve({
                    error: responsive ? 0 : 1,
                    message: responsive ? "Lấy lịch sử thanh toán thành công" : "Lấy lịch sử thanh toán thất bại",
                    data: responsive
                })
            } catch (error) {
                reject(error);
            }
        })
    }

}

module.exports = new BankService();