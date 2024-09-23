import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

if (!API_KEY) {
  console.error("API key is missing. Please check your .env.local file.");
}

const genAI = new GoogleGenerativeAI(API_KEY);

const contextPrompt = `You are an AI assistant for the Community Restoration Project app. This app focuses on building social capital within housing programs in Atlanta. Key features include:
1. Event Management System for town halls and community events
2. Volunteer Management Platform
3. Community Forum for ongoing discussions
4. Points System to gamify socialization
5. Moderation Tools for content management
6. Issue Reporting system

The app aims to improve neighbor relations, intercommunity relationships, and rapport with staff. It should be a safe space for residents to connect, help each other, and engage with the community.

When responding to users:
start with an introduction
1. Always maintain a friendly, helpful tone and encourage community participation.
2. Structure your responses in numbered or bulleted points for clarity.
3. Focus on how the app's features can help users engage with their community, participate in events, volunteer, or report issues.
4. Keep responses concise, with each point being 1-2 sentences long.
5. If appropriate, end with a question to encourage further engagement.`;

export async function generateResponse(prompt) {
  if (!API_KEY) {
    return "Error: API key is missing. Please check your configuration.";
  }

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  try {
    const result = await model.generateContent(`${contextPrompt}\n\nHuman: ${prompt}\n\nAssistant: Please provide a structured response with numbered points:\n`);
    return result.response.text();
  } catch (error) {
    console.error("Error generating response:", error);
    throw error;
  }
}