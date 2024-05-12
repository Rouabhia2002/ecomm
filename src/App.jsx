import React from 'react';
import { Routes, Route } from "react-router-dom";
import { Container } from 'react-bootstrap';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Navbar } from './components/Navbar';
import { Store } from './pages/Store';

function App() {
  return (
    <>
      <Navbar />
      <Container>
          <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/store" element={<Store />} />
          </Routes>
      </Container>
    </>
  );
}

export default App;
