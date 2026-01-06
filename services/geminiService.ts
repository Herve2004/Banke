
import { GoogleGenAI, Type } from "@google/genai";

// Always use named parameter for apiKey and use process.env.API_KEY directly
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getFinancialInsights = async (balance: number, donations: any[]) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate 3 financial and donation insights for a user with a balance of $${balance} and a history of donations: ${JSON.stringify(donations)}. 
      Return the response as JSON only.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              impactScore: { type: Type.NUMBER }
            },
            required: ["title", "description", "impactScore"]
          }
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Error:", error);
    return [
      { title: "Smart Saving", description: "You could increase your donation budget by 5% next month based on your current spending.", impactScore: 85 },
      { title: "Direct Impact", description: "Your gifts to individuals have directly supported local education efforts this quarter.", impactScore: 92 },
      { title: "Balance Health", description: "Maintain a reserve of $2000 for emergency liquidity while continuing your impact.", impactScore: 78 }
    ];
  }
};
