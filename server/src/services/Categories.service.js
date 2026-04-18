const db = require("../models");
const { generateCode } = require("../utils/generate.util");

class CategoriesService {
    createCategories({ name, des, active }) {
        return new Promise(async (resolve, reject) => {
            try {

                const categoriesId = generateCode(8);

                const responsive = await db.Categories.findOrCreate({
                    where: { name },
                    defaults: {
                        name,
                        des,
                        active: active ? active : true,
                        codecategories: categoriesId
                    }
                })

                const dataAll = await db.Categories.findAll({
                    attributes: {
                        exclude: ["createdAt", "updatedAt"]
                    }
                })

                return resolve({
                    error: responsive[1] ? 0 : 1,
                    message: responsive[1] ? "Tạo danh mục thành công !" : "Tạo danh mục không thành công !",
                    data: dataAll
                })
            } catch (error) {
                reject(error);
            }
        })
    }

    getCategories() {
        return new Promise(async (resolve, reject) => {
            try {
                const responsive = await db.Categories.findAll({
                    attributes: {
                        exclude: ["createdAt", "updatedAt"]
                    }
                })

                return resolve({
                    error: responsive ? 0 : 1,
                    message: responsive ? "Lấy danh mục thành công !" : "Lấy danh mục không thành công !",
                    data: responsive
                })
            } catch (error) {
                reject(error);
            }
        })
    }

    deleteCategories(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const responsive = await db.Categories.destroy({
                    where: { codecategories: id }
                })

                return resolve({
                    error: responsive ? 0 : 1,
                    message: responsive ? "Xoá danh mục thành công !" : "Xoá danh mục không thành công !",
                })
            } catch (error) {
                reject(error);
            }
        })
    }
}

module.exports = new CategoriesService();