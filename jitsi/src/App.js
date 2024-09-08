// src/App.js
import React, { useState } from "react";
import JitsiMeetingComponent from "./JistiMeetingComponent";


const App = () => {
  const [roomName, setRoomName] = useState("");
  const [userName, setUserName] = useState("");
  const [isMeetingStarted, setIsMeetingStarted] = useState(false);

  const handleStartMeeting = () => {
    if (roomName && userName) {
      setIsMeetingStarted(true);
    }
  };

  return (
    <div className="App">
      {!isMeetingStarted ? (
        <div>
          <input
            type="text"
            placeholder="Room Name"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Your Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <button onClick={handleStartMeeting}>Start Meeting</button>
        </div>
      ) : (
        <JitsiMeetingComponent roomName={roomName} userName={userName} />
      )}
    </div>
  );
};

export default App;
