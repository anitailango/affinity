import React from 'react';
import PropTypes from 'prop-types';

import { Header, Text, ExtensionBody } from '../GenericComponents/GenericComponents';

const RatingView = (props) => (
    <ExtensionBody>
        <Header text="Title" />
        <Text text={props.title} />
        <Header text="Author" />
        <Text text={props.author} />
        <Header text="Publisher" />
        <Text text={props.publisher} />
        <Header text="Rating" />
        <Text text={props.rating} />
    </ExtensionBody>
);

RatingView.propTypes = {
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    publisher: PropTypes.string.isRequired,
    rating: PropTypes.string.isRequired
}

export default RatingView;