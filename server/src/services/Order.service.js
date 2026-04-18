const { where } = require("sequelize");
const db = require("../models");
const { generateCode, convertPriceToNumber, formatVND, parseVND } = require("../utils/generate.util");

class OrderService {
    createOrder({ codetable, codeuser, note, items }) {
        return new Promise(async (resolve, reject) => {
            try {

                const codeorder = generateCode(12);
                const codeitem = generateCode(12);
                const codebuy = generateCode(12);
                const totalQuantity = items?.reduce((total, item) => total + item.quatify, 0) || 0;
                const totalPrice = items?.reduce((total, item) => total + convertPriceToNumber(item?.price) * item.quatify, 0) || 0;

                const responsive = await db.Order.findOrCreate({
                    where: { codeorder },
                    defaults: {
                        codeorder,
                        codetable,
                        codeuser,
                        codeitem,
                    }
                })

                responsive[1] && await db.Items.findOrCreate({
                    where: { codeitem },
                    defaults: {
                        codeitem,
                        quantify: totalQuantity + "",
                        total: formatVND(totalPrice),
                        note,
                        codeorder,
                        codebuy,
                    }
                })

                await Promise.all(
                    items.map((item) =>
                        db.Customer.increment(
                            { quatify: item.quatify },
                            { where: { codefood: item.codefood } }
                        )
                    )
                );

                await Promise.all(
                    items.map((item) =>
                        db.ListBuy.create({
                            codebuy,
                            codeuser,
                            codefood: item.codefood,
                            quatify: item.quatify,
                            codeitem
                        })
                    )
                );
                return resolve({
                    error: responsive[1] ? 0 : 1,
                    message: responsive[1] ? "Create thành công !" : "Create không thành công !",
                })

            } catch (error) {
                reject(error);
            }
        })
    }

    createOrderTable({ email, phone, codehour, date, guest, codetable }) {
        return new Promise(async (resolve, reject) => {
            try {

                const codeordertable = generateCode(12);
                const responsive = await db.OrderTable.findOrCreate({
                    where: { codeordertable },
                    defaults: {
                        codeordertable,
                        email,
                        phone,
                        codehour,
                        date,
                        guest,
                        codetable
                    }
                })

                responsive[1] && await db.OrderTableStatus.update({
                    isorder: true
                }, { where: { codetable } })

                return resolve({
                    error: responsive[1] ? 0 : 1,
                    message: responsive[1] ? "Create thành công !" : "Create không thành công !",
                })

            } catch (error) {
                reject(error);
            }
        })
    }



    getOrders() {
        return new Promise(async (relsove, reject) => {
            try {
                const responsive = await db.Order.findAll({
                    attributes: {
                        exclude: ["updatedAt", "codetable", "codeuser", "codeitem"]
                    },
                    order: [['createdAt', 'DESC']],
                    include: [
                        {
                            model: db.Table, as: "order_table", attributes: ["name", "url", "codetable"], include: [
                                { model: db.TableStatus, as: "table_status", attributes: ["customer", "isorder"] },
                                { model: db.Floor, as: "floor_table", attributes: ["name", "codefloor"] }
                            ]
                        },
                        { model: db.User, as: "order_user", attributes: ["codeuser", "username", "email", "phone", "isVerify", "address"] },
                        {
                            model: db.Items, as: "order_items", attributes: ["quantify", "total", "note", "codeitem"], include: [
                                {
                                    model: db.ListBuy, as: "item_listbuy", attributes: ["quatify", "codebuy"],
                                    include: [
                                        { model: db.Food, as: "foods", attributes: ["name", "price", "codefood", "image", "tag", "note"] }
                                    ]
                                }
                            ]
                        }
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

    getOrdersTable() {
        return new Promise(async (relsove, reject) => {
            try {
                const responsive = await db.OrderTable.findAll({
                    attributes: {
                        exclude: ["updatedAt", "codetable", "codehour"]
                    },
                    order: [['createdAt', 'DESC']],
                    include: [
                        { model: db.HourService, as: "order_hour", attributes: ["codehour", "hour", "active"] },
                        { model: db.Table, as: "order_table", attributes: ["codetable", "name", "url"] }
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

    getOrdersTableHour(id) {
        return new Promise(async (relsove, reject) => {
            try {
                const responsive = await db.OrderTableStatus.findAll({
                    where: { codehour: id },
                    attributes: {
                        exclude: ["updatedAt"]
                    },
                    order: [['id', 'ASC']],
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

    updateOrdersTableHour(id, idcodehour, codefloor) {
        return new Promise(async (relsove, reject) => {
            try {

                const result = await db.OrderTableStatus.update(
                    { isorder: true },
                    {
                        where: {
                            codehour: idcodehour,
                            codetable: id,
                            codefloor: codefloor
                        }
                    }
                );

                return relsove({
                    error: result ? 0 : 1,
                    message: result ? "Update thành công !" : "Update không thành công !.",  
                })
            } catch (error) {
                reject(error);
            }
        })
    }

    updateOrderTable(id) {
        return new Promise(async (relsove, reject) => {
            try {

                let dataAll = [];

                const responsive = await db.OrderTable.update({
                    status: true
                }, { where: { codeordertable: id } })

                if (responsive) {
                    dataAll = await db.OrderTable.findAll({
                        attributes: {
                            exclude: ["updatedAt", "codetable", "codehour"]
                        },
                        order: [['createdAt', 'DESC']],
                        include: [
                            { model: db.HourService, as: "order_hour", attributes: ["codehour", "hour", "active"] },
                            { model: db.Table, as: "order_table", attributes: ["codetable", "name", "url"] }
                        ],
                        nest: true
                    })
                }

                return relsove({
                    error: responsive ? 0 : 1,
                    message: responsive ? "Update thành công !" : "Update không thành công !.",
                    data: dataAll
                })
            } catch (error) {
                reject(error);
            }
        })
    }

    deleteOrderTable(id) {
        return new Promise(async (relsove, reject) => {
            try {

                let dataAll = [];

                const responsive = await db.OrderTable.destroy({ where: { codeordertable: id } })


                if (responsive) {
                    dataAll = await db.OrderTable.findAll({
                        attributes: {
                            exclude: ["updatedAt", "codetable", "codehour"]
                        },
                        order: [['createdAt', 'DESC']],
                        include: [
                            { model: db.HourService, as: "order_hour", attributes: ["codehour", "hour", "active"] },
                            { model: db.Table, as: "order_table", attributes: ["codetable", "name", "url"] }
                        ],
                        nest: true
                    })
                }

                return relsove({
                    error: responsive ? 0 : 1,
                    message: responsive ? "Delete thành công !" : "Delete không thành công !.",
                    data: dataAll
                })
            } catch (error) {
                reject(error);
            }
        })
    }
}

module.exports = new OrderService();