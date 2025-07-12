// Elementos del DOM
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

// Respuestas predefinidas del bot (luego puedes conectar a OpenAI)
const botResponses = [
    "Interesante pregunta. Según mis datos, podrías explorar más sobre el tema.",
    "¡Buena reflexión! Te recomiendo investigar en documentación oficial.",
    "No tengo una respuesta precisa ahora, pero puedo ayudarte a buscar soluciones.",
    "En mi experiencia, lo mejor es abordarlo paso a paso. ¿Quieres que te guíe?",
    "Eso depende de varios factores. ¿Podrías dar más detalles?"
];

function addMessage(content, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    
    // Ícono para el BOT (solo en mensajes del bot)
    if (!isUser) {
        const botIcon = document.createElement('img');
        botIcon.src = 'assets/bot-icon.png';
        botIcon.className = 'bot-icon';
        botIcon.alt = 'Bot';
        messageDiv.appendChild(botIcon);
    }

    // Contenido del mensaje
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    messageContent.textContent = content;
    messageDiv.appendChild(messageContent);

    // Ícono para el USUARIO (solo en mensajes del usuario)
    if (isUser) {
        const userIcon = document.createElement('img');
        userIcon.src = 'assets/user-icon.png'; // Asegúrate de tener este archivo
        userIcon.className = 'bot-icon';       // Usamos la misma clase para estilos
        userIcon.alt = 'Usuario';
        messageDiv.appendChild(userIcon);
    }

    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Función para simular "escribiendo..."
function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message typing';
    
    const botIcon = document.createElement('img');
    botIcon.src = 'assets/bot-icon.png';
    botIcon.className = 'bot-icon';
    botIcon.alt = 'Bot';
    typingDiv.appendChild(botIcon);

    const typingContent = document.createElement('div');
    typingContent.className = 'message-content';
    typingContent.textContent = 'Escribiendo';
    typingDiv.appendChild(typingContent);

    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    return typingDiv;
}

// Función para obtener respuesta del bot
function getBotResponse() {
    const randomIndex = Math.floor(Math.random() * botResponses.length);
    return botResponses[randomIndex];
}

// Event Listeners
sendButton.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

function sendMessage() {
    const message = userInput.value.trim();
    if (message === '') return;

    // Añadir mensaje de usuario
    addMessage(message, true);
    userInput.value = '';

    // Simular que el bot está escribiendo
    const typingIndicator = showTypingIndicator();

    // Respuesta del bot después de un retraso
    setTimeout(() => {
        chatMessages.removeChild(typingIndicator);
        const botResponse = getBotResponse();
        addMessage(botResponse);
    }, 1500);
}