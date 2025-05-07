import { GoogleGenerativeAI } from "@google/generative-ai";

// Check for API key on load
if (!process.env.GOOGLE_API_KEY) {
  console.error("❌ GOOGLE_API_KEY is not set in environment variables");
}

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export async function POST(req) {
  try {
    console.log("✅ Received chat request");

    const { messages } = await req.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: "Invalid messages format" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    console.log("📨 Processing messages:", messages);

    const currentMessage = messages[messages.length - 1].text;

    // Add context about SoftSell
    const context = `You are an AI assistant for SoftSell, a specialized marketplace for buying and selling software licenses. 
    SoftSell helps users:
    - Sell their unused software licenses
    - Buy verified software licenses at discounted prices
    - Transfer licenses safely and legally
    - Get support for license transfers
    - Verify license authenticity
    
    Current user question: ${currentMessage}
    
    Please provide a helpful response that focuses on our core services and maintains a professional, trustworthy tone.`;

    // Format the request body according to Gemini API spec
    const requestBody = {
      contents: [{
        parts: [{ text: context }]
      }]
    };

    console.log("✉️ Sending message to Gemini:", currentMessage);

    // Make direct API call to Gemini with correct model name and version
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GOOGLE_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'API request failed');
    }

    const data = await response.json();
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!generatedText) {
      throw new Error("Empty response from model");
    }

    console.log("✅ Gemini responded:", generatedText);

    return new Response(JSON.stringify({ response: generatedText }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("❌ Chat error details:", {
      message: error.message,
      stack: error.stack,
      apiKey: process.env.GOOGLE_API_KEY ? "Present" : "Missing",
    });

    let errorMessage = "Failed to process chat request";

    if (error.message.includes("API key")) {
      errorMessage = "API key is not configured correctly.";
    } else if (error.message.includes("Empty response")) {
      errorMessage = "Model returned an empty response.";
    } else if (error.message.includes("quota")) {
      errorMessage = "API quota exceeded.";
    } else if (error.message.includes("API request failed")) {
      errorMessage = "Failed to communicate with Gemini API.";
    }

    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
