const db = require("../models");
const { generateCode } = require("../utils/generate.util");

class VoucherService {
    createVoucher({ name, codecategories, codecondition, exprice, sale, style, active = true }) {
        return new Promise(async (resolve, reject) => {
            try {

                const codevoucher = generateCode(8);
                let dataAll = [];
                const responsive = await db.Voucher.findOrCreate({
                    where: { codevoucher },
                    defaults: {
                        codecondition,
                        codevoucher,
                        codecategories,
                        name,
                        active,
                        exprice,
                        sale,
                        style
                    }
                })

                if (responsive[1]) {
                    dataAll = await db.Voucher.findAll({
                        attributes: {
                            exclude: ["codecategories", "codecondition"]
                        },
                        include: [
                            { model: db.Categories, as: "category_voucher", attributes: ["name", "id", "codecategories"] },
                            { model: db.Condition, as: "condition", attributes: ["name", "codecondition", "id"] },
                        ],
                        raw: true,
                        nest: true
                    })
                }

                return resolve({
                    error: responsive[1] ? 0 : 1,
                    message: responsive[1] ? "Create thành công !" : "Create không thành công !",
                    data: dataAll
                })

            } catch (error) {
                reject(error);
            }
        })
    }

    vouchers() {
        return new Promise(async (resolve, reject) => {
            try {

                const responsive = await db.Voucher.findAll({
                    attributes: {
                        exclude: ["codecategories", "codecondition"]
                    },
                    include: [
                        { model: db.Categories, as: "category_voucher", attributes: ["name", "id", "codecategories"] },
                        { model: db.Condition, as: "condition", attributes: ["name", "codecondition", "id"] },
                    ],
                    raw: true,
                    nest: true
                })

                return resolve({
                    error: responsive ? 0 : 1,
                    message: responsive ? "Get thành công !" : "Get không thành công !",
                    data: responsive
                })

            } catch (error) {
                reject(error);
            }
        })
    }

    deletevouchers(id) {
        return new Promise(async (resolve, reject) => {
            try {

                let dataAll = []
                const responsive = await db.Voucher.destroy({
                    where: { codevoucher: id }
                })

                if (responsive) {
                    dataAll = await db.Voucher.findAll({
                        attributes: {
                            exclude: ["codecategories", "codecondition"]
                        },
                        include: [
                            { model: db.Categories, as: "category_voucher", attributes: ["name", "id", "codecategories"] },
                            { model: db.Condition, as: "condition", attributes: ["name", "codecondition", "id"] },
                        ],
                        raw: true,
                        nest: true
                    })
                }

                return resolve({
                    error: responsive ? 0 : 1,
                    message: responsive ? "Get thành công !" : "Get không thành công !",
                    data: dataAll
                })

            } catch (error) {
                reject(error);
            }
        })
    }
}

module.exports = new VoucherService();