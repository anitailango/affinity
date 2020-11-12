import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const HeaderContainer = styled.div`
    font-size: .75rem;
    font-family: 'avenir next', avenir, sans-serif;
    float: left;
    text-transform: uppercase;
    letter-spacing: .1em;
    color: gray;
    font-weight: 600;
    margin-top: .4rem;
    margin-bottom: .4rem;
`

export const Header = (props) => (
    <HeaderContainer>
        {props.text} 
        {props.children}
    </HeaderContainer>            
);

Header.propTypes = {
    text: PropTypes.string.isRequired
}

const TextContainer = styled.div`
    font-size: .75rem;  
    font-weight: 500;
    color: dark-gray;
    float: none;
    margin-top: .2rem;
    margin-bottom: .2rem;
    font-family: 'avenir next', avenir, sans-serif;
`

export const Text = (props) => (
    <TextContainer>
        {props.text}
        {props.children}
    </TextContainer>        
);

Text.propTypes = {
    text: PropTypes.string.isRequired
}

// export const ExtensionHeader = (props) => (<div className="pa3 flex justify-between" style={{height: "52px"}}>{props.children}</div>);
const ExtensionHeaderDiv = styled.div`
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    height: 52px;
`
export const ExtensionHeader = (props) => (<ExtensionHeaderDiv>{props.children}</ExtensionHeaderDiv>);

const ExtensionBodyDiv = styled.div`
    background-color: white;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    min-height: 250px;
    height: auto;
`
export const ExtensionBody = (props) => (<ExtensionBodyDiv>{props.children}</ExtensionBodyDiv>);

const PopupTitle = styled.div`
    width: 100%;
    font-size: 1.5rem;
    text-align: center;
`
export const PopupHeader = () => (
    <ExtensionHeader>
        <PopupTitle>
            Affinity                    
        </PopupTitle>            
    </ExtensionHeader>
);

const PurpleFormButtonInput = styled.input`
    background-color: #9A5B85;
    color: white;
    border: 3px solid #9A5B85;
    border-radius: 3px;
    padding: .5rem 1rem;
    width: 40%;
    -webkit-appearance: none;
    -moz-appearance: none;
    -moz-osx-font-smoothing: grayscale;
    backface-visibility: hidden;
    transform: translateZ(0);
    transition: transform 0.25s ease-out;
    cursor: pointer;
    font-size: 1rem;
    display: inline-block;

    &:hover {
        transform: scale(1.08);
    }
`

export const PurpleFormButton = (props) => (
    <PurpleFormButtonInput type="button" value={props.text} onClick={props.onClick} />
);

PurpleFormButton.propTypes = {
    text: PropTypes.string.isRequired
}

const WhiteFormButtonInput = styled.input`
    background-color: transparent;
    color: #9A5B85;
    border: 1px solid #9A5B85;
    border-radius: 3px;
    padding: .5rem 1rem;
    -webkit-appearance: none;
    -moz-appearance: none;
    -moz-osx-font-smoothing: grayscale;
    backface-visibility: hidden;
    transform: translateZ(0);
    transition: transform 0.25s ease-out;
    cursor: pointer;
    font-size: 1rem;
    display: inline-block;

    &:hover {
        transform: scale(1.08);
    }
`

export const WhiteFormButton = (props) => (
    <WhiteFormButtonInput type="submit" value={props.text} />
);

WhiteFormButton.propTypes = {
    text: PropTypes.string.isRequired
}


// export const EmailInput = (props) => (
//     <div>
//         <label className="gray db fw6 lh-copy f6" for="email-address">Email</label>
//         <input className="pa2 br2 b--gray input-reset ba bg-transparent w-100" type="email" name="email-address"  id="email-address" />
//     </div>
// )

// export const PasswordInput = (props) => (
//     <div>
//         <label className="gray db fw6 lh-copy f6" for="password">Password</label>
//         <input className="b br2 b--gray pa2 input-reset ba bg-transparent  w-100" type="password" name="password"  id="password" />
//     </div>    
// )

// export const ConfirmPasswordInput = (props) => (
//     <div>
//         <label className="gray db fw6 lh-copy f6" for="confirm-password">Confirm Password</label>
//         <input className="b br2 b--gray pa2 input-reset ba bg-transparent  w-100" type="password" name="confirm-password"  id="confirm-password" />
//     </div>    
// );
