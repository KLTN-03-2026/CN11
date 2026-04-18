const db = require("../models");
const { generateCode } = require("../utils/generate.util");

class ConditionService {
    conditions() {
        return new Promise(async (resolve, reject) => {
            try {
                const responsive = await db.Condition.findAll({
                    attributes: ["name", "codecondition", "id","active"],
                    order:[["id","ASC"]]
                });

                return resolve({
                    error: responsive ? 0 : 1,
                    message: responsive ? "Lấy dữ liệu thành công !" : "Lấy dữ liệu không thành công !",
                    data: responsive
                })

            } catch (error) {
                reject(error);
            }
        })
    }

    createCondition({ name }) {
        return new Promise(async (resolve, reject) => {
            try {

                const codecondition = generateCode(8);

                const responsive = await db.Condition.findOrCreate({
                    where: { codecondition },
                    defaults: {
                        codecondition,
                        name
                    }
                })

                return resolve({
                    error: responsive[1] ? 0 : 1,
                    message: responsive[1] ? "Create thành công !" : "Create không thành công !",
                })

            } catch (error) {
                reject(error);
            }
        })
    }

    deleteCondition(id) {
        return new Promise(async (resolve, reject) => {
            try {



                const responsive = await db.Condition.destroy({
                    where: { codecondition: id },
                })

                return resolve({
                    error: responsive ? 0 : 1,
                    message: responsive ? "Delete thành công !" : "Delete không thành công !",
                })

            } catch (error) {
                reject(error);
            }
        })
    }
}

module.exports = new ConditionService();