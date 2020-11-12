import React, { useState, useContext} from 'react'
import styled from 'styled-components';

import ArticleIcon from '../../assets/icons/article_icon.png';
import BookmarkIcon from '../../assets/icons/bookmark_icon.png';
import UserIcon from '../../assets/icons/user_icon.svg';
import PopupDisplay from '../AuthView/PopupDisplay';

/**
 * Component that defines the bottom bar of the chrome extension window
 */


const BottomBar = ({handleViewChange}) => {
    const [showPopup, setShowPopup] = useState(false);    

    return (
        <div>
            <BottomBarContainer>
                <BottomBarButtonWrapper>
                    <BottomBarButton id="rating" type="image" src={ArticleIcon} onClick={handleViewChange} />
                </BottomBarButtonWrapper>
                <BottomBarButtonWrapper>
                    <BottomBarButton id="bookmarks" type="image" src={BookmarkIcon} onClick={handleViewChange} />
                </BottomBarButtonWrapper>
                <BottomBarButtonWrapper>
                    <BottomBarButton id="user" type="image" src={UserIcon} onClick={handleViewChange} />
                </BottomBarButtonWrapper>
                <div id="popup">
                    {
                        showPopup ? 
                            <PopupDisplay isLogin={true} />
                        :
                            null
                    }
                </div>
            </BottomBarContainer>
        </div>
    );
}

const BottomBarContainer = styled.div`
    display: flex;
    justify-content: space-between;
    height: 15vh;
`

const BottomBarButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 30%;
    padding: .3rem;
`

const BottomBarButton = styled.input`
    height: 100%;
    aspect-ratio: 100%;
`

export default BottomBar;