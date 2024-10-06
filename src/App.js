// src/App.js
import React, { useState } from "react";
import "./styles.css";

function App() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");

  const addMessageToChat = (sender, message) => {
    setMessages([...messages, { sender, message }]);
  };

  const sendMessage = async () => {
    if (!userInput) return;

    // Add user message
    addMessageToChat("user", userInput);
    setUserInput(""); // Clear input

    try {
      const systemPrompt =
        "You are an AI assistant skilled in explaining complex scientific challenges. You specialize in biological research conducted in space and can guide users through the details of the 'Visualize Space Science' challenge, which aims to create scalable visualization tools for space-based biological experiments.";

      const response = await fetch("https://ai.potential.com/chatbot/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          system: systemPrompt,
          message: userInput,
          AI: "Ameen",
        }),
      });

      const data = await response.json();
      const botMessage = data.response;

      // Add bot message
      addMessageToChat("bot", botMessage);
    } catch (error) {
      console.error("Error:", error);
      addMessageToChat("bot", "Error communicating with the AI.");
    }
  };

  const handleInputChange = (e) => setUserInput(e.target.value);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="chat-container">
      <h2>Ask About Space Science Experiments</h2>
      <div id="chat-box" className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <strong>{msg.sender === "user" ? "You" : "Bot"}:</strong>{" "}
            {msg.message}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={userInput}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Ask something..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;
