import { createContext, useContext } from 'react';
import { toast } from 'react-toastify';

const MessageContext = createContext();

export const MessageContextProvider = ({ children }) => {
    return(
        <MessageContext.Provider value={{toast}}>{children}</MessageContext.Provider>
    )
}

export const useNotification = () => {
    const context = useContext(MessageContext);
    if (!context) {
        throw new Error('useAuth must be used within a AuthContext');
    }
    return context;
}