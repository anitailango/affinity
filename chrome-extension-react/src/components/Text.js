import React from 'react';

class Text extends React.Component {

    render() {
        return (
            <div className="f4 avenir ttm dark-gray fw5 fn mv2" style={styles}>
                {this.props.text}
            </div>
        )
    }
}

Text.defaultProps = {
    text: "Placeholder"
}

const styles = {
    whiteSpace: "nowrap"
}

export default Text;