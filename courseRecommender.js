import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-database.js";

// Define image categories for different course types
const courseImageCategories = {
    programming: [
        "https://img.freepik.com/free-vector/programmers-using-javascript-programming-language-computer-tiny-people-javascript-language-javascript-engine-js-web-development-concept_335657-2412.jpg",
        "https://img.freepik.com/free-vector/hand-coding-concept-illustration_114360-8193.jpg",
        "https://img.freepik.com/free-vector/programming-concept-illustration_114360-1351.jpg",
        "https://img.freepik.com/free-vector/desktop-smartphone-app-development_23-2148683130.jpg"
    ],
    design: [
        "https://img.freepik.com/free-vector/gradient-ui-ux-background_23-2149052117.jpg",
        "https://img.freepik.com/free-vector/gradient-ui-ux-illustration_52683-69272.jpg",
        "https://img.freepik.com/free-vector/website-designer-concept-illustration_114360-4100.jpg",
        "https://img.freepik.com/free-vector/design-process-concept-illustration_114360-4957.jpg"
    ],
    webdev: [
        "https://img.freepik.com/free-vector/website-development-banner_33099-1687.jpg",
        "https://img.freepik.com/free-vector/web-development-programmer-engineering-coding-website-augmented-reality-interface-screens-developer-project-engineer-programming-software-application-design-cartoon-illustration_107791-3863.jpg",
        "https://img.freepik.com/free-vector/web-development-concept-illustration_114360-2923.jpg"
    ],
    mobile: [
        "https://img.freepik.com/free-vector/app-development-illustration_52683-47931.jpg",
        "https://img.freepik.com/free-vector/mobile-app-development-concept-illustration_114360-7293.jpg",
        "https://img.freepik.com/free-vector/gradient-mobile-development-illustration_52683-81760.jpg"
    ],
    data: [
        "https://img.freepik.com/free-vector/big-data-analytics-abstract-concept-illustration_335657-2137.jpg",
        "https://img.freepik.com/free-vector/data-extraction-concept-illustration_114360-4876.jpg",
        "https://img.freepik.com/free-vector/data-analysis-concept-illustration_114360-8112.jpg"
    ],
    ai: [
        "https://img.freepik.com/free-vector/artificial-intelligence-concept-illustration_114360-7135.jpg",
        "https://img.freepik.com/free-vector/artificial-intelligence-concept-illustration_114360-1164.jpg",
        "https://img.freepik.com/free-vector/machine-learning-concept-illustration_114360-3207.jpg"
    ],
    business: [
        "https://img.freepik.com/free-vector/business-planning-concept-illustration_114360-1675.jpg",
        "https://img.freepik.com/free-vector/digital-marketing-team-with-laptops-light-bulb-marketing-team-metrics-marketing-team-lead-responsibilities-concept_335657-258.jpg",
        "https://img.freepik.com/free-vector/strategic-consulting-concept-illustration_114360-8994.jpg"
    ]
};

function getRelevantImage(courseTitle, courseTopics) {
    // Convert title and topics to lowercase for easier matching
    const titleLower = courseTitle.toLowerCase();
    const topicsLower = courseTopics.map(topic => topic.toLowerCase());

    // Define matching rules
    const matchRules = [
        { keywords: ['react', 'frontend', 'web development'], category: 'webdev' },
        { keywords: ['ui', 'ux', 'design', 'graphic'], category: 'design' },
        { keywords: ['mobile', 'ios', 'android', 'react native'], category: 'mobile' },
        { keywords: ['data', 'algorithm', 'structure', 'database'], category: 'data' },
        { keywords: ['ai', 'machine learning', 'artificial intelligence'], category: 'ai' },
        { keywords: ['business', 'marketing', 'management'], category: 'business' },
        { keywords: ['programming', 'coding', 'development'], category: 'programming' }
    ];

    // Find matching category
    let category = 'programming'; // default category
    for (const rule of matchRules) {
        if (rule.keywords.some(keyword => 
            titleLower.includes(keyword) || 
            topicsLower.some(topic => topic.includes(keyword)))) {
            category = rule.category;
            break;
        }
    }

    // Get random image from the category
    const images = courseImageCategories[category];
    return images[Math.floor(Math.random() * images.length)];
}

// Predefined course templates for different interests and levels
const courseTemplates = {
    design: {
        beginner: [
            {
                title: "Introduction to UI/UX Design",
                description: "Learn the fundamentals of user interface and user experience design. Master the basics of design thinking and modern design tools.",
                duration: 6,
                difficulty: "Beginner",
                keyTopics: ["Design Principles", "Color Theory", "Typography", "Wireframing", "Prototyping"],
                learningOutcomes: ["Create basic UI designs", "Understand user experience principles", "Use design tools effectively"]
            },
            {
                title: "Graphic Design Fundamentals",
                description: "Master the basics of graphic design including composition, layout, and digital design tools.",
                duration: 8,
                difficulty: "Beginner",
                keyTopics: ["Adobe Creative Suite", "Layout Design", "Brand Design", "Digital Graphics"],
                learningOutcomes: ["Create professional graphics", "Design logos and branding materials", "Master design software"]
            }
        ],
        intermediate: [
            {
                title: "Advanced UI Design Patterns",
                description: "Deep dive into complex UI patterns and advanced design systems. Learn to create scalable and consistent designs.",
                duration: 10,
                difficulty: "Intermediate",
                keyTopics: ["Design Systems", "Component Libraries", "Advanced Prototyping", "Design Documentation"],
                learningOutcomes: ["Build complex design systems", "Create advanced prototypes", "Document design decisions"]
            }
        ],
        advanced: [
            {
                title: "Design Leadership and Systems",
                description: "Learn to lead design teams and create enterprise-level design systems. Master advanced design strategy and team management.",
                duration: 12,
                difficulty: "Advanced",
                keyTopics: ["Design Leadership", "Enterprise Design Systems", "Design Strategy", "Team Management"],
                learningOutcomes: ["Lead design teams", "Create enterprise design systems", "Develop design strategies"]
            }
        ]
    },
    programming: {
        beginner: [
            {
                title: "Introduction to Web Development",
                description: "Learn the basics of web development including HTML, CSS, and JavaScript. Build your first responsive websites.",
                duration: 8,
                difficulty: "Beginner",
                keyTopics: ["HTML5", "CSS3", "JavaScript Basics", "Responsive Design"],
                learningOutcomes: ["Build basic websites", "Style web pages", "Add interactivity"]
            }
        ],
        intermediate: [
            {
                title: "Full-Stack JavaScript Development",
                description: "Master both frontend and backend development with JavaScript. Learn popular frameworks and databases.",
                duration: 12,
                difficulty: "Intermediate",
                keyTopics: ["React", "Node.js", "MongoDB", "Express.js"],
                learningOutcomes: ["Build full-stack applications", "Work with databases", "Deploy web apps"]
            }
        ],
        advanced: [
            {
                title: "Advanced Software Architecture",
                description: "Learn advanced software design patterns and architectural principles. Master system design and scalability.",
                duration: 10,
                difficulty: "Advanced",
                keyTopics: ["Design Patterns", "System Architecture", "Scalability", "Performance"],
                learningOutcomes: ["Design complex systems", "Implement design patterns", "Scale applications"]
            }
        ]
    },
    business: {
        beginner: [
            {
                title: "Business Fundamentals",
                description: "Learn the basics of business management and entrepreneurship. Understand key business concepts and strategies.",
                duration: 6,
                difficulty: "Beginner",
                keyTopics: ["Business Planning", "Marketing Basics", "Financial Management", "Operations"],
                learningOutcomes: ["Create business plans", "Understand market analysis", "Manage basic finances"]
            }
        ],
        intermediate: [
            {
                title: "Digital Marketing Strategy",
                description: "Master digital marketing channels and strategies. Learn to create and execute marketing campaigns.",
                duration: 8,
                difficulty: "Intermediate",
                keyTopics: ["Social Media Marketing", "SEO", "Content Marketing", "Analytics"],
                learningOutcomes: ["Create marketing strategies", "Manage campaigns", "Analyze performance"]
            }
        ],
        advanced: [
            {
                title: "Advanced Business Strategy",
                description: "Learn advanced business strategy and leadership. Master corporate strategy and organizational management.",
                duration: 10,
                difficulty: "Advanced",
                keyTopics: ["Corporate Strategy", "Leadership", "Change Management", "Innovation"],
                learningOutcomes: ["Develop business strategies", "Lead organizations", "Drive innovation"]
            }
        ]
    }
};

async function callOpenRouterAPI(userPreferences) {
    console.log("Calling OpenRouter API with user preferences:", userPreferences);
    const { mainInterest, specificInterests, experienceLevel } = userPreferences;

    const systemPrompt = "You are an expert course recommender. Based on the user's main interest, specific interests, and experience level, provide a JSON array of 5 to 6 course objects. Each object should have a 'title' (string, concise and engaging) and a 'description' (string, 1-2 sentences summarizing the course). Ensure the output is ONLY the JSON array, with no other text, commentary, or markdown formatting before or after it. The JSON should be well-formed.";
    const userPromptContent = `My main interest is ${mainInterest}. My specific interests include: ${specificInterests.join(', ')}. My current experience level is ${experienceLevel}. Please recommend 5-6 courses.`;

    try {
        console.log("Making API request to OpenRouter with model: openai/gpt-3.5-turbo");
        
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer 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', // Updated API Key
                'HTTP-Referer': window.location.origin, // Optional: For OpenRouter to identify your site
                'X-Title': 'Simplexify Course Recommender' // Optional: For OpenRouter to identify your app
            },
            body: JSON.stringify({
                model: "openai/gpt-3.5-turbo", // Using a generally good model, can be changed
                messages: [
                    {
                        role: "system",
                        content: systemPrompt
                    },
                    {
                        role: "user",
                        content: userPromptContent
                    }
                ],
                response_format: { type: "json_object" } // Requesting JSON output if model supports it
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`OpenRouter API call failed: ${response.status} ${response.statusText}`, errorText);
            throw new Error(`API call failed: ${response.status} ${response.statusText}. Details: ${errorText}`);
        }

        const data = await response.json();
        console.log("AI Response (raw):", data);

        if (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) {
            try {
                const rawContent = data.choices[0].message.content;
                const parsedJson = JSON.parse(rawContent);
                let coursesArray = null;

                // Check if the response is an object with a 'courses' array property
                if (parsedJson && typeof parsedJson === 'object' && Array.isArray(parsedJson.courses)) {
                    coursesArray = parsedJson.courses;
                } 
                // Else, check if the response itself is an array (original expectation)
                else if (Array.isArray(parsedJson)) {
                    coursesArray = parsedJson;
                }

                if (coursesArray && coursesArray.every(c => c.title && c.description)) {
                    console.log("Parsed AI course recommendations:", coursesArray);
                    return coursesArray;
                } else {
                    console.error("AI response content is not a valid array of course objects, or not in the expected structure:", rawContent);
                    throw new Error("AI response content is not in the expected format or structure.");
                }
            } catch (parseError) {
                console.error("Error parsing AI response content as JSON:", parseError, data.choices[0].message.content);
                throw new Error("Failed to parse AI recommendations.");
            }
        } else {
            console.error("Invalid response structure from OpenRouter AI service:", data);
            throw new Error("Invalid response structure from AI service.");
        }

    } catch (error) {
        console.error("Error in callOpenRouterAPI:", error);
        return null; // Return null to indicate failure, allowing fallback
    }
}

export async function generateCourseRecommendations() {
    let mainInterest, specificInterests, experienceLevel;
    let aiRecommendedCourses = null;

    try {
        // 1. Retrieve user preferences from localStorage
        const storedMainInterest = localStorage.getItem('userMainInterest');
        const storedSpecificInterests = localStorage.getItem('userInterests');
        const storedExperienceLevel = localStorage.getItem('userExperienceLevel');

        if (storedMainInterest && storedSpecificInterests && storedExperienceLevel) {
            try {
                mainInterest = JSON.parse(storedMainInterest);
                specificInterests = JSON.parse(storedSpecificInterests); // Should be an array
                experienceLevel = JSON.parse(storedExperienceLevel);
                console.log("Retrieved from localStorage:", { mainInterest, specificInterests, experienceLevel });
            } catch (e) {
                console.error("Error parsing preferences from localStorage:", e);
                // Proceed with undefined preferences, leading to template fallback
            }
        }

        // 2. Call OpenRouter API if preferences are valid
        if (mainInterest && Array.isArray(specificInterests) && specificInterests.length > 0 && experienceLevel) {
            const userPreferencesForAPI = { mainInterest, specificInterests, experienceLevel };
            aiRecommendedCourses = await callOpenRouterAPI(userPreferencesForAPI);
        } else {
            console.log("User preferences not found or invalid in localStorage. Proceeding with template-based recommendations.");
        }

        let coursesToProcess = [];

        // 3. Process AI recommendations if available
        if (aiRecommendedCourses && Array.isArray(aiRecommendedCourses) && aiRecommendedCourses.length > 0) {
            console.log("Processing AI recommended courses:", aiRecommendedCourses);
            coursesToProcess = aiRecommendedCourses.map(aiCourse => ({
                title: String(aiCourse.title || 'Untitled Course').trim(),
                description: String(aiCourse.description || 'No description available.').trim(),
                imageUrl: getRelevantImage(aiCourse.title, []), // Pass empty array for topics for now
                duration: 8, // Default duration
                difficulty: experienceLevel || 'Beginner', // Use stored experience level or default
                keyTopics: [], // Default
                learningOutcomes: [], // Default
                isAIReco: true // Flag to identify AI recommended courses
            }));
        } else {
            console.log("AI recommendations not available or empty. Falling back to templates.");
            const interestKey = mainInterest ? mainInterest.toLowerCase() : 'programming';
            const levelKey = experienceLevel ? experienceLevel.toLowerCase() : 'beginner';

            let templateSource = courseTemplates.programming.beginner; // Ultimate fallback
            if (courseTemplates[interestKey]) {
                if (courseTemplates[interestKey][levelKey]) {
                    templateSource = courseTemplates[interestKey][levelKey];
                } else if (courseTemplates[interestKey]['beginner']) {
                    templateSource = courseTemplates[interestKey]['beginner'];
                }
            }
            coursesToProcess = JSON.parse(JSON.stringify(templateSource)); // Deep copy to avoid modifying templates
            
            coursesToProcess = coursesToProcess.map(course => ({
                ...course,
                title: String(course.title || 'Untitled Course').trim(),
                description: String(course.description || 'No description available.').trim(),
                imageUrl: getRelevantImage(course.title, course.keyTopics || []),
                duration: course.duration || 8,
                difficulty: course.difficulty || levelKey,
                keyTopics: course.keyTopics || [],
                learningOutcomes: course.learningOutcomes || [],
                isAIReco: false
            }));
        }

        const validatedCourses = coursesToProcess.map(course => ({
            title: String(course.title || '').trim(),
            description: String(course.description || '').trim(),
            duration: Number(course.duration) || 8,
            difficulty: String(course.difficulty || experienceLevel || 'Beginner').trim(),
            keyTopics: Array.isArray(course.keyTopics) ?
                course.keyTopics.map(topic => String(topic).trim()) : [],
            learningOutcomes: Array.isArray(course.learningOutcomes) ?
                course.learningOutcomes.map(outcome => String(outcome).trim()) : [],
            imageUrl: course.imageUrl || getRelevantImage(course.title, course.keyTopics || [])
        }));

        const uniqueCourses = validatedCourses.filter((course, index, self) =>
            index === self.findIndex((c) => c.title.toLowerCase() === course.title.toLowerCase())
        );

        let finalCourses = uniqueCourses.slice(0, 6);

        if (finalCourses.length < 5 && !aiRecommendedCourses) { // Only pad if AI wasn't used or failed, and we have less than 5
            console.log("Not enough courses, attempting to pad with more templates.");
            let additionalTemplates = [];
            const interestKey = mainInterest ? mainInterest.toLowerCase() : 'programming';
            const levelKey = experienceLevel ? experienceLevel.toLowerCase() : 'beginner';
            
            // Try to get more templates from other levels or a default interest
            if (courseTemplates[interestKey]) {
                Object.keys(courseTemplates[interestKey]).forEach(level => {
                    if (level !== levelKey) additionalTemplates.push(...courseTemplates[interestKey][level]);
                });
            }
            if (interestKey !== 'programming' && courseTemplates.programming) { // Add general programming if not already the main interest
                 additionalTemplates.push(...courseTemplates.programming.beginner);
                 additionalTemplates.push(...courseTemplates.programming.intermediate);
            }
            additionalTemplates = JSON.parse(JSON.stringify(additionalTemplates)); // Deep copy

            const existingTitles = finalCourses.map(c => c.title.toLowerCase());
            for (const course of additionalTemplates) {
                if (finalCourses.length >= 6) break;
                if (!existingTitles.includes(String(course.title || '').toLowerCase())) {
                    finalCourses.push({
                        title: String(course.title || 'Untitled Course').trim(),
                        description: String(course.description || 'No description available.').trim(),
                        imageUrl: getRelevantImage(course.title, course.keyTopics || []),
                        duration: course.duration || 8,
                        difficulty: course.difficulty || 'Beginner',
                        keyTopics: course.keyTopics || [],
                        learningOutcomes: course.learningOutcomes || [],
                        isAIReco: false
                    });
                    existingTitles.push(String(course.title || '').toLowerCase());
                }
            }
        }
        
        finalCourses = finalCourses.filter((course, index, self) => 
            index === self.findIndex(c => c.title.toLowerCase() === course.title.toLowerCase())
        ).slice(0, 6);

        console.log("Final recommendations to be displayed:", finalCourses);
        if (finalCourses.length === 0) { // Ensure we always return something
            console.warn("No courses could be generated, returning absolute fallback.");
            let fallback = JSON.parse(JSON.stringify(courseTemplates.programming.beginner));
            return fallback.map(course => ({
                 ...course, imageUrl: getRelevantImage(course.title, course.keyTopics || []), isAIReco: false
            })).slice(0,6);
        }
        return finalCourses;

    } catch (error) {
        console.error("Critical Error in generateCourseRecommendations:", error);
        let fallback = JSON.parse(JSON.stringify(courseTemplates.programming.beginner));
        return fallback.map(course => ({
            ...course, imageUrl: getRelevantImage(course.title, course.keyTopics || []), isAIReco: false
        })).slice(0,6);
    }
}

// Export a dummy function that doesn't actually save to the database
export async function saveCourseRecommendations(userId, courses) {
    // This function now just returns success without saving to database
    console.log("Not saving recommended courses to database as requested.");
        return true;
} 