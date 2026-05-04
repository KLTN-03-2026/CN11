// const crypto = require("crypto");

// function sortObject(obj) {
//     return Object.keys(obj)
//         .sort()
//         .reduce((result, key) => {
//             result[key] = obj[key];
//             return result;
//         }, {});
// }

// // ❗ RAW (không encode) → dùng để ký
// function buildRawQuery(data) {
//     return Object.keys(data)
//         .map((key) => `${key}=${data[key]}`)
//         .join("&");
// }

// // ✅ ENCODE → dùng để tạo URL
// function buildEncodedQuery(data) {
//     return Object.keys(data)
//         .map((key) => {
//             return (
//                 encodeURIComponent(key) +
//                 "=" +
//                 encodeURIComponent(data[key]).replace(/%20/g, "+")
//             );
//         })
//         .join("&");
// }

// exports.createPayment = (req, res) => {
//     const tmnCode = "JO395YGB";
//     const secretKey = "I2XIGNES0U72BFISWXF2RFK2MN2WWUZQ";

//     const vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
//     const returnUrl = "http://localhost:3000/checkout/success";

//     const date = new Date();

//     const createDate =
//         date.getFullYear().toString() +
//         String(date.getMonth() + 1).padStart(2, "0") +
//         String(date.getDate()).padStart(2, "0") +
//         String(date.getHours()).padStart(2, "0") +
//         String(date.getMinutes()).padStart(2, "0") +
//         String(date.getSeconds()).padStart(2, "0");

//     const orderId = createDate;
//     const amount = (Number(req.body.amount) * 100).toString();

//     let vnp_Params = {
//         vnp_Version: "2.1.0",
//         vnp_Command: "pay",
//         vnp_TmnCode: tmnCode,
//         vnp_Amount: amount,
//         vnp_CurrCode: "VND",
//         vnp_TxnRef: orderId,
//         vnp_OrderInfo: "Thanh_toan_don_hang",
//         vnp_OrderType: "other",
//         vnp_Locale: "vn",
//         vnp_ReturnUrl: returnUrl,
//         vnp_IpAddr: "127.0.0.1",
//         vnp_CreateDate: createDate,
//     };

//     // 🔥 sort trước khi ký
//     vnp_Params = sortObject(vnp_Params);

//     // ❗ ký bằng RAW (KHÔNG encode)
//     const signData = buildRawQuery(vnp_Params);

//     const signed = crypto
//         .createHmac("sha512", secretKey)
//         .update(signData)
//         .digest("hex");

//     // 🔥 thêm 2 param bắt buộc
//     vnp_Params.vnp_SecureHashType = "SHA512";
//     vnp_Params.vnp_SecureHash = signed;

//     // ✅ build URL (ENCODE)
//     const paymentUrl =
//         vnpUrl + "?" + buildEncodedQuery(vnp_Params);

//     console.log("SIGN DATA:", signData);
//     console.log("HASH:", signed);
//     console.log("URL:", paymentUrl);

//     res.json({ paymentUrl });
// };

const vnpConfig = require("../config/VNPAY.config");
const { sortObject, createSecureHash } = require("../utils/vnpay.util");

exports.createPayment = async (req, res) => {
    try {
        const { orderId, amount } = req.body

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
            vnp_Amount: (amount * 100).toString(),
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

        res.json({ paymentUrl })

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Server error" })
    }
}


