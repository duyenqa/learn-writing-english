import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [session, setSession] = useState(undefined);

    const signUpUser = async (email, password) => {
        const { data, error } = await supabase
            .auth.signUp({ email, password });

        if (error) {
            console.error(error.message);
            return { success: false, error };
        }
        return { success: true, data };
    }

    const signOut = async () => {
        const {error} = await supabase.auth.signOut();
        if(error) console.error(error.message);
    }

    useEffect(() => {
        const getInformationSignIn = async () => {
            const { data } = await supabase.auth.getSession();
            if (data && data.session) {
                setSession(data.session);
            }
        }

        function monitorUserEventActions() {
            const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
                setSession(session);
            });
            return authListener;
        }

        getInformationSignIn();
        monitorUserEventActions();
    }, []);

    return (
        <AuthContext.Provider value={{ session, signUpUser, signOut }}>{children}</AuthContext.Provider>
    )
}
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within a AuthContext');
    }
    return context;
}