import React from "react";
import NavBar from "./components/NavBar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Prototype from "./components/Prototype.jsx";
import Dashboard from "./components/Dashboard.jsx";
import { Routes, Route } from "react-router-dom";
import styled from "styled-components";

const Section = styled.div``;

function App() {
  return (
    <Section>
      <Routes>
        <Route path="/" element={<Hero />} />

        {/* <Route path="/" element={<Prototype />} />
        <Route path="Dashboard" element={<Dashboard />} /> */}
      </Routes>
    </Section>
  );
}

export default App;
