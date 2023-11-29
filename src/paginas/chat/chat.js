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
    if (!newMessage.trim()) return;

    const userMessage = {
      role: "user",
      content: newMessage.trim(),
    };

    const waitingMessage = {
      role: "waiting",
      content: "Waiting for a response...",
    };

    setMessages((messages) => [...messages, userMessage, waitingMessage]);

    setNewMessage("");

    try {
      const aiResponse = await getAIResponse(newMessage);
      setMessages((messages) => {
        // Elimina el mensaje de espera y agrega la respuesta de la IA.
        return [
          ...messages.filter((msg) => msg.role !== "waiting"),
          { role: "assistant", content: aiResponse },
        ];
      });
    } catch (error) {
      console.error("Error al enviar mensaje:", error);
      // Reemplaza el mensaje de espera con un mensaje de error.
      setMessages((messages) => [
        ...messages.filter((msg) => msg.role !== "waiting"),
        { role: "assistant", content: "Error getting response" },
      ]);
    }
  };

  return (
    <MDBContainer fluid className="py-5" style={{ backgroundColor: "#404039" }}>
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
  {messages.map((msg, index) => (
    <div key={index} className={`message ${msg.role}`}>
      <div className="message-header">
        <span className="status-dot"></span>
        <span className="role-name">{msg.role === "user" ? "me" : "koko"}</span>
      </div>
      <p className={`message-content ${msg.role === "user" ? "user-message" : msg.role === "assistant" ? "assistant-message" : "waiting-message"}`}>
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
