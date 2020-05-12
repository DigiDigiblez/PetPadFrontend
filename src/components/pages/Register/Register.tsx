import React from "react";

import Container from "../../atoms/Container";
import Chrome from "../../templates/Chrome/Chrome";
import RegisterStageOne from "../../templates/RegisterStageOne";
import RegisterStageThree from "../../templates/RegisterStageThree";
import RegisterStageTwo from "../../templates/RegisterStageTwo";

const Register = () => {
    const baseclass = "register";

    const currentStep = Number(localStorage.getItem("currentStep"));

    // Grab authenticated user's bearer token (JWT) and stash it in local storage
    if (window.location.hash) {
        const JWT = window.location.hash.substring(1);
        localStorage.setItem("jwt", JWT);
    }

    return (
        <Container className={baseclass}>
            <Chrome>
                {currentStep === 1 && <RegisterStageOne/>}
                {currentStep === 2 && <RegisterStageTwo/>}
                {currentStep === 3 && <RegisterStageThree/>}
            </Chrome>
        </Container>
    );
};

export default Register;
