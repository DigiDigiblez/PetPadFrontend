import "./Hero.scss";

import React from "react";

import Container from "../../atoms/Container";

const Hero = () => {
    const baseclass = "hero";

    return (
        <Container className={baseclass}>
            <div className={`${baseclass}__background`}/>
            <div className={`${baseclass}__text`}/>
            <div className={`${baseclass}__content`}>
                {/* Get user to authenticate using Auth0 */}
                <a href="https://fsnd2020.auth0.com/authorize?audience=petpad&response_type=token&client_id=Lhk2zF5M6CxLT4YoniUSIJMtelNQHmkR&redirect_uri=http://localhost:3000/register">
                    <button className="primary_cta">
                        Register for free!
                    </button>
                </a>
            </div>
        </Container>
    );
};

export default Hero;
