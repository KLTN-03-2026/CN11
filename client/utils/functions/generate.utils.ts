import { DataOrderChart, RevenueByDay } from "@/types/data";
import moment from "moment";
export const generateSendOTP = () => {
  const chars: string = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let otp: string = "";
  for (let i = 0; i < 4; i++) {
    otp += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return otp;
};

export const docSoTien = (n: number) => {
  if (n === 0) return "Không";
  const chuSo = [
    "",
    "một",
    "hai",
    "ba",
    "bốn",
    "năm",
    "sáu",
    "bảy",
    "tám",
    "chín",
  ];
  const donVi = ["", "nghìn", "triệu", "tỷ", "nghìn tỷ"];

  let s = n.toString();
  let ketQua = "";
  let len = s.length;
  while (len > 0) {
    const n3 = len % 3 === 0 ? 3 : len % 3;
    const t = parseInt(s.substring(0, n3));
    s = s.substring(n3);
    len = s.length;

    if (t > 0) {
      const tram = Math.floor(t / 100);
      const chuc = Math.floor((t % 100) / 10);
      const dvi = t % 10;

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
  return (
    ketQua.trim().charAt(0).toUpperCase() + ketQua.trim().slice(1) + " đồng."
  );
};

export const formatVND = (amount: number): string => {
  return amount.toLocaleString("vi-VN") + " đ";
};

export const parseVND = (value: string): number => {
  return Number(value.replace(/\./g, "").replace(/[^\d]/g, ""));
};

export const convertPriceToNumber = (price: string): number => {
  if (!price) return 0;

  const cleaned = price
    .replace(/\./g, "")
    .replace(/,/g, "")
    .replace(/[^\d]/g, "");

  return Number(cleaned);
};

export const getCurrentWeekRange = (): {
  startOfWeek: Date;
  endOfWeek: Date;
} => {
  const now = new Date();
  const day = now.getDay();

  const diffToMonday = day === 0 ? -6 : 1 - day;

  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() + diffToMonday);
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  return { startOfWeek, endOfWeek };
};

const formatDateKey = (date: Date): string => {
  return date.toLocaleDateString("en-CA");
};

export const groupOrdersByWeek = (orders: DataOrderChart[]): RevenueByDay[] => {
  const { startOfWeek, endOfWeek } = getCurrentWeekRange();

  // lọc order trong tuần hiện tại
  const filteredOrders = orders?.filter((order) => {
    const createdAt = new Date(order?.createdAt);
    return createdAt >= startOfWeek && createdAt <= endOfWeek;
  });

  // tạo map 7 ngày
  const resultMap = new Map<string, number>();

  for (let i = 0; i < 7; i++) {
    const d = new Date(startOfWeek);
    d.setDate(startOfWeek.getDate() + i);

    const key = d.toISOString().split("T")[0];
    resultMap.set(key, 0);
  }

  // cộng dồn
  filteredOrders.forEach((order) => {
    const key = formatDateKey(new Date(order?.createdAt));

    if (resultMap.has(key)) {
      const current = resultMap.get(key) ?? 0;
      resultMap.set(key, current + convertPriceToNumber(order?.total));
    }
  });

  // convert sang array (dùng cho chart)
  return Array.from(resultMap.entries()).map(([date, total]) => ({
    date: moment(date).format("dddd"),
    total,
  }));
};

export const formatCurrencyShort = (value: number): string => {
  if (value >= 1_000_000_000) {
    return (value / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + " tỷ";
  }

  if (value >= 1_000_000) {
    return (value / 1_000_000).toFixed(1).replace(/\.0$/, "") + "tr";
  }

  if (value >= 1_000) {
    return (value / 1_000).toFixed(1).replace(/\.0$/, "") + "k";
  }

  return value.toString();
};

export function isNumber(value: string): boolean {
  return !isNaN(Number(value));
}

export function toTimestamp(dateString: string): number {
  return new Date(dateString).getTime();
}
