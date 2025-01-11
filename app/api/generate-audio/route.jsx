import { ElevenLabsClient } from "elevenlabs";
import { createWriteStream, existsSync, mkdirSync } from "fs";
import path from "path";
import { v4 as uuid } from "uuid";
import { NextResponse } from "next/server";
import { log } from "console";

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;

const client = new ElevenLabsClient({
  apiKey: ELEVENLABS_API_KEY,
});

async function createAudioFileFromText(scriptText) {
  try {
    // Ensure the directory exists
    const audioDir = path.join(process.cwd(), "public", "audio");
    if (!existsSync(audioDir)) {
      mkdirSync(audioDir, { recursive: true }); // Create the directory
    }

    const audio = await client.generate({
      voice: "Rachel",
      model_id: "eleven_turbo_v2_5",
      text: scriptText, // Ensure parameter matches API requirements
    });

    const fileName = `${uuid()}.mp3`;
    const filePath = path.join(audioDir, fileName);

    const fileStream = createWriteStream(filePath);
    console.log("Audio file path:", filePath);
    
    return new Promise((resolve, reject) => {
      audio.pipe(fileStream);
      fileStream.on("finish", () => resolve(fileName)); // Resolve the file name
      fileStream.on("error", reject);
    });
  } catch (error) {
    console.error("Error generating audio:", error);
    throw new Error("Audio generation failed.");
  }
}

export async function POST(req) {
try {
const { scriptText } = await req.json();

if (!scriptText) {
    return NextResponse.json(
    { error: "scriptText is required" },
    { status: 400 }
    );
}

// Generate audio file
const fileName = await createAudioFileFromText(scriptText);
console.log("Audio file generated:", fileName);
// Return the file URL
const fileUrl = `/audio/${fileName}`;
return NextResponse.json({ result: fileUrl });
} catch (error) {
console.error("Error handling request:", error);
return NextResponse.json(
    { error: "Internal Server Error", details: error.message },
    { status: 500 }
);
}
}
