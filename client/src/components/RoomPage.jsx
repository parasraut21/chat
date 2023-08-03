// RoomPage.jsx
import { useEffect, useState } from "react";
import io from "socket.io-client";
import { useLocation } from "react-router-dom";

const RoomPage = () => {
  const location = useLocation();
  const [userName, setUserName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messagesList, setMessagesList] = useState([]);
  const [isRoomJoined, setIsRoomJoined] = useState(false); // State to track room join status
  const socket = io.connect("http://localhost:8000");

  useEffect(() => {
    const state = location.state;
    if (state && state.userName) {
      setUserName(state.userName);
    }
  }, [location]);

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
      setIsRoomJoined(true); // Set room join status to true
    }
  };

  const sendMessage = () => {
    socket.emit("send_message", { message, room, userName });
    setMessage(""); // Clear the input after sending the message
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      const receivedMessage = {
        userName1: data.userName, // Get the sender's name from the data
        message: data.message,
      };
      setMessagesList((prevMessages) => [...prevMessages, receivedMessage]);
    });
  }, [socket]);

  return (
    <div>
      <h2>Welcome, {userName}!</h2>
      {isRoomJoined ? (
        <h3>Room Number: {room}</h3>
      ) : (
        <div>
          <input
            placeholder="Room Number..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}> Join Room</button>
        </div>
      )}
      {isRoomJoined && (
        <div>
          <input
            placeholder="Message..."
            value={message}
            onChange={(event) => {
              setMessage(event.target.value);
            }}
          />
          <button onClick={sendMessage}> Send Message</button>
        </div>
      )}
      <h1> Messages:</h1>
      {messagesList.map((msg, index) => (
        <p key={index}>
          {msg.userName1}: {msg.message}
        </p>
      ))}
    </div>
  );
};

export default RoomPage;


