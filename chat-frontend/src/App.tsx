import React from 'react';
import AppToolbar from "./components/UI/AppToolbar/AppToolbar";
import Messages from "./features/messages/Messages";


function App() {
  return (
    <>
        <header>
            <AppToolbar/>
        </header>
        <main>
            <Messages/>
        </main>
    </>
  );
}

export default App;
