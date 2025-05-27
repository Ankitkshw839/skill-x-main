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

    function getBotResponse(userInput) {
        // Simulate API call delay and bot thinking
        setTimeout(() => {
            addMessageToChat('bot', 'Thinking...');
            setTimeout(() => {
                // Replace the thinking message with the actual response
                const thinkingMessage = messagesContainer.querySelector('.chatbot-message.bot:last-child p');
                if (thinkingMessage && thinkingMessage.textContent === 'Thinking...') {
                    thinkingMessage.textContent = `Simplexify AI: "${userInput}" received. I'm still learning!`;
                } else { // Fallback if 'Thinking...' was not found (e.g., user sent another message quickly)
                    addMessageToChat('bot', `Simplexify AI: "${userInput}" received. I'm still learning!`);
                }
            }, 1500);
        }, 700);
    }

    // Optional: Add a small animation to the toggle button on load
    toggleButton.style.transform = 'scale(0)';
    setTimeout(() => {
        toggleButton.style.transition = 'transform 0.3s ease-out';
        toggleButton.style.transform = 'scale(1)';
    }, 500); 

    console.log('Chatbot initialized.');
}
