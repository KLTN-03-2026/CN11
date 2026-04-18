const db = require("../models");
const { generateCode, formatVND, parseVND } = require("../utils/generate.util");

class FoodService {
    createFood({ image, name, note, price, tag, codecategories }) {
        return new Promise(async (resolve, reject) => {
            try {

                const codefood = generateCode(10);
                const codecustomer = generateCode(8);

                const objUpdate = {
                    codefood,
                    codecustomer,
                }
                if (image) {
                    objUpdate.image = image
                }
                if (name) {
                    objUpdate.name = name
                }
                if (note) {
                    objUpdate.note = note
                }
                if (price) {
                    objUpdate.price = formatVND(parseVND(price));
                }
                if (tag) {
                    objUpdate.tag = tag
                }
                if (codecategories) {
                    objUpdate.codecategories = codecategories
                }


                const responsive = await db.Food.findOrCreate({
                    where: { name },
                    defaults: objUpdate
                })

                responsive[1] && await db.Customer.findOrCreate({
                    where: { codefood },
                    defaults: {
                        codecustomer,
                        codefood,
                        quatify: 0
                    }
                })

                const dataAll = await db.Food.findAll({
                    raw: true,
                    nest: true,
                    attributes: {
                        exclude: ["codecategories"]
                    },
                    include: [
                        { model: db.Categories, as: "category", attributes: ["name", "des", "codecategories"] },
                        { model: db.Customer, as: "customers", attributes: ["codefood", "quatify"] },
                    ]
                });
                return resolve({
                    error: responsive[1] ? 0 : 1,
                    message: responsive[1] ? "Tạo sản phẩm thành công !" : "Tạo sản phẩm không thành công !",
                    data: dataAll
                })
            } catch (error) {
                reject(error);
            }
        })
    }

    updateFood({ image, name, note, price, tag, codecategories }, codefood) {
        return new Promise(async (resolve, reject) => {
            try {
                const objUpdate = {}
                if (image) {
                    objUpdate.image = image
                }
                if (name) {
                    objUpdate.name = name
                }
                if (note) {
                    objUpdate.note = note
                }
                if (price) {
                    objUpdate.price = formatVND(parseVND(price));
                }
                if (tag) {
                    objUpdate.tag = tag
                }
                if (codecategories) {
                    objUpdate.codecategories = codecategories
                }


                let dataAll = [];
                const responsive = await db.Food.update(objUpdate, { where: { codefood } })

                if (responsive) {
                    dataAll = await db.Food.findAll({
                        raw: true,
                        nest: true,
                        attributes: {
                            exclude: ["codecategories"]
                        },
                        include: [
                            { model: db.Categories, as: "category", attributes: ["name", "des", "codecategories"] },
                            { model: db.Customer, as: "customers", attributes: ["codefood", "quatify"] },
                        ]
                    });
                }

                return resolve({
                    error: responsive ? 0 : 1,
                    message: responsive ? "Update sản phẩm thành công !" : "Update sản phẩm không thành công !",
                    data: dataAll
                })
            } catch (error) {
                reject(error);
            }
        })
    }

    deleteFood(codefood) {
        return new Promise(async (resolve, reject) => {
            try {

                let dataAll = []
                const responsive = await db.Food.destroy({
                    where: { codefood }
                })

                if (responsive) {
                    dataAll = await db.Food.findAll({
                        raw: true,
                        nest: true,
                        attributes: {
                            exclude: ["codecategories"]
                        },
                        include: [
                            { model: db.Categories, as: "category", attributes: ["name", "des", "codecategories"] },
                            { model: db.Customer, as: "customers", attributes: ["codefood", "quatify"] },
                        ]
                    });
                }

                responsive && await db.Customer.destroy({
                    where: { codefood }
                })
                return resolve({
                    error: responsive ? 0 : 1,
                    message: responsive ? "Delete sản phẩm thành công !" : "Delete sản phẩm không thành công !",
                    data: dataAll
                })
            } catch (error) {
                reject(error);
            }
        })
    }

    getFoods() {
        return new Promise(async (resolve, reject) => {
            try {
                const responsive = await db.Food.findAll({
                    raw: true,
                    nest: true,
                    attributes: {
                        exclude: ["codecategories"]
                    },
                    include: [
                        { model: db.Categories, as: "category", attributes: ["name", "des", "codecategories"] },
                        { model: db.Customer, as: "customers", attributes: ["codefood", "quatify"] },
                    ]
                });

                return resolve({
                    error: responsive ? 0 : 1,
                    message: responsive ? "Lấy sản phẩm thành công !" : "Lấy sản phẩm không thành công !",
                    data: responsive
                })
            } catch (error) {
                reject(error);
            }
        })
    }
}

module.exports = new FoodService();