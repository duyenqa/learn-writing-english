import {createContext, useContext, useState} from 'react';

const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState(undefined);

    return (
        <AuthContext.Provider value={{user}}>{children}</AuthContext.Provider>
    )
}
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within a AuthContext');
    }
    return context;
}