import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } from "@google/generative-ai";
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY ?? "";
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
    export const chatSession = model.startChat({
      generationConfig,
      history: [
        {
            role: "user",
            parts: [
                {text: "Write a script to generate 30 seconds video on topic: interesting historical story along with AI image prompt in realistic format for each scene and give me result in JSON format with imagePromptand ContentText as field \n"},
            ],
        },
        {
            role: "model",
            parts: [
                {text: "```json\n[\n  {\n    \"imagePrompt\": \"A bustling marketplace in ancient Rome, with merchants selling goods and people walking through the crowded streets. The scene is full of vibrant colors and activity.\",\n    \"contentText\": \"Imagine ancient Rome, a city teeming with life. Its bustling marketplaces were a sight to behold, filled with merchants hawking their wares and people from all walks of life going about their daily business.\"\n  },\n  {\n    \"imagePrompt\": \"A portrait of a Roman senator, dressed in a toga, with a stern expression on his face. The scene is lit by the warm glow of a lamp.\",\n    \"contentText\": \"One such individual was a Roman senator named Marcus Junius Brutus. A man of great intellect and ambition, he was deeply troubled by the growing power of Julius Caesar.\"\n  },\n  {\n    \"imagePrompt\": \"A dramatic scene depicting the assassination of Julius Caesar in the Roman Senate. Senators surround Caesar, their faces filled with anger and determination.\",\n    \"contentText\": \"In 44 BC, Brutus, along with other senators, conspired to assassinate Caesar, believing it was necessary to save the Republic from tyranny.\"\n  },\n  {\n    \"imagePrompt\": \"A close-up shot of a bloodstained dagger, lying on the floor of the Roman Senate. The scene is bathed in a somber, dramatic light.\",\n    \"contentText\": \"Caesar was fatally stabbed, his final words, 'Et tu, Brute?' expressing betrayal and disbelief.\"\n  },\n  {\n    \"imagePrompt\": \"A panoramic view of Rome, showing the city's imposing architecture and its sprawling streets. The scene is bathed in a golden light, emphasizing the city's power and grandeur.\",\n    \"contentText\": \"The assassination sent shockwaves through Rome and the Roman world. It marked the beginning of a period of civil war and instability.\"\n  },\n  {\n    \"imagePrompt\": \"A portrait of Brutus, looking thoughtful and troubled. The scene is lit by a single candle, casting long shadows on his face.\",\n    \"contentText\": \"Despite his noble intentions, Brutus's actions ultimately failed to save the Republic. He became a tragic figure, haunted by the consequences of his choices.\"\n  }\n]\n```\n\n**Explanation:**\n\nThis JSON object provides a script for a 30-second video about the assassination of Julius Caesar, using AI-generated images to bring the story to life. \n\n* **imagePrompt:** Each object contains a detailed description for generating an image using an AI image generator. These prompts are designed to create realistic and visually appealing scenes.\n* **contentText:** Each object also contains the accompanying text narration for each image, forming a cohesive story.\n\n**How to Use:**\n\n1. **Choose an AI image generator:** Popular options include Midjourney, DALL-E 2, Stable Diffusion, and Craiyon.\n2. **Input the image prompts:** Paste the prompts into the chosen generator to generate the images.\n3. **Combine images and narration:**  Use a video editing software to assemble the images with the corresponding text narration.\n\n**Additional Notes:**\n\n* You can adjust the image prompts to create different styles and perspectives. \n* For a more dynamic video, you can add transitions, music, and sound effects.\n* The text content can be further elaborated and expanded upon to provide more details and insights.\n* The total video duration of 30 seconds can be adjusted based on the desired pace and complexity of the story."},
            ],
        },
      ],
    });
  
   