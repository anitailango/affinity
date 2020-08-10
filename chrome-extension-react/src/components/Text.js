import React from 'react';

function Text(props) {
    return (
        <div className="f6 avenir ttm dark-gray fw5 fn mv2" style={styles}>
            {props.text}
        </div>
    )
}

const styles = {
    whiteSpace: "nowrap"
}

export default Text;