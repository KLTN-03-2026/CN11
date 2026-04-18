
const vnpConfig = require("../config/VNPAY.config");
const { sortObject, createSecureHash } = require("../utils/vnpay.util");

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