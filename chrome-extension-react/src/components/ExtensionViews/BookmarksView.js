import React, { useEffect } from 'react';
import styled from 'styled-components';

import * as GenericComponents from '../GenericComponents/GenericComponents';
import SignInView from './SignInView';
import ComingSoonView from './ComingSoonView';


// temporarily just hold the user sign-in view
const BookmarksView = () => {
    const token = localStorage.getItem('affinity_token');
    useEffect(() => {}, [token]); // listen to see if token is added or removed
    // const ActualView = (
    //         <GenericComponents.ExtensionBody style={{height: "100%"}}>
    //             <BookmarksDiv>
    //                 Logged in!
    //             </BookmarksDiv>        
    //         </GenericComponents.ExtensionBody>
    // );
    const display = localStorage.getItem('affinity_token') ? <ComingSoonView feature="Bookmarks tab" /> : <SignInView />
    return (display);
}

const BookmarksDiv = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding-top: .2rem;
    padding-bottom: .2rem;
`

export default BookmarksView;