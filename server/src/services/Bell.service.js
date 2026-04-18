const { or } = require("sequelize");
const db = require("../models");
const { generateCode } = require("../utils/generate.util");

class BellService {
    createBell({ title, des, rolecode, codetype, items }) {
        return new Promise(async (resolve, reject) => {
            try {

                const codebell = generateCode(10);
                let dataAll = [];

                const responsive = await db.Bell.findOrCreate({
                    where: { codebell },
                    defaults: {
                        codebell,
                        title,
                        des,
                        rolecode,
                        codetype: codetype
                    }
                })

                if (responsive[1]) {
                    items?.map(async (item) => {
                        await db.UserReceive.create({
                            codebell,
                            codeuser: item?.codeuser,
                            codeuserreceive: generateCode(10),
                            status: false
                        })
                    })
                }

                if (responsive[1]) {
                    dataAll = await db.Bell.findAll({
                        raw: true,
                        order: [["createdAt", "DESC"]]
                    })
                }

                return resolve({
                    error: responsive[1] ? 0 : 1,
                    message: responsive[1] ? "Tạo thông báo thành công" : "Tạo thông báo thất bại",
                    data: dataAll
                })


            } catch (error) {
                reject(error);
            }
        })
    }

    bells(rolecode) {
        return new Promise(async (resolve, reject) => {
            try {
                const responsive = await db.Bell.findAll({
                    where: { rolecode },
                    raw: true,
                    order: [["createdAt", "DESC"]],
                    attributes: {
                        exclude: ["codetype"]
                    },
                    include: [
                        { model: db.BellType, as: "bell_type", attributes: ["title", "codetype"] },
                    ],
                    nest: true
                })

                return resolve({
                    error: responsive ? 0 : 1,
                    message: responsive ? "Lấy thông báo thành công" : "Lấy thông báo thất bại",
                    data: responsive
                })


            } catch (error) {
                reject(error);
            }
        })
    }

    bellsToUser(codeuser) {
        return new Promise(async (resolve, reject) => {
            try {
                const responsive = await db.UserReceive.findAll({
                    where: { codeuser },
                    raw: true,
                    order: [["createdAt", "ASC"]],
                    attributes: {
                        exclude: ["codetype"]
                    },
                    include: [
                        {
                            model: db.Bell, as: "bell", attributes: { exclude: ["updatedAt"] }, include: [
                                { model: db.BellType, as: "bell_type", attributes: ["title", "codetype"] },
                            ]
                        },

                    ],
                    nest: true
                })

                return resolve({
                    error: responsive ? 0 : 1,
                    message: responsive ? "Lấy thông báo thành công" : "Lấy thông báo thất bại",
                    data: responsive
                })


            } catch (error) {
                reject(error);
            }
        })
    }

    updateBell(codeuser, codebell) {
        return new Promise(async (resolve, reject) => {
            try {
                const responsive = await db.UserReceive.update({ status: true }, { where: { codeuser, codebell } })
                const dataAll = await db.UserReceive.findAll({
                    where: { codeuser },
                    raw: true,
                    order: [["createdAt", "ASC"]],
                    attributes: {
                        exclude: ["codetype"]
                    },
                    include: [
                        {
                            model: db.Bell, as: "bell", attributes: { exclude: ["updatedAt"] }, include: [
                                { model: db.BellType, as: "bell_type", attributes: ["title", "codetype"] },
                            ]
                        },

                    ],
                    nest: true
                })

                return resolve({
                    error: responsive ? 0 : 1,
                    message: responsive ? "Lấy thông báo thành công" : "Lấy thông báo thất bại",
                    data: dataAll
                })


            } catch (error) {
                reject(error);
            }
        })
    }

    belltypes() {
        return new Promise(async (resolve, reject) => {
            try {
                const responsive = await db.BellType.findAll({
                    raw: true,
                    attributes: ["title", "codetype"],
                    order: [["createdAt", "DESC"]]
                })

                return resolve({
                    error: responsive ? 0 : 1,
                    message: responsive ? "Lấy thông báo thành công" : "Lấy thông báo thất bại",
                    data: responsive
                })


            } catch (error) {
                reject(error);
            }
        })
    }

    deleteBells(id) {
        return new Promise(async (resolve, reject) => {
            try {
                let dataAll = [];
                const responsive = await db.Bell.destroy({
                    where: { codebell: id }
                })

                if (responsive) {
                    dataAll = await db.Bell.findAll({
                        raw: true,
                        order: [["createdAt", "DESC"]]
                    })
                }

                return resolve({
                    error: responsive ? 0 : 1,
                    message: responsive ? "Xóa thông báo thành công" : "Xóa thông báo thất bại",
                    data: dataAll
                })



            } catch (error) {
                reject(error);
            }
        })
    }
}

module.exports = new BellService();