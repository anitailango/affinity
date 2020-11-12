import React, { useEffect, useState } from 'react';
import NewWindow from 'react-new-window';
import PropTypes from 'prop-types';

import * as axios from 'axios';
import styled from 'styled-components';
import ReactLoading from 'react-loading';

import * as GenericComponents from '../GenericComponents/GenericComponents';
/** 
 * Component which defines popup window for login/register
 */

 // backend endpoint, temporarily set to localhost
 const server = "http://127.0.0.1:8000";


const PopupDisplay = (props) => {
    const [isLogin, setIsLogin] = useState(props.isLogin);
    const [userData, setUserData] = useState({first_name: '', last_name: '', email: '', password: '', confirm_password: ''});
    const [errors, setErrors] = useState([]); // this will be used to display errors in registering/logging in users, if any
    const [loading, setLoading] = useState(false); // use to indicate loading while waiting on requests
    useEffect(() => {}, [isLogin]); // listen for changes to isLogin or errors
    useEffect(() => {}, [errors]);

    // reset information when switching between login and register
    const handleToggle = () => {
        setIsLogin(!isLogin);
        if (errors.length > 0) {
            setErrors([]);            
        }
        setUserData({first_name: '', last_name: '', email: '', password: '', confirm_password: ''});
    }    

    // update state when user enters information
    const handleUserInput = (e) => {
        e.persist();
        switch (e.target.id) {
            case 'first-name':
                setUserData(state => ({...state, first_name: e.target.value}));
                return;
            case 'last-name':
                setUserData(state => ({...state, last_name: e.target.value}));
                return;
            case 'email-address':
                setUserData(state => ({...state, email: e.target.value}));
                return;
            case 'password':
                setUserData(state => ({...state, password: e.target.value}));
                return;
            case 'confirm-password':
                setUserData(state => ({...state, confirm_password: e.target.value}));
                return;
            default:
                return;
        }
    }


    // called when login or register is clicked
    const submitInfo = async () => {
        const first_name = userData.first_name.trim();
        const last_name = userData.last_name.trim();
        const email = userData.email.trim();
        const password = userData.password.trim();
        const confirm_password = userData.confirm_password.trim();
        let list_errors = []; // keep track of any validation errors
        if (isLogin) {
            // handle login submission 
            if (email === '') {
                list_errors.push('Please enter your email.');
            }
            if (password === '') {
                list_errors.push('Please enter your password.');
            }
            if (list_errors.length > 0) {
                setErrors(list_errors);
                return;
            }
            // at this point, there is an email and password entered, need to post it to server
            setLoading(true);
            const res = await axios.post(
                server + '/users/',
                {
                    action: 'loginUser',
                    email: email,
                    password: password
                },
                {
                    validateStatus: function (status) {
                        return status >= 200 && status <= 400;
                    }
                }
            );

            if (res.data.success === false) { // problem with post
                setErrors([res.data['error']]); // display error message from server
            } else {
                localStorage.setItem('affinity_token', res.data.data.token); // set token
                localStorage.setItem('affinity_email', res.data.data.email); // set token
                localStorage.setItem('affinity_first_name', res.data.data.first_name); // set token
                localStorage.setItem('affinity_last_name', res.data.data.last_name); // set token
                window.close(); // close the extension to re-render the elements
            }
            setLoading(false);
            
        } else {
            // handle registration submission        
            if (first_name === '') {
                list_errors.push('Please enter a valid first name.')
            }
            if (last_name === '') {
                list_errors.push('Please enter a valid last name.')
            }
            if (email === '') {
                list_errors.push('Please enter a valid email account.')
            }
            if (password === '') {
                list_errors.push('Please enter a valid password.')
            }
            else if (password !== confirm_password) {
                list_errors.push('Please type matching passwords.')
            }

            if (list_errors.length > 0) { // if there were errors entering user info, update errors state
                setErrors(list_errors);
            } else {
                // everything is filled out correctly
                if (errors) {
                    setErrors([]); // update errors to empty list
                }

                // need to write post            
                setLoading(true); //set loading true
                console.log('here before response');
                const res = await axios.post(server + '/users/', {
                    action: 'createUser',
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    password: password
                }, {
                    validateStatus: function (status) {
                        return status >= 200 && status <= 400;
                    }
                });

                if (res.data['success'] === false) { // post failed
                    setErrors([res.data['error']]); // set error to be whatever backend returned
                } else {
                    setErrors(["User successfully created!"]);
                }
                setLoading(false);                
                // submit the registration and wait for response
            }
        }
    }

    // take error state and map them as red text on the popup window
    const mapErrorsToDisplay = () => {
        return errors.map((error) => (
            <ErrorMessage style={{color: "red"}}>
                {error}
            </ErrorMessage>
        ));
    }

    // if user token is set, display successfully logged in
    if (localStorage.getItem('affinity_token') !== null) {
        return (
        <NewWindow features={{width: "400px", height: "460px"}}>
            <WindowDiv>
                <GenericComponents.PopupHeader />                
                <GenericComponents.ExtensionBody>
                    Successfully logged in!
                </GenericComponents.ExtensionBody>
            </WindowDiv>
        </NewWindow>
        );
    } else {    // else show the login/register popup
        return (
            <NewWindow features={{width: "400px", height: "460px"}}>
                <WindowDiv>
                    <GenericComponents.PopupHeader />                
                    <GenericComponents.ExtensionBody>
                        <FormBody>
                            <PopupForm >
                                <FormFieldset id="sign_up" >
                                    { loading ? 
                                            <ReactLoading type="balls" color="#9A5B85" height="20px" width="40px" />
                                        :
                                            null
                                    }
                                    {
                                        isLogin ?
                                            null
                                        :
                                        <div>
                                            <FormRow>
                                                <div>
                                                    <FormLabel for="first-name">First Name</FormLabel>
                                                    <FormInput value={userData.first_name} onChange={handleUserInput} type="text" name="first-name"  id="first-name" />
                                                </div>    
                                            </FormRow>
                                            <FormRow>
                                                <div>
                                                    <FormLabel for="last-name">Last Name</FormLabel>
                                                    <FormInput value={userData.last_name} onChange={handleUserInput} type="text" name="last-name"  id="last-name" />
                                                </div>    
                                            </FormRow>
                                        </div>
                                    }
                                    <FormRow>
                                        <FormLabel for="email-address">Email</FormLabel>
                                        <FormInput value={userData.email} onChange={handleUserInput} type="email" name="email-address"  id="email-address" />
                                    </FormRow>
                                    <FormRow>
                                        <FormLabel for="password">Password</FormLabel>
                                        <FormInput value={userData.password} onChange={handleUserInput} type="password" name="password"  id="password" />
                                    </FormRow>                                
                                    {   
                                        isLogin ? 
                                            null
                                        :
                                            <div>
                                                <FormRow>
                                                    <FormLabel for="confirm-password">Confirm Password</FormLabel>
                                                    <FormInput value={userData.confirm_password} onChange={handleUserInput} type="password" name="confirm-password" id="confirm-password" />
                                                </FormRow>
                                            </div>                                        
                                    }
                                </FormFieldset>
                                {
                                    errors.length > 0 ?
                                        mapErrorsToDisplay()
                                    :
                                        null
                                }
                                <div style={{textAlign: "center"}}>
                                    { 
                                        isLogin ? 
                                            <GenericComponents.PurpleFormButton text='LOGIN' onClick={() => submitInfo()} />
                                        :
                                            <GenericComponents.PurpleFormButton text="REGISTER" onClick={() => submitInfo()} />
                                    }
                                </div>
                                <FormRow>
                                    <FormSwitchLink 
                                        onClick={() => handleToggle()} 
                                    >
                                        { 
                                            isLogin ?
                                                <div>Not a member yet? Register here.</div>
                                            :
                                                <div>Already a member? Login here.</div>
                                        }                                
                                    </FormSwitchLink>
                                </FormRow>                            
                            </PopupForm>
                        </FormBody>
                    </GenericComponents.ExtensionBody>
                </WindowDiv>
            </NewWindow>
        );
    }
}

const WindowDiv = styled.div`
    background-color: #F8F8F8;
    font-family:'avenir next', avenir, sans-serif;
`

// "pa4 pv2 black-80 avenir"
const FormBody = styled.main`
    padding: .5rem 1.5rem;
    color: black;
    font-family:'avenir next', avenir,
               sans-serif;
`

const PopupForm = styled.form`
    max-width: 30em;
    margin-right: auto;
    margin-left: auto;
`

const FormFieldset = styled.fieldset`
    border: 1px solid transparent;
    padding-left: 0;
    margin-left: 0;
`

const FormRow = styled.div`
    margin-top: 1rem;
    margin-bottom: 1rem;
    line-height: 1.5;
`

const FormLabel = styled.label`
    color: gray;
    width: 50;
    float: left;
    font-weight: 600;
    font-size: .875rem;
    line-height: 1.5;
    display: block;
`
// b br2 b--gray pa2 input-reset ba bg-transparent w-100
const FormInput = styled.input`
padding: 0.5rem;
border-radius: 3px;
border: 1px solid gray;
padding: .5rem;
background-color: transparent;
width: 100%;
appearance: none;
`

const FormSwitchLink = styled.a`
    font-weight: 600;
    text-decoration: none;
    transition: color .15s ease-in;
    opacity: 1;
    transition:opacity .15s ease-in;
    display: block;
    cursor: pointer;

    &:hover {
        opacity: .5;
        color: gray;
    }
`

const ErrorMessage = styled.p`
`;

PopupDisplay.propTypes = {
    isLogin: PropTypes.bool.isRequired
}



export default PopupDisplay;

