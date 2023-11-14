import React from 'react';
import {Route , Routes} from 'react-router-dom'
import Donations from './Pages/Donations'
import Total from './Pages/Total'
import Home from './Pages/Home'
import {WebSocketProvider} from './Context/Webscoket'
import './App.css';
function App() {
  return (
    <div className="App">
    <>
    <WebSocketProvider>

    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/donations" element={<Donations />} />
        <Route path="/total" element={<Total />} />
    </Routes>

    </WebSocketProvider>
    </>
    </div>
  );
}

export default App;
