const db = require("../models");

class UserService {
    addContactServices({ name, email, des }) {
        return new Promise(async (relsove, reject) => {
            try {
                const responsive = await db.ContactAdmin.create({
                    name,
                    email,
                    des
                })
                return relsove({
                    error: responsive ? 0 : 1,
                    message: responsive ? "Tạo liên hệ thành công !" : "Tạo liên hệ không thành công !."
                })
            } catch (error) {
                reject(error);
            }
        })
    }

    getsContactServices() {
        return new Promise(async (relsove, reject) => {
            try {
                const responsive = await db.ContactAdmin.findAll();
                return relsove({
                    error: responsive ? 0 : 1,
                    message: responsive ? "Lấy tất cả liên hệ thành công !" : "Lấy tất cả liên hệ không thành công !.",
                    data: responsive
                })
            } catch (error) {
                reject(error);
            }
        })
    }

    deleteContactServices(id) {
        return new Promise(async (relsove, reject) => {
            try {
                const responsive = await db.ContactAdmin.destroy({
                    where: { id }
                });

                const data = responsive ? await db.ContactAdmin.findAll() : [];
                return relsove({
                    error: responsive ? 0 : 1,
                    message: responsive ? "Xoá liên hệ thành công !" : "Xoá liên hệ không thành công !.",
                    data: data
                })
            } catch (error) {
                reject(error);
            }
        })
    }

    deletesContactServices() {
        return new Promise(async (relsove, reject) => {
            try {
                const responsive = await db.ContactAdmin.truncate()
                return relsove({
                    error: responsive,
                    message: responsive !== 0 ? "Xoá tất cả liên hệ thành công !" : "Xoá tất cả liên hệ không thành công !.",

                })
            } catch (error) {
                reject(error);
            }
        })
    }

    updateAccount({ username, email, phone, address }, id) {
        return new Promise(async (relsove, reject) => {
            try {

                let objUpdate = { username, phone }
                if (email) {
                    objUpdate.email = email
                }
                if (address) {
                    objUpdate.address = address
                }

                const responsive = await db.User.update(objUpdate, { where: { codeuser: id } })


                return relsove({
                    error: responsive ? 0 : 1,
                    message: responsive ? "Cập nhật thành công !" : "Cập nhật không thành công !."
                })
            } catch (error) {
                reject(error);
            }
        })
    }

    updateVerify({ isVerify }, id) {
        return new Promise(async (relsove, reject) => {
            try {



                const responsive = await db.User.update({ isVerify: isVerify }, { where: { codeuser: id } })


                return relsove({
                    error: responsive ? 0 : 1,
                    message: responsive ? "Cập nhật thành công !" : "Cập nhật không thành công !."
                })
            } catch (error) {
                reject(error);
            }
        })
    }

    updateAvatar({ image }, id) {
        return new Promise(async (relsove, reject) => {
            try {
                const responsive = await db.AvatarLink.update({ avatarlink: image }, { where: { codeuser: id } })
                return relsove({
                    error: responsive ? 0 : 1,
                    message: responsive ? "Cập nhật thành công !" : "Cập nhật không thành công !."
                })
            } catch (error) {
                reject(error);
            }
        })
    }

    getUsers() {
        return new Promise(async (relsove, reject) => {
            try {
                const responsive = await db.User.findAll({
                    attributes: {
                        exclude: ["password", "rolecode"]
                    },
                    include: [
                        { model: db.Role, as: "role", attributes: ["code", "value"] }
                    ]
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


    

    setRole({ role }, userId) {
        return new Promise(async (relsove, reject) => {
            try {

                const roleUpdate = role === "Admin" ? "R1" : role === "Chef" ? "R2" : role === "Customer" ? "R3" : "R4";

                const responsive = await db.User.update({
                    rolecode: roleUpdate
                }, { where: { codeuser: userId } })

                responsive && await db.Log.create({
                    codeuser: userId,
                    active: `Admin cập nhật Role tài khoản SmartDine cho `,
                    role: roleUpdate ? roleUpdate : "R3",
                    name: ""
                })

                return relsove({
                    error: responsive ? 0 : 1,
                    message: responsive ? "Cập nhật thành công !" : "Cập nhật không thành công !"
                })
            } catch (error) {
                reject(error);
            }
        })
    }
}

module.exports = new UserService();