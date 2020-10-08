import React, { useEffect, useState } from 'react';
import NewWindow from 'react-new-window';
import PropTypes from 'prop-types';
import * as GenericComponents from '../GenericComponents/GenericComponents';

/** 
 * Just need to create one popup window and toggle between the login/register
 */

const PopupDisplay = (props) => {
    const [isLogin, setIsLogin] = useState(props.isLogin);
    useEffect(() => {}, [isLogin]);
    const handleToggle = () => {
        setIsLogin(!isLogin);
    }    
    return (
        <NewWindow features={{width: "400px", height: "460px"}}>
            <div className="avenir" style={{background: "#F8F8F8"}}>
                <GenericComponents.PopupHeader />                
                <GenericComponents.ExtensionBody>
                    <main className="pa4 pv2 black-80 avenir">
                        <form className="measure center">
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                <div className="mt3">
                                    <GenericComponents.EmailInput/>
                                </div>
                                <div className="mv3">
                                    <GenericComponents.PasswordInput />
                                </div>                                
                                {   
                                    isLogin ? 
                                        <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox" /> Remember me</label>
                                    :
                                        <div className="mv3">
                                            <GenericComponents.ConfirmPasswordInput />
                                        </div>
                                }
                            </fieldset>
                            <div className="" style={{textAlign: "center"}}>
                                { 
                                    isLogin ? 
                                        <GenericComponents.PurpleFormButton text='LOGIN' />
                                    :
                                        <GenericComponents.PurpleFormButton text='REGISTER' />
                                }
                            </div>
                            <div className="lh-copy mt3">
                                <a 
                                    className="f6 link dim black db" 
                                    style={{cursor: "pointer"}} 
                                    onClick={() => handleToggle()} 
                                >
                                    { 
                                        isLogin ?
                                            <div>Not a member yet? Register here.</div>
                                        :
                                            <div>Already a member? Login here.</div>
                                    }                                
                                </a>
                            </div>                            
                        </form>
                    </main>
                </GenericComponents.ExtensionBody>
            </div>
        </NewWindow>
    );
}

PopupDisplay.propTypes = {
    isLogin: PropTypes.bool.isRequired
}

export default PopupDisplay;

