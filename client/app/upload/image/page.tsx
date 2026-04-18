'use client';

import { ChangeEvent, FC, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { UploadCloud, Image as ImageIcon, Link as LinkIcon } from "lucide-react";

type UploadResponse = {
    url: string;
};

const UploadImagePage: FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [uploadedUrl, setUploadedUrl] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

   
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files?.[0] ?? null;

        if (selected) {
            setFile(selected);
            setPreview(URL.createObjectURL(selected));
            setUploadedUrl("");
        }
    };

   
    const handleUpload = async () => {
        if (!file) return;

        setLoading(true);

        try {
            const imageFile = file;
            const formData = new FormData();

            if (imageFile) {
                formData.append('file', imageFile);
            }
            formData.append('upload_preset', 'images_preset');
            formData.append('cloud_name', 'dhb5ubvvy');

            const fectUi = await fetch("https://api.cloudinary.com/v1_1/dhb5ubvvy/image/upload", {
                method: "post",
                body: formData
            });
            const imageServer = await fectUi.json();

            setUploadedUrl(imageServer?.secure_url);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-200 flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-3xl bg-white rounded-3xl shadow-xl p-6 space-y-6"
            >
               
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">
                        Upload ảnh lên Cloud
                    </h1>
                    <p className="text-sm text-gray-500">
                        Chọn ảnh từ máy và tạo link public
                    </p>
                </div>

              \
                <label className="cursor-pointer">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                    />

                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="border-2 border-dashed border-gray-300 rounded-2xl p-8 flex flex-col items-center justify-center text-gray-500 hover:border-blue-400 transition"
                    >
                        <UploadCloud size={40} />
                        <p className="mt-2 text-sm">Click để chọn ảnh</p>
                    </motion.div>
                </label>

                
                {preview && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-2"
                    >
                        <p className="text-sm text-gray-600 flex items-center gap-2">
                            <ImageIcon size={16} /> Ảnh preview
                        </p>

                        <div className="relative w-full h-64 rounded-xl overflow-hidden border">
                            <Image src={preview} alt="preview" fill className="object-cover" />
                        </div>
                    </motion.div>
                )}

             
                <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={handleUpload}
                    disabled={!file || loading}
                    className="w-full py-3 rounded-xl mt-6 bg-blue-600 text-white font-medium hover:bg-blue-700 transition disabled:opacity-50"
                >
                    {loading ? "Đang upload..." : "Tạo link ảnh"}
                </motion.button>

               
                {uploadedUrl && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                    >
                       
                        <div>
                            <p className="text-sm text-gray-600 flex items-center gap-2 mb-1">
                                <LinkIcon size={16} /> Link ảnh
                            </p>

                            <input
                                value={uploadedUrl}
                                readOnly
                                className="w-full px-3 py-2 border rounded-lg text-sm bg-gray-50"
                            />
                        </div>

                     
                        <div>
                            <p className="text-sm text-gray-600 mb-2">
                                Preview từ Cloudinary
                            </p>

                            <div className="relative w-full h-64 rounded-xl overflow-hidden border">
                                <Image
                                    src={uploadedUrl}
                                    alt="cloud"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
};

export default UploadImagePage;