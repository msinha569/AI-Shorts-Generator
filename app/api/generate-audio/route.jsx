import { ElevenLabsClient } from "elevenlabs";
import { v4 as uuid } from "uuid";
import { NextResponse } from "next/server";
import { getDownloadURL, ref } from "firebase/storage";


const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;

const client = new ElevenLabsClient({
  apiKey: ELEVENLABS_API_KEY,
});

import { uploadBytesResumable } from "firebase/storage";
import { FirebaseStorage } from "@/configs/FirebaseConfig";

async function createAudioFileFromText(scriptText) {
  try {
    // Generate the audio using ElevenLabs API
    const audioStream = await client.generate({
      voice: "Rachel",
      model_id: "eleven_turbo_v2_5",
      text: scriptText,
    });

    // Collect the audio stream into a buffer
    const audioChunks = [];
    for await (const chunk of audioStream) {
      audioChunks.push(chunk);
    }
    const audioBuffer = Buffer.concat(audioChunks);

    // Generate a unique file name
    const fileName = `${uuid()}.mp3`;

    // Define the Firebase Storage reference
    const storageRef = ref(FirebaseStorage, `ai-short-video-file/${fileName}`);

    // Upload the audio buffer to Firebase Storage
    const uploadTask = uploadBytesResumable(storageRef, audioBuffer, {
      contentType: "audio/mpeg",
    });

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        null, // Optionally track progress
        reject, // Handle errors
        async () => {
          try {
            // Get the download URL after upload is complete
            const downloadURL = await getDownloadURL(storageRef);
            console.log(`Audio file uploaded to Firebase: ${downloadURL}`);
            resolve({ downloadURL });
          } catch (error) {
            reject(error);
          }
        }
      );
    });
  } catch (error) {
    console.error("Error generating and uploading audio:", error);
    throw new Error("Audio generation or upload failed.");
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
    const { localFilePath, downloadURL } = await createAudioFileFromText(scriptText);
    console.log("Local file path:", localFilePath);
    console.log("Firebase download URL:", downloadURL);

    return NextResponse.json({ localFilePath, downloadURL });
  } catch (error) {
    console.error("Error handling request:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
