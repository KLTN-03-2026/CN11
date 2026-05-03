const db = require("../models");

class CookServices {
    cooksWaites() {
        return new Promise(async (reslove, reject) => {
            try {
                const responsive1 = await db.FoodWrong.findAll({
                    where: { status: "pending" }
                })

                const responsive2 = await db.FoodWrong.findAll({
                    where: { status: "done" }
                })

                const responsive3 = await db.FoodWrong.findAll({
                    where: { status: "cook" }
                })

                return reslove({
                    error: responsive ? 0 : 1,
                    message: responsive ? "Get data success !" : "Get data faily !",
                    data: {
                        pending: responsive1,
                        done: responsive2,
                        cook: responsive3
                    }
                })
            } catch (error) {
                reject(error);
            }
        })
    }

    updateFoodStatus({ status, codefood }) {
        return new Promise(async (reslove, reject) => {
            try {
                const responsive = await db.FoodWrong.update({
                    status: status
                }, {
                    where: { codefood: codefood }
                })

                const responsive1 = await db.FoodWrong.findAll({
                    where: { status: "pending" }
                })

                const responsive2 = await db.FoodWrong.findAll({
                    where: { status: "done" }
                })

                const responsive3 = await db.FoodWrong.findAll({
                    where: { status: "cook" }
                })

                return reslove({
                    error: responsive ? 0 : 1,
                    message: responsive ? "Update data success !" : "Update data faily !",
                    data: {
                        pending: responsive1,
                        done: responsive2,
                        cook: responsive3
                    }
                })
            } catch (error) {
                reject(error);
            }
        })
    }

}

module.exports = new CookServices();