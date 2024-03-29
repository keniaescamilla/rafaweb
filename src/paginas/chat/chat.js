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
  const API_KEY = "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";
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const translateText = async (text) => {
    try {
      const response = await fetch('https://libretranslate.de/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: text,
          source: 'en',
          target: 'es',
          format: 'text'
        }),
      });

      const data = await response.json();
      return data.translatedText;
    } catch (error) {
      console.error("Error en la traducción:", error);
      return text; // Devuelve el texto original en caso de error
    }
  };

  const getAIResponse = async (userMessage, previousMessages) => {
    const messagesForAPI = [
      ...previousMessages.map((msg) => ({ role: msg.role, content: msg.content })),
      { role: "user", content: userMessage },
    ];

    const response = await fetch(`https://api.openai.com/v1/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4", // Cambia a "gpt-3.5-turbo" si prefieres usar ese modelo
        messages: messagesForAPI,
      }),
    });

    const data = await response.json();
    const responseText = data.choices && data.choices.length > 0
        ? data.choices[0].message.content
        : "No response";
    
    return translateText(responseText);
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const userMessage = {
      role: "user",
      content: newMessage.trim(),
    };

    setMessages((currentMessages) => [...currentMessages, userMessage]);

    try {
      const aiResponse = await getAIResponse(newMessage, messages);

      setMessages((currentMessages) => [
        ...currentMessages,
        { role: "assistant", content: aiResponse },
      ]);
    } catch (error) {
      console.error("Error al enviar mensaje:", error);
      setMessages((currentMessages) => [
        ...currentMessages,
        { role: "assistant", content: "Error getting response" },
      ]);
    }

    setNewMessage("");
  };

  const [isWelcomeVisible, setIsWelcomeVisible] = useState(true);

  return (
    <MDBContainer fluid className="py-5" style={{ backgroundColor: "#fff" }}>
      <MDBRow className="d-flex justify-content-center">
        <MDBCol md="12">
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
                        {msg.role === "user" ? "You" : "Psychologist"}
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
