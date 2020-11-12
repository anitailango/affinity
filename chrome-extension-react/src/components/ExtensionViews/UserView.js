import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import * as GenericComponents from '../GenericComponents/GenericComponents';
import SignInView from './SignInView';

const UserView = () => {

    const [token, setToken] = useState(localStorage.getItem('affinity_token'));
    // useEffect(() => {}, [token]); // listen to see if token is added or removed

    const [userData, setUserData] = useState({
        token: localStorage.getItem('affinity_token'),
        email: localStorage.getItem('affinity_email'),
        first_name: localStorage.getItem('affinity_first_name'),
        last_name: localStorage.getItem('affinity_last_name')
    });

    useEffect(() => {
        setUserData({
            token: localStorage.getItem('affinity_token'),
            email: localStorage.getItem('affinity_email'),
            first_name: localStorage.getItem('affinity_first_name'),
            last_name: localStorage.getItem('affinity_last_name')
        });
    }, [localStorage.getItem('affinity_token'), localStorage.getItem('affinity_email'), localStorage.getItem('affinity_first_name'), localStorage.getItem('affinity_last_name')]);


    const logout = () => {
        localStorage.removeItem('affinity_token');
        localStorage.removeItem('affinity_email');
        localStorage.removeItem('affinity_first_name')
        localStorage.removeItem('affinity_last_name')
        setToken(null);
    }
    useEffect(() => {}, [token]); // listen to see if token is added or removed

    const UserViewDisplay = (
        <GenericComponents.ExtensionBody>
            <h2>
                Welcome, {userData.first_name}.
            </h2>
            <GenericComponents.Header text="Email"/>
            <GenericComponents.Text text={userData.email} />
            <SectionSpace />
            <UserLink href="https://affinityfornews.com/" >Newsletter Signup</UserLink>
            <UserLink href="#" >Change Password</UserLink>
            <UserLink href="#" onClick={() => logout()}>Logout</UserLink>

        </GenericComponents.ExtensionBody>
    );
    const current_view = localStorage.getItem('affinity_token') ? UserViewDisplay : <SignInView />;
    
    return (current_view);
}

const SectionSpace = styled.div`
    width: 100%;
    padding-top: .4rem;
`

const UserLink = styled.a`
    color: #9A5B85;
    text-transform: uppercase;
    font-size: .75rem;
    font-weight: 700;
    padding-top: .3rem;
    padding-bottom: .3rem;
`

// actual front end display for this component


export default UserView;