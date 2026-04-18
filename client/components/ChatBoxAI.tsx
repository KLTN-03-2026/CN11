'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Send } from "lucide-react";

type Message = {
  id: number;
  text: string;
  sender: "user" | "bot";
};

export default function ChatboxAI() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Xin chào 👋 Tôi có thể gợi ý món ăn hoặc hỗ trợ đặt bàn cho bạn!",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const getBotReply = (text: string): string => {
    const lower = text.toLowerCase();

    if (lower.includes("sushi")) {
      return "🍣 Salmon Sushi đang rất được yêu thích!";
    }

    if (lower.includes("đặt bàn")) {
      return "📅 Bạn có thể đặt bàn ngay tại nút 'Đặt bàn' nhé!";
    }

    return "✨ Bạn muốn mình gợi ý món ăn không?";
  };

  const handleSend = (): void => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now(),
      text: input,
      sender: "user",
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

  
    setTimeout(() => {
      const botMsg: Message = {
        id: Date.now() + 1,
        text: getBotReply(input),
        sender: "bot",
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <>
     
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-linear-to-br from-red-600 to-red-800 shadow-lg shadow-red-500/30 flex items-center justify-center"
      >
        <MessageCircle size={26} className="text-white" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60, scale: 0.9 }}
            className="fixed bottom-24 right-6 w-80 bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50"
          >
            
            <div className="px-4 py-3 text-sm font-medium bg-linear-to-r from-red-600 to-red-700">
              🤖 Trợ lý AI
            </div>

          
            <div className="h-80 overflow-y-auto p-4 space-y-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.sender === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`px-4 py-2 rounded-xl max-w-[70%] text-sm ${
                      msg.sender === "user"
                        ? "bg-linear-to-r from-red-600 to-red-700"
                        : "bg-white/10 text-gray-200"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

            
              {isTyping && (
                <div className="flex justify-start">
                  <div className="px-4 py-2 rounded-xl bg-white/10 text-sm text-gray-300 flex items-center gap-2">
                    <span>AI đang trả lời</span>
                    <span className="flex gap-1">
                      <span className="w-1 h-1 bg-white rounded-full animate-bounce" />
                      <span className="w-1 h-1 bg-white rounded-full animate-bounce delay-100" />
                      <span className="w-1 h-1 bg-white rounded-full animate-bounce delay-200" />
                    </span>
                  </div>
                </div>
              )}
            </div>

          
            <div className="flex items-center border-t border-white/10 bg-black/40">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSend();
                }}
                placeholder="Nhập tin nhắn..."
                className="flex-1 bg-transparent px-3 py-3 outline-none text-sm text-white"
              />

              <button
                onClick={handleSend}
                className="px-4 text-red-500 hover:text-red-400 transition"
              >
                <Send size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}