const asyncHandler = require("express-async-handler");
const axios = require("axios");
const ContentHistory = require("../models/ContentHistory");
const User = require("../models/User");
const { GoogleGenerativeAI } = require("@google/generative-ai");

//----OpenAI Controller----

const openAIController = asyncHandler(async (req, res) => {
  const { prompt } = req.body;
  console.log(prompt);
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        model: "gpt-3.5-turbo-instruct",
        prompt,
        max_tokens: 600,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const content = response?.data?.choices[0].text?.trim();
    console.log(content);
    //Create the history
    const newContent = await ContentHistory.create({
      user: req?.user?._id,
      content,
    });
    //Push the content into the user
    const userFound = await User.findById(req?.user?.id);
    userFound.contentHistory.push(newContent?._id);
    //Update the api Request count
    userFound.apiRequestCount += 1;
    await userFound.save();
    res.status(200).json(content);
  } catch (error) {
    try {
      const genAI = new GoogleGenerativeAI(process.env.GOOGLE);

      // For text-only input, use the gemini-pro model
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const prompt1 = prompt;

      const result = await model.generateContent(prompt1);
      const response = await result.response;
      const text = await response.text();
      console.log(text);

      const content = text;

      //Create the history
      const newContent = await ContentHistory.create({
        user: req?.user?._id,
        content,
      });
      //Push the content into the user
      const userFound = await User.findById(req?.user?.id);
      userFound.contentHistory.push(newContent?._id);
      //Update the api Request count
      userFound.apiRequestCount += 1;
      await userFound.save();
      res.status(200).json(content);
    } catch (error) {
      console.error("Error with Google Generative AI:", error);
      res.status(500).json({ error: "Server Error" });
    }
  }
});

module.exports = {
  openAIController,
};
