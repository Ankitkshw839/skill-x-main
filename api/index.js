const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: ['http://127.0.0.1:5500', 'http://localhost:5500', 'http://localhost:8080'],
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(express.json());

// Initialize OpenAI with OpenRouter configuration
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY || "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",
  defaultHeaders: {
    "HTTP-Referer": process.env.SITE_URL || "http://localhost:3000", 
    "X-Title": "Simplexify Learning Assistant",
  },
});

// API endpoint for chat completions
app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Invalid request format. Messages array is required.' });
    }

    const completion = await openai.chat.completions.create({
      model: "mistralai/devstral-small:free",
      messages: [
        {
          role: "system",
          content: "You are an educational AI assistant focused on helping students learn effectively. You provide clear, concise, and accurate information on educational topics. Focus on topics related to learning, education, study techniques, academic subjects, and skill development. Keep responses helpful, educational, and suitable for students. Never generate harmful, inappropriate, or non-educational content.\n\nFormat your responses using markdown:\n- Use `code` for inline code and ```code blocks``` for longer snippets\n- Use **bold** or *italic* for emphasis\n- Use bullet points and numbered lists where appropriate\n- Use [text](URL) format for links\n- Use headers with # or ## for sections\n- Keep paragraphs short and separated by blank lines\n- Use examples and analogies to explain complex concepts"
        },
        ...messages
      ]
    });

    res.json(completion.choices[0].message);
  } catch (error) {
    console.error('Error calling OpenRouter API:', error);
    res.status(500).json({ 
      error: 'Failed to process your request',
      details: error.message
    });
  }
});

// API endpoint for course recommendations
app.post('/api/course-recommendations', async (req, res) => {
  try {
    const { userData } = req.body;
    
    if (!userData || !userData.mainInterest || !userData.experienceLevel) {
      return res.status(400).json({ 
        error: 'Invalid request format. User data with mainInterest and experienceLevel is required.' 
      });
    }

    console.log("Generating course recommendations for:", userData);

    const completion = await openai.chat.completions.create({
      model: "mistralai/devstral-small:free",
      messages: [
        {
          role: "system",
          content: "You are an expert course advisor who provides detailed, personalized course recommendations. Always return valid JSON."
        },
        {
          role: "user",
          content: `Generate 5 unique course recommendations based on these preferences:
          Main Interest: ${userData.mainInterest}
          Experience Level: ${userData.experienceLevel}

          Return the response in this exact JSON format:
          {
              "courses": [
                  {
                      "title": "Course Title",
                      "description": "2-3 sentences about the course",
                      "duration": 8,
                      "difficulty": "Beginner/Intermediate/Advanced",
                      "keyTopics": ["topic1", "topic2", "topic3"],
                      "learningOutcomes": ["outcome1", "outcome2", "outcome3"]
                  }
              ]
          }

          Make sure:
          1. Each course title is unique and specific
          2. Descriptions are detailed and relevant
          3. Duration is in weeks (4-12 weeks)
          4. Key topics are specific to the course (at least 3 topics)
          5. Learning outcomes are measurable
          6. Difficulty matches user's level (${userData.experienceLevel})
          7. All courses relate to ${userData.mainInterest}`
        }
      ]
    });

    // Process the response to extract courses
    let courses = [];
    try {
      const content = completion.choices[0].message.content;
      
      // Handle potential markdown code blocks
      let jsonContent = content;
      if (content.includes("```json")) {
        jsonContent = content.split("```json")[1].split("```")[0].trim();
      } else if (content.includes("```")) {
        jsonContent = content.split("```")[1].split("```")[0].trim();
      }
      
      // Parse the JSON
      const parsed = JSON.parse(jsonContent);
      courses = parsed.courses || [];
      
      // Add image URLs to courses
      courses = courses.map(course => {
        // Generate a random image URL for the course
        const imageCategories = [
          "https://img.freepik.com/free-vector/online-tutorials-concept_23-2148529858.jpg",
          "https://img.freepik.com/free-vector/hand-coding-concept-illustration_114360-8193.jpg",
          "https://img.freepik.com/free-vector/programming-concept-illustration_114360-1351.jpg",
          "https://img.freepik.com/free-vector/desktop-smartphone-app-development_23-2148683130.jpg"
        ];
        
        return {
          ...course,
          imageUrl: imageCategories[Math.floor(Math.random() * imageCategories.length)]
        };
      });
    } catch (error) {
      console.error("Error parsing course recommendations:", error);
      return res.status(500).json({ 
        error: 'Failed to parse course recommendations',
        details: error.message
      });
    }

    res.json(courses);
  } catch (error) {
    console.error('Error generating course recommendations:', error);
    res.status(500).json({ 
      error: 'Failed to generate course recommendations',
      details: error.message
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 