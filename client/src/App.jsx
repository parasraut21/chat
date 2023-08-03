// import "./App.css";
// import io from "socket.io-client";
// import { useEffect, useState } from "react";

// const socket = io.connect("http://localhost:8000");

// function App() {
//   //Room State
//   const [room, setRoom] = useState("");

//   // Messages States
//   const [message, setMessage] = useState("");
//   const [messageReceived, setMessageReceived] = useState("");

//   const joinRoom = () => {
//     if (room !== "") {
//       socket.emit("join_room", room);
//     }
//   };

//   const sendMessage = () => {
//     socket.emit("send_message", { message, room });
//   };

//   useEffect(() => {
//     socket.on("receive_message", (data) => {
//       console.log(data)
//       setMessageReceived(data.message);
//     });
//   }, [socket]);
//   return (
//     <div className="App">
//       <input
//         placeholder="Room Number..."
//         onChange={(event) => {
//           setRoom(event.target.value);
//         }}
//       />
//       <button onClick={joinRoom}> Join Room</button>
//       <input
//         placeholder="Message..."
//         onChange={(event) => {
//           setMessage(event.target.value);
//         }}
//       />
//       <button onClick={sendMessage}> Send Message</button>
//       <h1> Message:</h1>
//       {messageReceived}
//     </div>
//   );
// }

// export default App;

// App.jsx
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NameEntry from "./components/NameEntry";
import EnterRoom from "./components/EnterRoom";
import RoomPage from "./components/RoomPage";

function App() {
  const [userName, setUserName] = useState("");
  const [joinedRoom, setJoinedRoom] = useState(null);

  // if (joinedRoom) {
  //   return <RoomPage  userName={userName} />;
  // }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<NameEntry setName={setUserName} />} />
        <Route path="/room" element={<RoomPage setName={setUserName} />} />
      </Routes>
    </Router>
  );
}

export default App;