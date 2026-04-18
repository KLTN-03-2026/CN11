'use client';

import { FC } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Mail } from "lucide-react";

type SendingEmailModalProps = {
    open: boolean;
};

const dotVariants: Variants = {
    animate: {
        y: [0, -6, 0],
        transition: {
            duration: 0.6,
            repeat: Infinity,
            ease: "easeInOut",
        },
    },
};

const SendingEmailModal: FC<SendingEmailModalProps> = ({ open }) => {
    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="bg-white rounded-2xl shadow-2xl px-8 py-6 flex flex-col items-center gap-4"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    >
                       
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="text-blue-500"
                        >
                            <Mail size={40} />
                        </motion.div>

                        
                        <motion.div
                            className="w-10 h-10 border-4 border-blue-200 border-t-blue-500 rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        />

                        
                        <div className="text-lg font-semibold text-gray-700 flex items-center gap-1">
                            Đang gửi email
                            <div className="flex gap-1 ml-1">
                                <motion.span variants={dotVariants} animate="animate">.</motion.span>
                                <motion.span variants={dotVariants} animate="animate" transition={{ delay: 0.2 }}>.</motion.span>
                                <motion.span variants={dotVariants} animate="animate" transition={{ delay: 0.4 }}>.</motion.span>
                            </div>
                        </div>

                       
                        <p className="text-sm text-gray-500 text-center">
                            Vui lòng chờ trong giây lát
                        </p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SendingEmailModal;