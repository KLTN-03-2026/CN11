'use client';

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import QRCode from "react-qr-code";
import { FloorType, DataTableType } from "@/types/data";





export default function QRTableManagement() {

  const [floorData, setFloorData] = useState<FloorType[]>([]);
  const [codefloor, setCodeFloor] = useState<string>("F01");
  const [tablesData, setTablesData] = useState<DataTableType[]>([]);


  useEffect(() => {
    const callAPICount = async () => {
      const floorsAPI = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/log/floors`,
        { method: "GET" }
      )
      const dataFloors = await floorsAPI?.json();
      if (dataFloors?.error === 0) {
        setFloorData(dataFloors?.data);
      }
    }
    callAPICount();
  }, [])


  useEffect(() => {
    const callAPICount = async () => {
      const tablesAPI = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/log/floors-table/${codefloor}`,
        { method: "GET" }
      )
      const dataTables = await tablesAPI?.json();
      if (dataTables?.error === 0) {
        const urlData = dataTables?.data?.map((table: DataTableType) => ({
             ...table,
              url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/order/${table?.codetable}`
        }));
        
        setTablesData(urlData);

      } else {
        setTablesData([]);
      }

    }

    callAPICount();
  }, [codefloor])

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6 space-y-6">


      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">🔳 Quản lý QR Bàn</h1>

        <button
          onClick={printAllQR}
          className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
        >
          🖨️ In tất cả QR
        </button>
      </div>


      <div className="flex items-center gap-3">
        <span className="text-gray-400">Chọn tầng:</span>

        <select
          value={codefloor}
          onChange={(e) => {
            setCodeFloor(e.target.value);
          }}
          className="bg-[#111] outline-none cursor-pointer border border-white/10 px-3 py-2 rounded"
        >
          {floorData?.map((f) => (
            <option key={f?.id} defaultChecked={f?.codefloor === "F01" ? true : false} value={f?.codefloor}>
              {f?.name}
            </option>
          ))}
        </select>
      </div>


      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

        {tablesData?.map((table) => (
          <motion.div
            key={table.id}
            whileHover={{ scale: 1.05 }}
            className="bg-[#111] border border-white/10 rounded-2xl p-4 text-center space-y-3"
          >
            <h3 className="font-semibold">{table?.name}</h3>


            <div className="bg-white p-2 rounded">
              <QRCode value={table?.url} size={120} />
            </div>


            <p className="text-xs text-gray-400 truncate">
              {process.env.NEXT_PUBLIC_CLIENT_URL}/order/{table?.codetable}
            </p>


            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => copyLink(`${process.env.NEXT_PUBLIC_CLIENT_URL}/order/${table?.codetable}`)}
                className="bg-blue-600 py-1 rounded text-sm hover:bg-blue-700"
              >
                Copy
              </button>

              <button
                onClick={() => downloadQR(table.id, `${process.env.NEXT_PUBLIC_CLIENT_URL}/order/${table?.codetable}`)}
                className="bg-purple-600 py-1 rounded text-sm hover:bg-purple-700"
              >
                Tải
              </button>

              <button
                onClick={() => printSingleQR(table)}
                className="col-span-2 bg-yellow-500 py-1 rounded text-sm hover:bg-yellow-600"
              >
                🖨️ In QR
              </button>
            </div>
          </motion.div>
        ))}

      </div>
    </div>
  );
}

function copyLink(url: string) {
  navigator.clipboard.writeText(url);
  alert("Đã copy link!");
}


function downloadQR(id: number, url: string) {
  const link = document.createElement("a");
  link.href = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${url}`;
  link.download = `qr-ban-${id}.png`;
  link.click();
}


function printSingleQR(table: DataTableType) {
  const printWindow = window.open("", "_blank");
  if (!printWindow) return;

  printWindow.document.write(`
    <html>
      <head>
        <title>${table?.name}</title>
        <style>
          body {
            display:flex;
            justify-content:center;
            align-items:center;
            height:100vh;
            font-family:sans-serif;
          }
          .box {
            text-align:center;
            border:1px solid #000;
            padding:20px;
            border-radius:10px;
          }
          img {
            width:200px;
          }
        </style>
      </head>
      <body>
        <div class="box">
          <h2>${table?.name}</h2>
          <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${process.env.NEXT_PUBLIC_CLIENT_URL}/order/${table?.codetable}" />
          <p>Quét để gọi món</p>
        </div>
      </body>
    </html>
  `);

  printWindow.document.close();
  printWindow.print();
}


function printAllQR() {
  const printWindow = window.open("", "_blank");
  if (!printWindow) return;

  let html = `
    <html>
      <head>
        <title>QR Tất Cả</title>
        <style>
          body {
            font-family: sans-serif;
          }
          .grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
          }
          .item {
            border:1px solid #000;
            text-align:center;
            padding:10px;
            border-radius:10px;
          }
          img {
            width:120px;
            height:120px;
          }
        </style>
      </head>
      <body>
        <div class="grid">
  `;

  for (let i = 1; i <= 24; i++) {
    html += `
      <div class="item">
        <h4>Bàn ${i}</h4>
        <img src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${process.env.NEXT_PUBLIC_CLIENT_URL}/order/${i}" />
        <p>Scan để gọi món</p>
      </div>
    `;
  }

  html += `
        </div>
      </body>
    </html>
  `;

  printWindow.document.write(html);
  printWindow.document.close();
  printWindow.print();
}