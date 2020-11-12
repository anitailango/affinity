import React from 'react'
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { ExtensionBody } from '../GenericComponents/GenericComponents';

const ComingSoonView = (props) => {
    return (
        <ExtensionBody>
            <ComingSoonWrapper>
                <ComingSoonTitle>{props.feature} is coming soon!</ComingSoonTitle>
                <ComingSoonSubtitle>{props.feature} is underdevelopment and will be available to Affinity users in the near future.</ComingSoonSubtitle>
            </ComingSoonWrapper>
        </ExtensionBody>
    );
}

ComingSoonView.propTypes = {
    feature: PropTypes.string.isRequired
}

export default ComingSoonView;

const ComingSoonWrapper = styled.div`
    display: flex;    
    flex-direction: column;
    width: 100%;
    height: 100%;
    margin-top: auto;
    margin-bottom: auto;
`

const ComingSoonTitle = styled.div`
    font-size: 2rem;
    text-align: center;
    color: #9A5B85;
    font-weight: 700;
    width: 100%;
`

const ComingSoonSubtitle = styled.div`
    font-size: 1rem;
    color: gray;
    font-weight: 600;
    padding-top: .5rem;
    width: 100%;
`