import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [session, setSession] = useState(undefined);
    const [loading, setLoading] = useState(true);

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
        const { error } = await supabase.auth.signOut();
        if (error) console.error(error.message);
    }

    const signInUser = async (email, password) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) {
                console.error("sign in error occurred: ", error);
                return {
                    success: false,
                    error: "Đăng nhập thất bại!!!"
                }
            }
            return { success: true, data };
        } catch (error) {
            return {
                success: false,
                error: "Lỗi không xác định!!!"
            }
        }
    }

    useEffect(() => {
        const getInformationSignIn = async () => {
            const { data } = await supabase.auth.getSession();
            if (data && data.session) {
                setSession(data.session);
                setLoading(false);
            }
        }
        getInformationSignIn();

        const { data: authListener } = supabase.auth.onAuthStateChange((_event, newSession) => {
            setSession(newSession);
            setLoading(false);
        })
        return () => {
            authListener.subscription.unsubscribe();
        }
    }, []);

    return (
        <AuthContext.Provider value={{ session, loading, signUpUser, signOut, signInUser }}>{children}</AuthContext.Provider>
    )
}
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within a AuthContext');
    }
    return context;
}