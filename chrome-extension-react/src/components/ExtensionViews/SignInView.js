import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import PopupDisplay from '../AuthView/PopupDisplay';
import * as GenericComponents from '../GenericComponents/GenericComponents';

const PopupOptions = {
    HIDDEN: 0,
    LOGIN: 1,
    REGISTER: 2,
}

const SignInView = () => {
    useEffect(() => {}, [localStorage.getItem('affinity_token')]); // listen to see if token is added or removed
    const [popupOption, setPopupOption] = useState(PopupOptions.HIDDEN);

    const handlePopup = (e) => {
        e.persist();
        switch(e.target.id) {
            case 'login':
                setPopupOption(PopupOptions.LOGIN);
                break;
            case 'register':
                setPopupOption(PopupOptions.REGISTER);
                break;
            default:
                break;
        }
    }

    let popup;
    switch (popupOption) {
        case PopupOptions.LOGIN:
            popup = <PopupDisplay isLogin={true} />
            break;
        case PopupOptions.REGISTER:
            popup = <PopupDisplay isLogin={false} />
            break;
        default:
            popup = null;
            break;
    }

    return (
        <GenericComponents.ExtensionBody>
            <SignInWrapper>
                    <ButtonWrapper >            
                        <RegisterButton id="register" type="button" value="REGISTER" onClick={handlePopup} />            
                    </ButtonWrapper>
                    <ButtonWrapper >
                        <LoginButton id="login"  type="submit" value="LOGIN" onClick={handlePopup} />                                
                    </ButtonWrapper>
            </SignInWrapper>
            { popup }

        </GenericComponents.ExtensionBody>            
    );      
}

const SignInWrapper = styled.div`
    height: 100%;
    margin-top: auto;
    margin-bottom: auto;
`

const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: center;
    width: 100%;
    padding-top: .2rem;
    padding-bottom: .2rem;
`

const RegisterButton = styled.input`
    background-color: #9A5B85;
    border: 1px solid #9A5B85;
    border-radius: 4px;
    color: white;
    padding: .6rem 1rem;
    -webkit-appearance: none;
    -moz-appearance: none;
    -moz-osx-font-smoothing: grayscale;
    backface-visibility: hidden;
    transform: translateZ(0);
    transition: transform 0.25s ease-out;
    cursor: pointer;
    font-weight: 600;
    font-size: 1rem;
    display: inline-block;
    width: 50%;

    &:hover {
        transform: scale(1.08);
    }
`

const LoginButton = styled.input`
    color: #9A5B85;
    background-color: white;
    border: 1px solid #9A5B85;
    border-radius: 4px;
    padding: .6rem 1rem;
    -webkit-appearance: none;
    -moz-appearance: none;
    -moz-osx-font-smoothing: grayscale;
    backface-visibility: hidden;
    transform: translateZ(0);
    transition: transform 0.25s ease-out;
    cursor: pointer;
    font-weight: 600;
    font-size: 1rem;
    display: inline-block;
    width: 50%;

    &:hover {
        transform: scale(1.08);
    }
`

export default SignInView;