require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');

// Inicializa la aplicación Express
const app = express();

// Aplica CORS y permite el uso de JSON en las solicitudes
app.use(cors());
app.use(express.json());

// Inicializa la instancia de OpenAI con la clave API
const openai = new OpenAI(process.env.OPENAI_API_KEY);

// Ruta para manejar las solicitudes de chat
app.post('/chat', async (req, res) => {
    try {
        const userMessage = req.body.message;
        const conversationHistory = req.body.conversationHistory || [];

        // Añade el mensaje del usuario al historial de la conversación
        conversationHistory.push({ role: "user", content: userMessage });

        // Llamada a la API de Chat Completions de OpenAI
        const response = await openai.chat.create({
            model: "gpt-4.0-turbo",
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                ...conversationHistory
            ],
        });

        // Añade la respuesta del asistente al historial de la conversación
        const botResponse = response.choices[0].message.content;
        conversationHistory.push({ role: "assistant", content: botResponse });

        res.json({ message: botResponse, conversationHistory });
    } catch (error) {
        console.error('Error al procesar la solicitud:', error);
        res.status(500).send('Error al procesar la solicitud');
    }
});

// Iniciar el servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});



const usuariosRouter = require("./routes/usuariosRoutes");

app.use("/usuarios", usuariosRouter);