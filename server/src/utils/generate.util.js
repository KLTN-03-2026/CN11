const generateCode = (value) => {
    let str = "";
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    for (let i = 0; i < value; i++) {
        str += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return str;
}

function writeNumberVND(n) {
    if (n === 0) return "Không";
    const chuSo = ["", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín"];
    const donVi = ["", "nghìn", "triệu", "tỷ", "nghìn tỷ"];

    let s = n.toString();
    let ketQua = "";
    let len = s.length;
    let nhom = 0;

    while (len > 0) {
        let n3 = len % 3 === 0 ? 3 : len % 3;
        let t = parseInt(s.substring(0, n3));
        s = s.substring(n3);
        len = s.length;

        if (t > 0) {
            let tram = Math.floor(t / 100);
            let chuc = Math.floor((t % 100) / 10);
            let dvi = t % 10;

            if (tram > 0) ketQua += chuSo[tram] + " trăm ";
            if (chuc > 1) {
                ketQua += chuSo[chuc] + " mươi ";
                if (dvi === 1) ketQua += "mốt ";
                else if (dvi === 5) ketQua += "năm ";
                else if (dvi > 0) ketQua += chuSo[dvi] + " ";
            } else if (chuc === 1) {
                ketQua += "mười ";
                if (dvi === 5) ketQua += "lăm ";
                else if (dvi > 0) ketQua += chuSo[dvi] + " ";
            } else if (dvi > 0) {
                if (tram > 0) ketQua += "linh ";
                ketQua += chuSo[dvi] + " ";
            }
            ketQua += donVi[Math.floor(len / 3)] + " ";
        }
        if (len > 0 && t > 0) ketQua = ketQua.trim() + " ";
    }
    return ketQua.trim().charAt(0).toUpperCase() + ketQua.trim().slice(1) + " đồng.";
}

const formatVND = (amount) => {
    return amount.toLocaleString("vi-VN") + " đ";
};

const parseVND = (value) => {
    return Number(value.replace(/\./g, "").replace(/[^\d]/g, ""));
};

const convertPriceToNumber = (price) => {
    if (!price) return 0;

    const cleaned = price
        .replace(/\./g, "")
        .replace(/,/g, "")
        .replace(/[^\d]/g, "");

    return Number(cleaned);
};

module.exports = { generateCode, writeNumberVND, formatVND, parseVND, convertPriceToNumber };