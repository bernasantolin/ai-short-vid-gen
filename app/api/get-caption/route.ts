
import { AssemblyAI } from "assemblyai"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        const { audioFileUrl } = await req.json();

        const client = new AssemblyAI({
            apiKey: "3b7483efbee9468393f3da95d719a847"
        });
    
        const transcript = await client.transcripts.transcribe({
            audio: audioFileUrl,
            speaker_labels: true
        });

        return NextResponse.json({
            message: "Success",
            data: transcript.words
        });
    } catch(e){
        console.log(e)
        return NextResponse.json({
            error: e
        })
    }

}