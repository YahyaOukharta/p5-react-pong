import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from 'react-router-dom';

import Pong from "./components/Pong"
import Navbar from "./components/Navbar"

function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/about">
            about
          </Route>
          <Route path="/home">
            home
          </Route>
          <Route path="/"
            element={
            <Pong
              width={1000} height={700}
              initBallX={500} initBallY={350} ballRadius={50} ballSpeed={10}
              paddleWidth={30} paddleHeight={150} paddleSpeed={10}
            />
          }
          />

        </Routes>

      </BrowserRouter>

    </div>
  );
}

export default App;
