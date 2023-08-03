// EnterRoom.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function EnterRoom({ setName }) {
  const [room, setRoom] = useState("");
  const navigate = useNavigate();

  const handleJoinRoom = (e) => {
    e.preventDefault();
    if (room.trim() !== "") {
      setName(room);
      navigate("/room");
    }
  };

  return (
    <div>
      <h2>Welcome, {setName}!</h2>
      <form onSubmit={handleJoinRoom}>
        <input
          placeholder="Room Number..."
          value={room}
          onChange={(event) => {
            setRoom(event.target.value);
          }}
        />
        <button type="submit">Join Room</button>
      </form>
    </div>
  );
}

export default EnterRoom;