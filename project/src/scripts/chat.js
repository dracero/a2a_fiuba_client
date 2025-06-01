/**
 * A2A Chat Interface JavaScript
 * Handles chat functionality including messaging, image uploads, and agent selection
 */
class A2AChatInterface {
    constructor() {
        this.messagesArea = document.getElementById('messagesArea');
        this.messageInput = document.getElementById('messageInput');
        this.sendBtn = document.getElementById('sendBtn');
        this.agentSelect = document.getElementById('agentSelect');
        this.fileInput = document.getElementById('fileInput');
        this.previewContainer = document.getElementById('previewContainer');
        this.imagePreview = document.getElementById('imagePreview');
        this.removePreview = document.getElementById('removePreview');
        this.typingIndicator = document.getElementById('typingIndicator');
        this.attachButton = document.getElementById('attachButton');
        
        this.selectedFile = null;
        this.currentAgent = '';
        
        this.initEventListeners();
    }

    initEventListeners() {
        this.sendBtn.addEventListener('click', () => this.sendMessage());
        this.messageInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });
        
        this.messageInput.addEventListener('input', () => this.autoResize());
        this.agentSelect.addEventListener('change', (e) => this.selectAgent(e.target.value));
        this.fileInput.addEventListener('change', (e) => this.handleFileSelect(e));
        this.removePreview.addEventListener('click', () => this.removeImagePreview());
        this.attachButton.addEventListener('click', () => this.fileInput.click());
    }

    autoResize() {
        this.messageInput.style.height = 'auto';
        this.messageInput.style.height = Math.min(this.messageInput.scrollHeight, 120) + 'px';
    }

    selectAgent(agentId) {
        this.currentAgent = agentId;
        if (agentId) {
            const agentNames = {
                'Física': 'Tutor de Física de sistemas de partículas',
                'creative': 'Agente Creativo',
                'technical': 'Agente Técnico',
                'analyzer': 'Analizador de Datos'
            };
            this.addMessage(`¡Perfecto! Ahora estás conectado con ${agentNames[agentId]}. ¿En qué puedo ayudarte?`, 'agent');
        }
    }

    handleFileSelect(event) {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            this.selectedFile = file;
            const reader = new FileReader();
            reader.onload = (e) => {
                this.imagePreview.src = e.target.result;
                this.previewContainer.classList.add('active');
            };
            reader.readAsDataURL(file);
        }
    }

    removeImagePreview() {
        this.selectedFile = null;
        this.previewContainer.classList.remove('active');
        this.fileInput.value = '';
    }

    async sendMessage() {
        const message = this.messageInput.value.trim();
        
        if (!message && !this.selectedFile) return;
        if (!this.currentAgent) {
            alert('Por favor selecciona un agente primero');
            return;
        }

        // Add user message
        this.addMessage(message, 'user', this.selectedFile);
        
        // Clear input
        this.messageInput.value = '';
        this.autoResize();
        this.removeImagePreview();
        
        // Show typing indicator
        this.showTyping();
        
        // Simulate API call to A2A agent
        try {
            const response = await this.callA2AAgent(message, this.selectedFile);
            this.hideTyping();
            this.addMessage(response, 'agent');
        } catch (error) {
            this.hideTyping();
            this.addMessage('Lo siento, hubo un error al comunicarme con el agente. Por favor intenta de nuevo.', 'agent');
        }
    }

    async callA2AAgent(message, file) {
        // Simulated API call - replace with actual A2A protocol implementation
        return new Promise((resolve) => {
            setTimeout(() => {
                const responses = [
                    'Entiendo tu consulta. Basándome en el protocolo A2A, puedo ayudarte con eso.',
                    'Interesante pregunta. Como agente especializado, te recomiendo considerar estos aspectos...',
                    'He procesado tu solicitud. Aquí tienes mi análisis detallado...',
                    'Gracias por compartir esa información. Mi respuesta como agente A2A es...'
                ];
                
                let response = responses[Math.floor(Math.random() * responses.length)];
                
                if (file) {
                    response += ' He analizado la imagen que compartiste y puedo ver elementos relevantes para tu consulta.';
                }
                
                resolve(response);
            }, 1500 + Math.random() * 2000);
        });
    }

    addMessage(text, sender, file = null) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.textContent = text;
        
        if (file) {
            const img = document.createElement('img');
            img.className = 'message-image';
            img.src = URL.createObjectURL(file);
            img.alt = 'Imagen compartida';
            contentDiv.appendChild(img);
        }
        
        messageDiv.appendChild(contentDiv);
        this.messagesArea.appendChild(messageDiv);
        this.scrollToBottom();
    }

    showTyping() {
        this.typingIndicator.classList.add('active');
        this.scrollToBottom();
    }

    hideTyping() {
        this.typingIndicator.classList.remove('active');
    }

    scrollToBottom() {
        setTimeout(() => {
            this.messagesArea.scrollTop = this.messagesArea.scrollHeight;
        }, 100);
    }
}

// Initialize the chat interface when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new A2AChatInterface();
});