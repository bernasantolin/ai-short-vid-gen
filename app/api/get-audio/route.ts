import { storage, FILE_PATH } from "@/configs/firebase-config";
import { uploadBytes, getDownloadURL } from "firebase/storage";
import textToSpeech  from "@google-cloud/text-to-speech";
import { NextResponse } from "next/server";
import { ref } from "firebase/storage";
import { Buffer } from "buffer";

const client = new textToSpeech.TextToSpeechClient({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY
});

enum Voice {
    ssmlGender = "FEMALE"
}
enum AudioEncoding {
    encoding = "MP3"
}

export async function POST(req: Request) {
    const { text, id } = await req.json();
    const storageRef = ref(storage, `${FILE_PATH}/${id}.mp3`)
    const request = {
        input: {
            text: text
        },
        // Select the language and SSML voice gender (optional)
        voice: { languageCode: 'en-US', ssmlGender: Voice.ssmlGender},
        // select the type of audio encoding
        audioConfig: {audioEncoding: AudioEncoding.encoding},
    }

    // Performs the text-to-speech request
    const [response] = await client.synthesizeSpeech(request);

    if (response?.audioContent instanceof Uint8Array) {
        const audioBuffer = Buffer.from(response.audioContent); // No encoding needed for Uint8Array
        await uploadBytes(
            ref(storage, `${FILE_PATH}/${id}.mp3`), 
            audioBuffer, 
            { contentType: 'audio/mp3' }
        )

        console.log("Audio buffer created successfully", audioBuffer);
    } else {
        console.error("audioContent is not a Uint8Array or is undefined");
    }

    const downloadURL =  await getDownloadURL(storageRef);
    
    // Write the binary audio content to a local file
    // const writeFile = util.promisify(fs.writeFile);
    // await writeFile('output.mp3', response?.audioContent ?? "", 'binary');

    console.log('Audio content written to file: output.mp3');
    return NextResponse.json({
        message: "Success",
        data:{
            downloadURL
        }
    });
}