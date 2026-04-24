const db = require("../models");
const jwt = require("jsonwebtoken");
const { generateCode } = require("../utils/generate.util");
const { hashPass, checkPass } = require("../utils/validate.util");
require("dotenv").config();

class AuthServices {
    register({ username, phone, password, role }) {
        return new Promise(async (reslove, reject) => {
            try {

                const userId = generateCode(8);

                const responsive = await db.User.findOrCreate({
                    where: { phone },
                    defaults: {
                        phone,
                        password: hashPass(password),
                        username,
                        codeuser: userId,
                        rolecode: role ? role : "R3"
                    }
                })

                responsive[1] && await db.ScoreUser.findOrCreate({
                    where: { codeuser: userId },
                    defaults: {
                        codeuser: userId,
                        score: "0"
                    }
                })

                responsive[1] && await db.AvatarLink.findOrCreate({
                    where: { codeuser: userId },
                    defaults: {
                        codeuser: userId,
                        avatarlink: ""
                    }
                })

                responsive[1] && await db.Log.create({
                    codeuser: userId,
                    active: role ? `Admin tạo tài khoản SmartDine cho ` : "Đăng ký tài khoản SmartDine.",
                    role: role ? role : "R3",
                    name: username
                })

                return reslove({
                    error: responsive[1] ? 0 : 1,
                    message: responsive[1] ? "Đăng ký tài khoản SmartDine thành công. Cảm ơn quý khách hàng !" : "Đăng ký không thành công."
                })
            } catch (error) {
                reject(error);
            }
        })
    }

    login({ phone, password }) {
        return new Promise(async (reslove, reject) => {
            try {

                const responsive = await db.User.findOne({
                    where: { phone },
                    raw: true,

                })

                const isPassValid = responsive && checkPass(password, responsive?.password);
                const token = isPassValid ? jwt.sign({ id: responsive?.id, phone: responsive?.phone, codeuser: responsive?.codeuser }, process.env.JWT_SECRET, { expiresIn: '2d' }) : null;

                return reslove({
                    error: token ? 0 : 1,
                    message: token ? "Đăng nhập tài khoản SmartDine thành công." : responsive ? "Sai mật khẩu !" : "Tài khoản chưa được đăng ký !",
                    access_token: token,
                    role: token ? responsive?.rolecode : null
                })

            } catch (error) {
                reject(error);
            }
        })
    }

    updatePass({ email, password }) {
        return new Promise(async (reslove, reject) => {
            try {

                const responsive = await db.User.findOne({
                    where: { email },
                    raw: true
                })

                responsive && await db.User.update({
                    password: hashPass(password)
                }, { where: { email } })



                return reslove({
                    error: responsive ? 0 : 1,
                    message: responsive ? "Mật khẩu tài khoản SmartDine của bạn cập nhật thành công." : "Email chưa được đăng ký !",
                })

            } catch (error) {
                reject(error);
            }
        })
    }

    updateEmail({ email, phone }) {
        return new Promise(async (reslove, reject) => {
            try {

                const responsive = await db.User.findOne({
                    where: { phone },
                    raw: true
                })

                responsive && await db.User.update({
                    email
                }, { where: { phone } })


                return reslove({
                    error: responsive ? 0 : 1,
                    message: responsive ? "Email tài khoản SmartDine của bạn cập nhật thành công." : "Số điện thoại chưa được đăng ký !",
                })

            } catch (error) {
                reject(error);
            }
        })
    }

    updateAvatar({ codeuser, image }) {
        return new Promise(async (reslove, reject) => {
            try {



                const responsive = await db.AvatarLink.update({
                    avatarlink: image
                }, { where: { codeuser } })


                return reslove({
                    error: responsive ? 0 : 1,
                    message: responsive ? "Avatar tài khoản SmartDine của bạn cập nhật thành công." : "Avatar chưa được tạo lập !",
                })

            } catch (error) {
                reject(error);
            }
        })
    }

    getUser(codeuser) {
        return new Promise(async (reslove, reject) => {
            try {
                const responsive = await db.User.findOne({
                    where: { codeuser },
                    raw: true,
                    attributes: {
                        exclude: ["password", "rolecode"]
                    },
                    include: [
                        { model: db.Role, as: "role", attributes: ["value", "code"] },
                        { model: db.AvatarLink, as: "avatar", attributes: ["avatarlink"] },
                    ],
                    nest: true
                })


                return reslove({
                    error: responsive ? 0 : 1,
                    message: responsive ? "Lấy tài khoản thành công." : "Lấy tài khoản không thành công !",
                    data: responsive
                })

            } catch (error) {
                reject(error);
            }
        })
    }

    getUserToRoleCode(rolecode) {
        return new Promise(async (reslove, reject) => {
            try {
                const responsive = await db.User.findAll({
                    where: { rolecode },
                    raw: true,
                    attributes: ["codeuser", "username", "phone"]
                })
                return reslove({
                    error: responsive ? 0 : 1,
                    message: responsive ? "Lấy tài khoản thành công." : "Lấy tài khoản không thành công !",
                    data: responsive
                })

            } catch (error) {
                reject(error);
            }
        })
    }

    // createUserRecieveBell(codeuser) {
    //     return new Promise(async (reslove, reject) => {
    //         try {
    //             const responsive = await db.UserReceive.create()
    //             return reslove({
    //                 error: responsive ? 0 : 1,
    //                 message: responsive ? "Tạo người nhận thông báo thành công." : "Tạo người nhận thông báo không thành công !",
    //             })

    //         } catch (error) {
    //             reject(error);
    //         }
    //     })
    // }

    getRoles() {
        return new Promise(async (reslove, reject) => {
            try {
                const responsive = await db.Role.findAll({
                    raw: true,
                    attributes: ["value", "code"]
                });

                return reslove({
                    error: responsive ? 0 : 1,
                    message: responsive ? "Lấy vai trò thành công." : "Lấy vai trò không thành công !",
                    data: responsive
                });

            } catch (error) {
                reject(error);
            }
        })
    }

    getNoteWaiters() {
        return new Promise(async (reslove, reject) => {
            try {
                const responsive = await db.NoteWaiter.findAll({
                    raw: true,
                    order: [["createdAt", "DESC"]],
                    include: [
                        { model: db.User, as: "user", attributes: ["username"] },
                        { model: db.Table, as: "table", attributes: ["name"] },
                        { model: db.HourService, as: "hourService", attributes: ["hour"] },
                    ],
                    nest: true
                });

                return reslove({
                    error: responsive ? 0 : 1,
                    message: responsive ? "Lấy ghi chú phục vụ thành công." : "Lấy ghi chú phục vụ không thành công !",
                    data: responsive
                });

            } catch (error) {
                reject(error);
            }
        })
    }

    createNoteWaiter({ codeuser, codetable, codehour, des, date = "Có lịch trực" }) {
        return new Promise(async (reslove, reject) => {
            try {
                const responsive = await db.NoteWaiter.create({
                    codeuser,
                    codetable,
                    codehour,
                    des,
                    date,
                    codenote: generateCode(12)
                });

                const dataNotes = await db.NoteWaiter.findAll({
                    raw: true,
                    order: [["createdAt", "DESC"]],
                    include: [
                        { model: db.User, as: "user", attributes: ["username"] },
                        { model: db.Table, as: "table", attributes: ["name"] },
                        { model: db.HourService, as: "hourService", attributes: ["hour"] },
                    ],
                    nest: true
                });

                return reslove({
                    error: responsive ? 0 : 1,
                    message: responsive ? "Tạo ghi chú phục vụ thành công." : "Tạo ghi chú phục vụ không thành công !",
                    data: dataNotes
                });

            } catch (error) {
                reject(error);
            }
        })
    }

}

module.exports = new AuthServices();