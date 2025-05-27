import fetch from 'node-fetch';

const API_KEY = "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";
const BASE_URL = "https://openrouter.ai/api/v1";

async function main() {
  console.log('Starting OpenRouter API request...');
  
  try {
    const response = await fetch(`${BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
        'HTTP-Referer': 'https://simplexify.com', // Optional. Site URL for rankings on openrouter.ai
        'X-Title': 'Simplexify', // Optional. Site title for rankings on openrouter.ai
      },
      body: JSON.stringify({
        model: "mistralai/devstral-small:free",
        messages: [
          {
            "role": "user",
            "content": "What is the meaning of life?"
          }
        ]
      })
    });

    if (!response.ok) {
      console.error(`HTTP error! Status: ${response.status}`);
      const errorText = await response.text();
      console.error('Error response:', errorText);
      return;
    }

    const data = await response.json();
    console.log('API Response received:');
    console.log(data.choices[0].message);
    console.log('\nFull API response:');
    console.log(JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error with OpenRouter API request:');
    console.error(error.message);
  }
  
  console.log('Script execution completed');
};

main();
