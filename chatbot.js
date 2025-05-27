document.addEventListener('DOMContentLoaded', () => {
    loadChatbotUI();
});

async function loadChatbotUI() {
    try {
        // Create and append CSS link
        const cssLink = document.createElement('link');
        cssLink.rel = 'stylesheet';
        cssLink.type = 'text/css';
        cssLink.href = './chatbot-styles.css'; // Assuming chatbot.js, chatbot-styles.css are in the same directory
        document.head.appendChild(cssLink);

        // Fetch and inject HTML
        const response = await fetch('./chatbot-ui.html'); // Assuming chatbot.js, chatbot-ui.html are in the same directory
        if (!response.ok) {
            console.error('Failed to load chatbot UI HTML:', response.statusText);
            return;
        }
        const htmlSnippet = await response.text();
        const chatbotContainer = document.createElement('div');
        chatbotContainer.innerHTML = htmlSnippet;
        document.body.appendChild(chatbotContainer.firstChild); // Append the actual #simplexify-chatbot-container

        // Initialize event listeners after UI is loaded
        initializeChatbotEventListeners();

    } catch (error) {
        console.error('Error loading chatbot UI:', error);
    }
}

function initializeChatbotEventListeners() {
    const toggleButton = document.getElementById('chatbot-toggle-button');
    const chatWindow = document.getElementById('chatbot-window');
    const closeButton = document.getElementById('chatbot-close-button');
    const sendButton = document.getElementById('chatbot-send-button');
    const inputField = document.getElementById('chatbot-input');
    const messagesContainer = document.getElementById('chatbot-messages');

    if (!toggleButton || !chatWindow || !closeButton || !sendButton || !inputField || !messagesContainer) {
        console.error('Chatbot UI elements not found. Initialization failed.');
        return;
    }

    const chatIcon = toggleButton.querySelector('.fa-comment-dots');
    const closeIcon = toggleButton.querySelector('.fa-times');

    toggleButton.addEventListener('click', () => {
        const isHidden = chatWindow.style.display === 'none' || chatWindow.style.display === '';
        chatWindow.style.display = isHidden ? 'flex' : 'none';
        
        if (chatIcon && closeIcon) {
            chatIcon.style.display = isHidden ? 'none' : 'inline-block';
            closeIcon.style.display = isHidden ? 'inline-block' : 'none';
        }
        // Add animation class if opening
        if (isHidden) {
            chatWindow.style.opacity = '0';
            chatWindow.style.transform = 'scale(0.95) translateY(10px)';
            setTimeout(() => {
                chatWindow.style.opacity = '1';
                chatWindow.style.transform = 'scale(1) translateY(0)';
            }, 10); // Small delay to ensure transition happens
        }
    });

    closeButton.addEventListener('click', () => {
        chatWindow.style.opacity = '0';
        chatWindow.style.transform = 'scale(0.95) translateY(10px)';
        setTimeout(() => {
            chatWindow.style.display = 'none';
            if (chatIcon && closeIcon) {
                chatIcon.style.display = 'inline-block';
                closeIcon.style.display = 'none';
            }
        }, 300); // Match CSS transition time
    });

    sendButton.addEventListener('click', handleSendMessage);
    inputField.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            handleSendMessage();
        }
    });

    function handleSendMessage() {
        const messageText = inputField.value.trim();
        if (messageText) {
            addMessageToChat('user', messageText);
            inputField.value = '';
            getBotResponse(messageText);
        }
    }

    function addMessageToChat(sender, messageText) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('chatbot-message', sender);
        
        const p = document.createElement('p');
        p.textContent = messageText;
        messageDiv.appendChild(p);
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight; // Scroll to the bottom
    }

    const OPENROUTER_API_KEY = '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';

    async function getBotResponse(userInput) {
        addMessageToChat('bot', 'Thinking...'); // Show thinking message immediately
        const messagesContainer = document.getElementById('chatbot-messages');

        console.log("[Chatbot Debug] OpenRouter API Key being used:", OPENROUTER_API_KEY);
        const headers = {
            'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
            'Content-Type': 'application/json'
        };
        console.log("[Chatbot Debug] Request Headers:", JSON.stringify(headers));

        try {
            const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({
                    model: 'openai/gpt-3.5-turbo', // Or your preferred model
                    messages: [
                        { role: 'system', content: 'You are a helpful assistant for Simplexify, an online learning platform. Be concise and friendly.' },
                        { role: 'user', content: userInput }
                    ]
                })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: response.statusText }));
                console.error('OpenRouter API Error:', response.status, errorData);
                updateLastBotMessage(`Sorry, I encountered an error: ${errorData.error ? errorData.error.message : errorData.message}. Please try again.`);
                return;
            }

            const data = await response.json();
            const botReply = data.choices[0]?.message?.content.trim();

            if (botReply) {
                updateLastBotMessage(botReply);
            } else {
                updateLastBotMessage("Sorry, I didn't get a response. Please try again.");
            }

        } catch (error) {
            console.error('Failed to fetch from OpenRouter API:', error);
            updateLastBotMessage('Sorry, I am having trouble connecting. Please check your internet connection or try again later.');
        }
    }

    function updateLastBotMessage(newText) {
        const messagesContainer = document.getElementById('chatbot-messages');
        const thinkingMessage = messagesContainer.querySelector('.chatbot-message.bot:last-child p');
        if (thinkingMessage && (thinkingMessage.textContent === 'Thinking...' || thinkingMessage.textContent.startsWith('Sorry,'))) {
            thinkingMessage.textContent = newText;
        } else {
            addMessageToChat('bot', newText); // Fallback if 'Thinking...' was not found or already replaced
        }
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Optional: Add a small animation to the toggle button on load
    toggleButton.style.transform = 'scale(0)';
    setTimeout(() => {
        toggleButton.style.transition = 'transform 0.3s ease-out';
        toggleButton.style.transform = 'scale(1)';
    }, 500); 

    console.log('Chatbot initialized.');
}
