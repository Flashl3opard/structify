import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { prompt } = body;

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    if (!process.env.GROQ_API_KEY) {
      console.error("Missing GROQ_API_KEY");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const groqRes = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          // UPDATED MODEL: llama-3.3-70b-versatile is the current flagship
          model: "llama-3.3-70b-versatile", 
          temperature: 0,
          stream: false,
          messages: [
            {
              role: "system",
              content: `You are a JSON generator. Return ONLY a valid JSON array. 
              No explanations, no markdown code blocks.
              
              Format:
              [
                { "name": string, "value": number, "value2": number }
              ]`,
            },
            {
              role: "user",
              content: prompt,
            },
          ],
        }),
      }
    );

    if (!groqRes.ok) {
      const errorData = await groqRes.json();
      return NextResponse.json(
        { error: "Groq API error", details: errorData.error?.message },
        { status: groqRes.status }
      );
    }

    const data = await groqRes.json();
    let content = data?.choices?.[0]?.message?.content || "";

    // Clean up potential markdown formatting
    content = content.replace(/```json/g, "").replace(/```/g, "").trim();

    try {
      const parsed = JSON.parse(content);
      return NextResponse.json(parsed);
    } catch (parseError) {
      // RegEx fallback to extract array if LLM included conversational text
      const jsonMatch = content.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        return NextResponse.json(JSON.parse(jsonMatch[0]));
      }
      throw new Error("Could not parse AI response as JSON");
    }

  } catch (error: any) {
    console.error("Chart API Error:", error.message);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}