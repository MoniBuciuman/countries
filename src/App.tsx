import React from "react";
import "./App.css";
import { Header } from "./components/Header";
import { Container } from "react-bootstrap";
import { CountriesList } from "./components/CountriesList";

function App() {
  return (
    <Container>
      <Header />
      <CountriesList />
    </Container>
  );
}

export default App;
