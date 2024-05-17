import React from "react";
import { useContextSelector,createContext } from "use-context-selector";


const CurrentRoomContext = createContext();

export const CurrentRoomProvider = ({children,data})=>{
    return(
        <CurrentRoomContext.Provider value={data}>
            {children}
            </CurrentRoomContext.Provider>
    )
}

 export const useCurrentRoom = selector =>  useContextSelector(CurrentRoomContext,selector);