import { NextResponse } from "next/server";
import axios from "axios";
import { uploadString, getDownloadURL, ref } from "firebase/storage";
import { storage } from '@/configs/firebase-config';

export async function POST(req: Request){
    const { prompt } = await req.json();

    // Image details
    const width = 1024;
    const height = 1280;

    try {
        const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=${width}&height=${height}&nologo=true`;
        const image = await axios.get(imageUrl, { responseType:"arraybuffer" });
        const base64image = "data:image/jpeg;base64,"+Buffer.from(image.data).toString("base64");
        const fileName = 'short-image-files/'+Date.now()+".jpg";
        const storageRef = ref(storage, fileName);

        await uploadString(storageRef, base64image, 'data_url');
        const downloadUrl = await getDownloadURL(storageRef);

        return NextResponse.json({
            result: downloadUrl
        });
    } catch(e) {
        return NextResponse.json({
            error: e
        })
    }
} 