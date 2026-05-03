
const vnpConfig = require("../config/VNPAY.config");
const { createSecureHash } = require("../utils/vnpay.util");
const crypto = require("crypto");
const qs = require("qs");
const moment = require("moment");

function sortObject(obj) {
    const sorted = {};
    const keys = Object.keys(obj).sort();

    keys.forEach((key) => {
        sorted[key] = obj[key];
    });

    return sorted;
}

exports.createPayment = async (req, res) => {
    try {
        const { orderId, amount, items } = req.body

        // // 1️⃣ Lưu order
        // await db.execute(
        //   "INSERT INTO orders (order_id, amount, status) VALUES (?, ?, ?)",
        //   [orderId, amount, "PENDING"]
        // )

        // for (const item of items) {
        //   await db.execute(
        //     "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)",
        //     [orderId, item.productId, item.quantity, item.price]
        //   )
        // }

        // 2️⃣ Tạo thời gian
        const date = new Date()

        const createDate =
            date.getFullYear().toString() +
            String(date.getMonth() + 1).padStart(2, "0") +
            String(date.getDate()).padStart(2, "0") +
            String(date.getHours()).padStart(2, "0") +
            String(date.getMinutes()).padStart(2, "0") +
            String(date.getSeconds()).padStart(2, "0")

        const vnpParams = {
            vnp_Version: "2.1.0",
            vnp_Command: "pay",
            vnp_TmnCode: vnpConfig.tmnCode,
            vnp_Locale: "vn",
            vnp_CurrCode: "VND",
            vnp_TxnRef: orderId,
            vnp_OrderInfo: `Thanh_toan_don_hang_${orderId}`,
            vnp_OrderType: "other",
            vnp_Amount: (+amount * 100).toString(),
            vnp_ReturnUrl: vnpConfig.returnUrl,
            vnp_IpAddr: req.ip || "127.0.0.1",
            vnp_CreateDate: createDate
        }

        const sortedParams = sortObject(vnpParams)

        const signData = new URLSearchParams(sortedParams).toString()

        const secureHash = createSecureHash(
            signData,
            vnpConfig.secretKey
        )

        const paymentUrl =
            `${vnpConfig.vnpUrl}?${signData}&vnp_SecureHash=${secureHash}`

        // res.json({ paymentUrl })

        console.log(paymentUrl)

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Server error" })
    }


}


// exports.createPayment = (req, res) => {
//     const ipAddr = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

//     const tmnCode = vnpConfig.tmnCode;
//     const secretKey = vnpConfig.secretKey;
//     const vnpUrl = vnpConfig.vnpUrl;
//     const returnUrl = vnpConfig.returnUrl;

//     const date = new Date();

//     const createDate = moment(date).format("YYYYMMDDHHmmss");
//     const orderId = moment(date).format("HHmmss");

//     const amount = req.body.amount * 100;

//     let vnp_Params = {
//         vnp_Version: "2.1.0",
//         vnp_Command: "pay",
//         vnp_TmnCode: tmnCode,
//         vnp_Locale: "vn",
//         vnp_CurrCode: "VND",
//         vnp_TxnRef: orderId,
//         vnp_OrderInfo: "Thanh toán đơn hàng",
//         vnp_OrderType: "other",
//         vnp_Amount: amount,
//         vnp_ReturnUrl: returnUrl,
//         vnp_IpAddr: ipAddr,
//         vnp_CreateDate: createDate,
//     };

//     vnp_Params = sortObject(vnp_Params);

//     const signData = qs.stringify(vnp_Params, { encode: false });

//     const hmac = crypto.createHmac("sha512", secretKey);
//     const signed = hmac.update(signData).digest("hex");

//     vnp_Params["vnp_SecureHash"] = signed;

//     const paymentUrl =
//         vnpUrl + "?" + qs.stringify(vnp_Params, { encode: false });

//     res.json({ paymentUrl });
// };

