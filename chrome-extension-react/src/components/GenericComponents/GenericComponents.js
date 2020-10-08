import React from 'react';
import PropTypes from 'prop-types';

export const Header = (props) => (
    <div className="f7 avenir fl ttu tracked gray fw6 mv2">
        {props.text} 
        {props.children}
    </div>
);

Header.propTypes = {
    text: PropTypes.string.isRequired
}

export const Text = (props) => (
    <div className="f6 avenir ttm dark-gray fw5 fn mv2" style={{whiteSpace: 'nowrap'}}>
        {props.text}
        {props.children}
    </div>
);

Text.propTypes = {
    text: PropTypes.string.isRequired
}

export const ExtensionHeader = (props) => (<div className="pa3 flex justify-between" style={{height: "52px"}}>{props.children}</div>);

export const ExtensionBody = (props) => (<div className="bg-white flex flex-column pa3 ph4">{props.children}</div>);

export const PopupHeader = () => (
    <ExtensionHeader>
        <div className="w-100" style={{fontSize: "1.5rem", textAlign: "center"}}>
            Affinity                    
        </div>                    
    </ExtensionHeader>
);

export const PurpleFormButton = (props) => (
    <input className="b br2 white ph3 pv2 input-reset ba grow pointer f6 dib" type="button" value={props.text} style={{backgroundColor: "#9A5B85", border: "1px solid #9A5B85"}}/>
);

PurpleFormButton.propTypes = {
    text: PropTypes.string.isRequired
}

export const WhiteFormButton = (props) => (
    <input className="b br2 ph3 pv2 input-reset ba bg-transparent grow pointer f6 dib" type="submit" value={props.text} style={{color: "#9A5B85", border: "1px solid #9A5B85"}}/>                                
);

WhiteFormButton.propTypes = {
    text: PropTypes.string.isRequired
}


export const EmailInput = (props) => (
    <div>
        <label className="gray db fw6 lh-copy f6" for="email-address">Email</label>
        <input className="pa2 br2 b--gray input-reset ba bg-transparent w-100" type="email" name="email-address"  id="email-address" />
    </div>
)

export const PasswordInput = (props) => (
    <div>
        <label className="gray db fw6 lh-copy f6" for="password">Password</label>
        <input className="b br2 b--gray pa2 input-reset ba bg-transparent  w-100" type="password" name="password"  id="password" />
    </div>    
)

export const ConfirmPasswordInput = (props) => (
    <div>
        <label className="gray db fw6 lh-copy f6" for="confirm-password">Confirm Password</label>
        <input className="b br2 b--gray pa2 input-reset ba bg-transparent  w-100" type="password" name="confirm-password"  id="confirm-password" />
    </div>    
);
