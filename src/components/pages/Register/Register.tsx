import React from "react";

import Container from "../../atoms/Container";
import Chrome from "../../templates/Chrome/Chrome";
import RegisterStageOne from "../../templates/RegisterStageOne";
import RegisterStageThree from "../../templates/RegisterStageThree";
import RegisterStageTwo from "../../templates/RegisterStageTwo";

const Register = () => {
    const baseclass = "register";

    const currentStep = Number(localStorage.getItem("currentStep"));

    function parseJwt(token: string) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) =>
            '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        ).join(''));

        return JSON.parse(jsonPayload);
    }

    // Grab authenticated user's bearer token (JWT) and stash it in local storage
    if (window.location.hash) {
        // Retrieve token from JWT data
        const JWT = window.location.hash.match(/#access_token=([^&]*)&/)![1];
        // Retrieve token permissions
        const JWTPermissions = parseJwt(JWT).permissions;

        // Determine user type from premium-only permission inclusion
        const premiumPermission = JWTPermissions.find((permission: string) => permission === "delete:post" || permission === "patch:post")
        const userType = premiumPermission ? "Premium User" : "Free User";

        localStorage.setItem("jwt", JWT);
        localStorage.setItem("userType", userType);
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
