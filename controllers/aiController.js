const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();

const client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const model = "gemini-2.5-flash"; 

// មុខងារ Code Review
exports.reviewCode = async (data) => {
    const { code, userComment } = data;
    const prompt = `You are a funny Khmer Senior Developer. Analyze this: "${userComment}" Code: "${code}"...`;
    const result = await client.models.generateContent({ model, contents: [{ role: "user", parts: [{ text: prompt }] }] });
    const text = result.text || result.candidates?.[0]?.content?.parts?.[0]?.text;
    return JSON.parse(text.replace(/```json|```/g, "").trim());
};

// មុខងារ Culture Guide
exports.askCulture = async (data) => {
    const { question, type } = data;
    const instruction = type === "detailed" ? "Deep-dive explanation." : "Short facts.";
    const prompt = `Khmer Culture Expert. Answer: "${question}" Format: ${instruction}`;
    const result = await client.models.generateContent({ model, contents: [{ role: "user", parts: [{ text: prompt }] }] });
    return { response: result.text || result.candidates?.[0]?.content?.parts?.[0]?.text };
};

// មុខងារ Study Assist
exports.studyAssist = async (data) => {
    const { content } = data;
    const prompt = `Khmer Study Companion. Analyze: "${content}"...`;
    const result = await client.models.generateContent({ model, contents: [{ role: "user", parts: [{ text: prompt }] }] });
    return JSON.parse(result.text.replace(/```json|```/g, "").trim());
};