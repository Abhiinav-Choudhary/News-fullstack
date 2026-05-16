import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});



export const summarizeNews = async (req, res) => {

  try {

    const { title, description } = req.body;


    if (!title && !description) {

      return res.status(400).json({
        success: false,
        message: "Article data required"
      });
    }


    const completion = await client.chat.completions.create({

      model: "llama-3.1-8b-instant",

      messages: [
        {
          role: "system",
          content:
            "You are a news summarizer. Summarize articles into 4 concise bullet points."
        },

        {
          role: "user",
          content: `
            Title:
            ${title}

            Description:
            ${description}
          `
        }
      ],

      temperature: 0.5,

      max_tokens: 200
    });



    const summary =
      completion.choices[0].message.content;



    res.status(200).json({
      success: true,
      summary
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to generate AI summary"
    });
  }
};