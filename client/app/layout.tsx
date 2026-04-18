import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/app/context/CartContext";
import ChatboxAI from "@/components/ChatBoxAI";
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import { ProviderStore } from "@/config/ProviderStore";

export const metadata: Metadata = {
  title: "SmartDine - Nhà hàng Trung Kiên",
  description: "This website created by Nguyễn Trung Kiên",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProviderStore>
      <CartProvider>
        <html lang="en">
          <body
          >
            {children}
            <ChatboxAI />
          </body>
        </html>
      </CartProvider>
    </ProviderStore>
  );
}
