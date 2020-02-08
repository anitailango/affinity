import React from 'react';

class Text extends React.Component {

    render()
    {
        return (
            <div className = "f4 avenir ttm dark-gray fw5 fn mv2">
                {this.props.text}
            </div>
        )
    }
    
}

Text.defaultProps = 
{
    text: "Placeholder"
}

export default Text;