
import { AssemblyAI } from 'assemblyai';
import { NextResponse } from 'next/server';

export async function POST(req,res){
   try {
     const { audioFilePath } = await req.json();
     console.log(audioFilePath);
     
     const client = new AssemblyAI({
     apiKey: process.env.CAPTION_API,
     });
 
     const FILE_URL = audioFilePath
     const data = {
     audio: FILE_URL
     }
 
     const transcript = await client.transcripts.transcribe(data);
     return NextResponse.json({ transcript: transcript.words });
   } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json({ error: error.message });
   }

}