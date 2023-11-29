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
  MDBBtn,
} from "mdb-react-ui-kit";
import { Scrollbars } from 'react-custom-scrollbars';

import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import './chat.css';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const userMessage = {
      role: "user",
      content: newMessage.trim(),
    };

    setMessages(messages => [...messages, userMessage]);

    try {
      const response = await fetch('http://localhost:3001/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: newMessage, conversationHistory: messages }),
      });

      const data = await response.json();
      setMessages(messages => [...messages, { role: "assistant", content: data.message }]);
    } catch (error) {
      console.error("Error al enviar mensaje:", error);
    }

    setNewMessage("");
  };

  return (
    <MDBContainer fluid className="py-5" style={{ backgroundColor: "#eee" }}>
      <MDBRow className="d-flex justify-content-center">
        <MDBCol md="10" lg="8" xl="6">
          <MDBCard id="chat2" style={{ borderRadius: "15px" }}>
            <MDBCardHeader className="d-flex justify-content-between align-items-center p-3">
              <h5 className="mb-0">Chat</h5>
              
            </MDBCardHeader>

            <Scrollbars suppressScrollX style={{ position: "relative", height: "500px" }}>
              <MDBCardBody>
                {messages.map((msg, index) => (
                  <div key={index} className={`d-flex flex-row ${msg.role === "user" ? "justify-content-end" : "justify-content-start"} mb-4`}>
                    <div>
                      <p className={`big p-2 me-3 mb-1 ${msg.role === "user" ? "text-white rounded-3 bg-primary" : "rounded-3"} `} style={{ backgroundColor: msg.role === "user" ? "" : "#f5f6f7" }}>
                        {msg.content}
                      </p>
                    </div>
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
