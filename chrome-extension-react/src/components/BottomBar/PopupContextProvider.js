import React from 'react';

export const PopupContext = React.createContext({ 
    popup: 'none', 
    setPopup: () => {}
});

export const PopupContextProvider = (props) => {
    const setPopup = (popup) => {
      setState({...state, popup: popup})
    }
  
    const initState = {
      popup: "none",
      setPopup: setPopup
    } 
  
    const [state, setState] = React.useState(initState)
  
    return (
      <PopupContext.Provider value={state}>
        {props.children}
      </PopupContext.Provider>
    )
}