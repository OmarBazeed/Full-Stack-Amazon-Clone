import { createContext, useReducer } from "react";

import { AppReducer, InitailState } from "./AppReducer";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, InitailState);

  return (
    <GlobalContext.Provider
      value={{
        user: state.user,
        basket: state.basket,
        dispatch,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
