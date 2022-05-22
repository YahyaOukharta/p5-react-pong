import React from 'react';
import './App.css';

import Pong from "./components/Pong"

function App() {
  return (
    <div className="App">

      <Pong 
        width={1000} height={700}
        initBallX={500} initBallY={350} ballRadius={50} ballSpeed={10} 
        paddleWidth={30} paddleHeight={150} paddleSpeed={10} 
        />
    </div>
  );
}

export default App;
