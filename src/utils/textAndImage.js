const { GoogleGenerativeAI } = require("@google/generative-ai");

const { aiConfig } = require("../config/aiConfig.js");

const { processImages } = require("./processImages.js");

const genAI = new GoogleGenerativeAI(aiConfig.gemini.apiKey);

module.exports = {
    textAndImage: async (prompt, images) => {
        const model = genAI.getGenerativeModel({
            model: aiConfig.gemini.textAndImageModel,
            safetySettings: aiConfig.gemini.safetySettings,
        });

        // prompt is a single string
        // imageParts is an array containing base64 strings of images

        let imageParts = await processImages(images);

        try {
            const result = await model.generateContent([prompt, ...imageParts]);
            const chatResponse = result?.response?.text();

            return { result: chatResponse };
        } catch (error) {
            console.error("textAndImage | error", error);
            return { Error: "Uh oh! Caught error while fetching AI response" };
        }
    }
};