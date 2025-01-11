import { chatSession } from "@/configs/ApiModel";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { prompt } = await req.json();
        console.log("Prompt:", prompt);

        const result = await chatSession.sendMessage(prompt);
        const responseText = await result.response.text();

        console.log("Raw Response Text:", responseText);

        // Remove potential formatting artifacts like ```json
        const sanitizedResponse = responseText.trim().replace(/^```(json)?/, "").replace(/```$/, "");

        console.log("Sanitized Response Text:", sanitizedResponse);

        const parsedResponse = JSON.parse(sanitizedResponse);

        return NextResponse.json({ result: parsedResponse });
    } catch (error) {
        console.error("Error occurred:", error);
        return NextResponse.json({ error: error.message });
    }
}
