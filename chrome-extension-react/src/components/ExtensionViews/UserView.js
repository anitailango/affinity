import React, { useState } from 'react';
import PopupDisplay from '../AuthView/PopupDisplay';

import * as GenericComponents from '../GenericComponents/GenericComponents';

const PopupOptions = {
    HIDDEN: 0,
    LOGIN: 1,
    REGISTER: 2,
}

const UserView = () => {
    const [popupOption, setPopupOption] = useState(PopupOptions.HIDDEN);

    const handlePopup = (e) => {
        e.persist();
        switch(e.target.id) {
            case 'login':
                setPopupOption(PopupOptions.LOGIN);
                break;
            case 'register':
                setPopupOption(PopupOptions.REGISTER);
                break;
            default:
                break;
        }
    }

    let popup;
    switch (popupOption) {
        case PopupOptions.LOGIN:
            popup = <PopupDisplay isLogin={true} />
            break;
        case PopupOptions.REGISTER:
            popup = <PopupDisplay isLogin={false} />
            break;
        default:
            popup = null;
            break;
    }

    return (
        <div className="flex flex-column justify-center" style={{height: "260px", backgroundColor: "#fff"}}>
            <div className="flex justify-center w-100 pv2" >            
                <input id="register" className="b br2 white ph3 pv2 input-reset ba grow pointer f6 dib w-50" type="button" value="REGISTER" style={{backgroundColor: "#9A5B85", border: "1px solid #9A5B85"}} onClick={handlePopup} />            
            </div>
            <div className="flex justify-center w-100 pv2" >
                <input id="login" className="b br2 ph3 pv2 input-reset ba bg-transparent grow pointer f6 dib w-50" type="submit" value="LOGIN" style={{color: "#9A5B85", border: "1px solid #9A5B85"}} onClick={handlePopup} />                                
            </div>
            { popup }
        </div>  
    );      
}

export default UserView;