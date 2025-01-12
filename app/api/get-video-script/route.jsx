import { chatSession } from "@/configs/ApiModel";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { prompt } = await req.json();

        const result = await chatSession.sendMessage(prompt);
        const responseText = await result.response.text();

        // Remove potential formatting artifacts like ```json
        const sanitizedResponse = responseText.trim().replace(/^```(json)?/, "").replace(/```$/, "");

        const parsedResponse = JSON.parse(sanitizedResponse);

        return NextResponse.json({ result: parsedResponse });
    } catch (error) {
        console.error("Error occurred:", error);
        return NextResponse.json({ error: error.message });
    }
}
