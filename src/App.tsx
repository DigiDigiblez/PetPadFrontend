import "./App.scss";

import React from "react";
import { BrowserRouter } from "react-router-dom";

import Container from "./components/atoms/Container";
import Routes from "./components/pages/Routes";

localStorage.setItem("currentStep", "1");

const App = () => {
    const baseclass = "app";

    return (
        <Container className={baseclass}>
            <BrowserRouter>
                <Routes />
            </BrowserRouter>
        </Container>
    );
};

export default App;
