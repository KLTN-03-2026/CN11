'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useState } from "react"

export default function Register() {
    const [image, setImage] = useState<File>();
    const [imageServer, setImageServer] = useState("");

    const handdleSubmit = async () => {
        const imageFile = image;
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
        console.log(imageServer?.secure_url)
        setImageServer(imageServer?.secure_url)

    }

    return <div>
        <Input type="file" onChange={e => {
            const files = e.target.files;
            if (files && files[0]) {
                setImage(files[0]);
            }
        }} />
        <Button onClick={handdleSubmit}>Add</Button>
        {imageServer && <Image src={imageServer} width={300} height={300} alt="logo" />}
    </div>
}