const initRouteVNPAY = require("./vnpay.route");
const initRouteEmail = require("./email.route");
const initRouteAuth = require("./auth.route");
const initRouteUser = require("./user.route");
const initRouteCount = require("./count.route");
const initRouteLog = require("./log.route");
const initRouteCategories = require("./categories.routes");
const initRouteFood = require("./food.route");
const initRouteCondition = require("./condition.route");
const initRouteVoucher = require("./voucher.route");
const initRouteBank = require("./bank.route");
const initRouteBell = require("./bell.route");
const initRouteOrder = require("./order.route");

const initRoute = (app) => {
    app.use("/api/email", initRouteEmail);
    app.use("/api/cate", initRouteCategories);
    app.use("/api/food", initRouteFood);
    app.use("/api/log", initRouteLog);
    app.use("/api/auth", initRouteAuth);
    app.use("/api/count", initRouteCount);
    app.use("/api/user", initRouteUser);
    app.use("/api/bank", initRouteBank);
    app.use("/api/bell", initRouteBell);
    app.use("/api/order", initRouteOrder);
    app.use("/api/vnpay", initRouteVNPAY);
    app.use("/api/voucher", initRouteVoucher);
    app.use("/api/condition", initRouteCondition);
    return app.use("/", (req, res) => {
        return res.status(401).json("Not found API !");
    })
}

module.exports = initRoute;