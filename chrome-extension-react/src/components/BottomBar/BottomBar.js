import React, { useState, useContext} from 'react'
import ArticleIcon from '../../assets/icons/article_icon.png';
import BookmarkIcon from '../../assets/icons/bookmark_icon.png';
import UserIcon from '../../assets/icons/user_icon.svg';
import Logo from '../../assets/icons/logoface-affinity-grey.png';
import Login from '../AuthView/Login';
import PopupDisplay from '../AuthView/PopupDisplay';

const BottomBar = () => {
    const [showPopup, setShowPopup] = useState(false);

    const handleViewChange = (e) => {
        e.persist();
        console.log(e.target.id);
        switch(e.target.id) {
            case 'user':
                setShowPopup(true);
                break;
            default:
                break;
        }
    }

    return (
        <div>
            <div className="flex justify-between" style={{height: "18vh"}}>
                <div className="flex justify-center w-30 pa3">
                    <input type="image" src={ArticleIcon}  style={{height: "100%", aspectRatio: "100%"}} onClick={() => console.log('clicked article')} />
                </div>
                <div className="flex justify-center w-30 pa3">
                    <input type="image" src={BookmarkIcon} style={{height: "100%", aspectRatio: "100%"}} onClick={() => console.log('clicked bookmark')} />
                </div>
                <div className="flex justify-center w-30 pa3">
                    <input id="user" type="image" src={UserIcon} style={{height: "100%", aspectRatio: "100%"}} onClick={handleViewChange} />
                </div>
                <div id="popup">
                    {
                        showPopup ? 
                            <PopupDisplay isLogin={true} />
                        :
                            null
                    }
                </div>
            </div>
        </div>
    );
}

export default BottomBar;