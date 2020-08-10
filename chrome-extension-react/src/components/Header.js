import React from 'react';


function Header(props) {
    return (
        <div className="f7 avenir fl ttu tracked gray fw6 mv2">
            {props.text}
        </div>
    )
}

export default Header;