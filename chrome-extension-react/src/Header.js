import React from 'react';

class Header extends React.Component {

    render()
    {
        return (
            <div className = "f7 avenir fl ttu tracked gray fw6 mv2">
                {this.props.text}
            </div>
        )
    }
    
}

Header.defaultProps = 
{
    text: "Placeholder"
}
export default Header;