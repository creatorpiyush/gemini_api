const { GoogleGenerativeAI } = require("@google/generative-ai");

const { aiConfig } = require("../config/aiConfig.js");

const genAI = new GoogleGenerativeAI(aiConfig.gemini.apiKey);

// This function is used for a text only model of Gemini AI
module.exports = {
    textOnly: async (prompt) => {
        const model = genAI.getGenerativeModel({
            model: aiConfig.gemini.textOnlyModel,
            safetySettings: aiConfig.gemini.safetySettings,
        });

        // prompt is a single string
        try {
            const result = await model.generateContent(prompt);
            const chatResponse = result?.response?.text();

            return { result: chatResponse};
        } catch (error) {
            console.error("textOnly | error", error);
            return { Error: "Uh oh! Caught error while fetching AI response" };
        }
    }
};