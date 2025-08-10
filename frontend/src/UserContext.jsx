import { createContext, useContext, useState } from "react";

const UserContext=createContext();

export default function UserProvider({children}){
    const [user,setUser]=useState({})
    return(
        <UserContext.Provider value={{user,setUser}}>
            {children}
        </UserContext.Provider>
    )
}


export function useUser(){
    const context=useContext(UserContext);
    if(!context) return "error is context"
    return context;
}