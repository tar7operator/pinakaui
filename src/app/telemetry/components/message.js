// pages/index.js
import { useEffect, useRef, useState } from 'react';

export default function Chat() {
    const [messages, setMessages] = useState(["Message 1", "Message 2", "Message 3"]);
    const [input, setInput] = useState("");
    const messagesEndRef = useRef(null);

    // Scroll to the last message
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = () => {
        if (input.trim() !== "") {
            setMessages([...messages, input]);
            setInput("");
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.chatContainer}>
                <div style={styles.messages}>
                    {messages.map((message, index) => (
                        <div key={index} style={styles.message}>{message}</div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
                <div style={styles.inputContainer}>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type a message..."
                        style={styles.input}
                    />
                    <button onClick={sendMessage} style={styles.button}>Send</button>
                </div>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f4f4f4",
    },
    chatContainer: {
        width: "400px",
        height: "500px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white",
    },
    messages: {
        flex: 1,
        overflowY: "auto",
        padding: "10px",
        boxSizing: "border-box",
    },
    message: {
        margin: "5px 0",
        padding: "8px 12px",
        backgroundColor: "#e0e0e0",
        borderRadius: "5px",
        maxWidth: "80%",
    },
    inputContainer: {
        display: "flex",
        padding: "10px",
        borderTop: "1px solid #ccc",
        boxSizing: "border-box",
    },
    input: {
        flex: 1,
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        outline: "none",
    },
    button: {
        marginLeft: "10px",
        padding: "10px 15px",
        border: "none",
        borderRadius: "5px",
        backgroundColor: "#007bff",
        color: "white",
        cursor: "pointer",
    },
};
