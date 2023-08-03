// NameEntry.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function NameEntry({ setName }) {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (userName.trim() !== "") {
      setName(userName.trim());
      navigate("/room", { state: { userName: userName.trim() } });
    }
  };

  return (
    <div>
      <form onSubmit={handleNameSubmit}>
        <input
          placeholder="Your Name..."
          value={userName}
          onChange={(event) => {
            setUserName(event.target.value);
          }}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default NameEntry;
