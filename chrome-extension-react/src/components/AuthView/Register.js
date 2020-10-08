import React, { useEffect, useState } from 'react';
import NewWindow from 'react-new-window';
import * as GenericComponents from '../GenericComponents/GenericComponents';

const Register = (props) => {
    return (
        <NewWindow features={{width: "400px", height: "400px"}}>
            <div className="avenir" style={{background: "#F8F8F8"}}>
                <GenericComponents.PopupHeader />                
                <GenericComponents.ExtensionBody>
                    <main className="pa4 pt2 black-80 avenir">
                        <form className="measure center">
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                <div className="mt3">
                                    <GenericComponents.EmailInput/>
                                </div>
                                <div className="mv3">
                                    <GenericComponents.PasswordInput />
                                </div>
                                <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox" /> Remember me</label>
                            </fieldset>
                            <div className="" style={{textAlign: "center"}}>
                                <GenericComponents.PurpleFormButton text='REGISTER' />
                            </div>
                            <div className="lh-copy mt3">
                                <a href="#0" className="f6 link dim black db">Already a member? Login here.</a>
                            </div>
                        </form>
                    </main>
                </GenericComponents.ExtensionBody>
            </div>
        </NewWindow>
    );
}

export default Register;

