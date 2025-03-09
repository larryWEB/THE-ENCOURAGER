  // Chat state management
        const chatState = {
            userName: '',
            currentStep: 'askName',
            selectedOption: '',
            typingTimeout: null
        };

        // Chat responses for different options
        const responses = {
            HELP: "I understand you need help. Remember that asking for help is a sign of strength, not weakness. What specific area are you struggling with? Is it something practical, emotional, or perhaps both? I'm here to listen and provide guidance to the best of my ability. And remember, there's always a way forward even when it doesn't seem like it.",
            
            ENCOURAGEMENT: "You've got this! Life can be challenging, but I believe in your ability to overcome whatever obstacles are in your path. Remember how far you've already come and the challenges you've already conquered. Your strength is greater than you know, and every step forward, no matter how small, is progress. Keep going - brighter days are ahead!",
            
            ADVICE: "Before offering advice, I'd like to understand your situation better. What specific challenge are you facing? The best advice comes from truly understanding the context. Once I know more, I can help you explore different perspectives and possible solutions. Remember, you have the inner wisdom to make the right choices for yourself - sometimes we just need someone to help us see things more clearly.",
            
            "RELATIONSHIP ISSUES": "Relationships can be both our greatest joy and our deepest challenge. Whether you're dealing with miscommunication, trust issues, growing apart, or any other relationship concern, know that many people face similar struggles. Would you like to share what's happening in your relationship? Understanding the specific dynamic can help us explore constructive ways forward that honor both your needs and the relationship itself.",
            
            "CAREER ADVICE": "Career decisions are important as they affect so many aspects of our lives. Whether you're considering a change, facing workplace challenges, or seeking growth opportunities, I'm here to help. What specific aspect of your career are you thinking about? Together we can explore options that align with your values, skills, and aspirations.",
            
            MOTIVATION: "When motivation wanes, remember your 'why' - the deeper purpose behind your goals. Break large tasks into smaller, manageable steps and celebrate each accomplishment. Consider what sparked your passion initially and reconnect with that feeling. Remember that motivation often follows action rather than preceding it - sometimes simply beginning, even with small steps, can reignite your drive.",
            
            "MENTAL HEALTH": "Your mental health is just as important as your physical health. If you're struggling, please know you're not alone. Many people face similar challenges, and reaching out is a brave first step. While I can offer support, please consider speaking with a mental health professional who can provide personalized care. Would you like to share what you're experiencing? I'm here to listen without judgment.",
            
            "SPIRITUAL GUIDANCE": "Spiritual journeys are deeply personal and meaningful paths of discovery. Whether you're exploring faith, seeking deeper meaning, or navigating questions about purpose, this is sacred ground. What aspect of your spiritual life are you reflecting on? I'm here to provide supportive space for your exploration, knowing that each person's path is unique and valuable.",
            
            "GOAL SETTING": "Setting meaningful goals is powerful for creating the life you want. The most effective goals are specific, measurable, achievable, relevant, and time-bound. What area of your life would you like to set goals for? Together, we can develop clear objectives and practical steps to move you toward what matters most to you.",
            
            "PERSONAL GROWTH": "Personal growth is a lifelong journey of becoming more fully yourself. This can involve developing new skills, healing past wounds, building self-awareness, or cultivating qualities you admire. What aspect of personal development are you most interested in right now? I'm here to support your journey of becoming your best self."
        };

        // DOM Elements
        const chatIcon = document.getElementById('chatIcon');
        const chatContainer = document.getElementById('chatContainer');
        const closeChat = document.getElementById('closeChat');
        const chatMessages = document.getElementById('chatMessages');
        const userInput = document.getElementById('userInput');
        const sendButton = document.getElementById('sendButton');
        const chatInputArea = document.getElementById('chatInputArea');

        // Event Listeners
        chatIcon.addEventListener('click', toggleChat);
        closeChat.addEventListener('click', toggleChat);
        sendButton.addEventListener('click', handleUserInput);
        userInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleUserInput();
            }
        });

        // Functions
        function toggleChat() {
            const isVisible = chatContainer.style.display === 'flex';
            chatContainer.style.display = isVisible ? 'none' : 'flex';
            
            if (!isVisible && chatState.currentStep === 'askName') {
                setTimeout(() => {
                    addBotMessage("Hello! I'm here to support and encourage you. Could you please share your name?");
                }, 500);
            }
        }

        function handleUserInput() {
            const message = userInput.value.trim();
            if (message === '') return;
            
            addUserMessage(message);
            userInput.value = '';
            
            processUserInput(message);
        }

        function processUserInput(message) {
            switch(chatState.currentStep) {
                case 'askName':
                    chatState.userName = message;
                    chatState.currentStep = 'greet';
                    showTypingIndicator();
                    setTimeout(() => {
                        const greeting = getTimeBasedGreeting();
                        addBotMessage(`${greeting}, ${chatState.userName}! How can I help you today?`);
                        showOptions();
                    }, 1000);
                    break;
                    
                case 'options':
                    handleOptionSelection(message);
                    break;
                    
                case 'chatting':
                    showTypingIndicator();
                    setTimeout(() => {
                        addBotMessage("Thank you for sharing. Would you like to connect directly with Omojay, the founder of this platform? She can provide more personalized guidance.");
                        addButtons(["Yes, connect me with Omojay", "No, thank you"]);
                        chatState.currentStep = 'askConnectWithOmojay';
                    }, 1500);
                    break;
                    
                case 'askConnectWithOmojay':
                    if (message.toLowerCase().includes('yes')) {
                        // WhatsApp integration would go here in a real implementation
                        const summaryMessage = `New message from ${chatState.userName} regarding ${chatState.selectedOption}`;
                        addBotMessage(`Great! I'm connecting you with Omojay now. Your conversation details have been shared. Please click the button below to start your WhatsApp chat.`);
                        
                        // Create WhatsApp link - in a real implementation this would use the WhatsApp API
                        const whatsappLink = document.createElement('a');
                        whatsappLink.href = `https://wa.me/2348115539776?text=${encodeURIComponent(summaryMessage)}`;
                        whatsappLink.target = '_blank';
                        whatsappLink.className = 'option-button';
                        whatsappLink.textContent = 'Chat with Omojay on WhatsApp';
                        
                        const buttonContainer = document.createElement('div');
                        buttonContainer.className = 'buttons-container';
                        buttonContainer.appendChild(whatsappLink);
                        
                        const messageDiv = document.createElement('div');
                        messageDiv.className = 'message bot-message';
                        messageDiv.appendChild(buttonContainer);
                        chatMessages.appendChild(messageDiv);
                        
                        chatState.currentStep = 'end';
                    } else {
                        addBotMessage(`No problem, ${chatState.userName}. Is there anything else I can help you with?`);
                        showOptions();
                    }
                    break;
            }
            
            // Auto scroll to the bottom
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        function addUserMessage(message) {
            const messageDiv = document.createElement('div');
            messageDiv.className = 'message user-message';
            messageDiv.textContent = message;
            chatMessages.appendChild(messageDiv);
        }

        function addBotMessage(message) {
            hideTypingIndicator();
            const messageDiv = document.createElement('div');
            messageDiv.className = 'message bot-message';
            messageDiv.textContent = message;
            chatMessages.appendChild(messageDiv);
        }

        function showTypingIndicator() {
            const typingDiv = document.createElement('div');
            typingDiv.className = 'message bot-message typing-indicator';
            typingDiv.id = 'typingIndicator';
            
            for (let i = 0; i < 3; i++) {
                const dot = document.createElement('span');
                typingDiv.appendChild(dot);
            }
            
            chatMessages.appendChild(typingDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        function hideTypingIndicator() {
            const indicator = document.getElementById('typingIndicator');
            if (indicator) {
                indicator.remove();
            }
        }

        function getTimeBasedGreeting() {
            const hour = new Date().getHours();
            if (hour < 12) return "Good morning";
            if (hour < 18) return "Good afternoon";
            return "Good evening";
        }

        function showOptions() {
            const options = [
                "HELP", 
                "ENCOURAGEMENT", 
                "ADVICE", 
                "RELATIONSHIP ISSUES", 
                "CAREER ADVICE", 
                "MOTIVATION", 
                "MENTAL HEALTH", 
                "SPIRITUAL GUIDANCE", 
                "GOAL SETTING", 
                "PERSONAL GROWTH"
            ];
            
            addBotMessage("Please select one of the following options:");
            addButtons(options);
            chatState.currentStep = 'options';
        }

        function addButtons(options) {
            const buttonContainer = document.createElement('div');
            buttonContainer.className = 'buttons-container';
            
            options.forEach(option => {
                const button = document.createElement('button');
                button.className = 'option-button';
                button.textContent = option;
                button.addEventListener('click', () => {
                    userInput.value = option;
                    handleUserInput();
                });
                buttonContainer.appendChild(button);
            });
            
            const messageDiv = document.createElement('div');
            messageDiv.className = 'message bot-message';
            messageDiv.appendChild(buttonContainer);
            chatMessages.appendChild(messageDiv);
        }

        function handleOptionSelection(option) {
            const normalizedOption = option.toUpperCase();
            chatState.selectedOption = option;
            
            // Look for exact match first, then partial match
            let responseText = responses[normalizedOption];
            
            if (!responseText) {
                // Try to find a partial match
                for (const key of Object.keys(responses)) {
                    if (normalizedOption.includes(key) || key.includes(normalizedOption)) {
                        responseText = responses[key];
                        chatState.selectedOption = key;
                        break;
                    }
                }
            }
            
            // If still no match, use a default response
            if (!responseText) {
                responseText = "I understand you need support with " + option + ". Could you tell me more about what you're experiencing? I'm here to listen and help however I can.";
                chatState.selectedOption = option;
            }
            
            showTypingIndicator();
            setTimeout(() => {
                addBotMessage(responseText);
                chatState.currentStep = 'chatting';
            }, 1500);
        }