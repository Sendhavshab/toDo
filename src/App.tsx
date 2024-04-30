// import React from 'react'
import DarkModeToggle from "./ModeToggel"
import P from "./P"

function App() {

  return (
    <div>
      <div className="dark:bg-gray-950">
        <DarkModeToggle></DarkModeToggle>
      </div>
      <P></P>
    </div>
  );
}

export default App

