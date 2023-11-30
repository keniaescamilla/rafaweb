import React, { useState } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBCardFooter,
  MDBIcon,
} from "mdb-react-ui-kit";
import { Scrollbars } from "react-custom-scrollbars";

import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "./chat.css";
import welcomeImage from "../../imagenes/koko.png";

export default function Chat() {
  const API_KEY = "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"; // Reemplaza con tu API key
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const getAIResponse = async (prompt) => {
    const response = await fetch(`https://api.openai.com/v1/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 150,
      }),
    });

    const data = await response.json();
    return data.choices && data.choices.length > 0
      ? data.choices[0].text
      : "No response";
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return; // No enviar mensajes vacíos.

    const userMessage = {
      role: "user",
      content: newMessage.trim(),
    };

    // Agrega el mensaje del usuario al estado.
    setMessages((currentMessages) => [...currentMessages, userMessage]);

    // Aquí es donde normalmente enviarías el mensaje al backend o a la API de OpenAI.
    try {
      const aiResponse = await getAIResponse(newMessage);

      // Agrega la respuesta de la IA al estado.
      setMessages((currentMessages) => [
        ...currentMessages,
        { role: "assistant", content: aiResponse },
      ]);
    } catch (error) {
      console.error("Error al enviar mensaje:", error);
      // Manejo de errores, por ejemplo, agregar un mensaje de error al chat.
      setMessages((currentMessages) => [
        ...currentMessages,
        { role: "assistant", content: "Error getting response" },
      ]);
    }

    // Limpia el mensaje actual y oculta la sección de bienvenida.
    setNewMessage("");
    setIsWelcomeVisible(false);
  };

  const [isWelcomeVisible, setIsWelcomeVisible] = useState(true);

  return (
    <MDBContainer fluid className="py-5" style={{ backgroundColor: "#fff" }}>
      <MDBRow className="d-flex justify-content-center">
        <MDBCol md="10" lg="8" xl="10">
          <MDBCard id="chat2" style={{ borderRadius: "15px" }}>
            <MDBCardHeader className="d-flex justify-content-between align-items-center p-3">
              <h5 className="mb-0">Chat</h5>
            </MDBCardHeader>

            <Scrollbars
              suppressScrollX
              style={{ position: "relative", height: "500px" }}
            >
              <MDBCardBody>
                {isWelcomeVisible && (
                  <div className="welcome-section d-flex flex-column align-items-center justify-content-center">
                    <img
                      src={welcomeImage}
                      alt="Koko"
                      className="welcome-image"
                    />
                    <h1 className="welcome-title">Koko</h1>
                    <p className="welcome-description">
                      Chat empático para apoyo y bienestar emocional, enfocado
                      en escuchar y compartir recursos.
                    </p>
                  </div>
                )}

                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`d-flex flex-column ${
                      msg.role === "user"
                        ? "align-items-end"
                        : "align-items-start"
                    } mb-4`}
                  >
                    <div className="message-header">
                      <span
                        className={`status-dot ${
                          msg.role === "user" ? "user-img" : "assistant-img"
                        }`}
                      ></span>
                      <span className="role-name">
                        {msg.role === "user" ? "me" : "psychologist"}
                      </span>
                    </div>
                    <p
                      className={`message-content ${
                        msg.role === "user"
                          ? "user-message"
                          : "assistant-message"
                      }`}
                    >
                      {msg.content}
                    </p>
                  </div>
                ))}
              </MDBCardBody>
            </Scrollbars>

            <MDBCardFooter className="text-muted d-flex justify-content-start align-items-center p-3">
              <input
                type="text"
                className="form-control form-control-lg"
                id="exampleFormControlInput1"
                placeholder="Type message"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              />
              <a className="ms-3" href="#!" onClick={sendMessage}>
                <MDBIcon fas icon="paper-plane" />
              </a>
            </MDBCardFooter>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
