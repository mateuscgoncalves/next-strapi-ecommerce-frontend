import { createContext, useState, useEffect } from 'react';
import { useRouter } from "next/router";
import { Magic } from "magic-sdk";
import { MAGIC_PUBLIC_KEY } from "../utils/urls";

const AuthContext = createContext();

let magic;

export const AuthProvider = (props) => {

    const [user, setUser] = useState(null);
    const router = useRouter();
    /**
     * Set email to user
     * @param email
     * @returns {Promise<void>}
     */
    const loginUser = async (email) => {
        try {
            await magic.auth.loginWithMagicLink({email});
            setUser({email});
            router.push('/');
        }catch (err){
            setUser(null);
        }
    }

    /**
     * Set the user to null
     * @returns {Promise<void>}
     */
    const logoutUser = async () => {
        try {
            await Magic.user.logout();
            setUser(null);
            router.push('/')
        }catch (e) {
            
        }
    }

    const checkUserLoggedIn = async () => {
        try{
            const isUserLoggedIn = await magic.user.isLoggedIn();
            if(isUserLoggedIn){
                const { email } = await magic.user.getMetadata();
                setUser({ email });
            }
        }catch (e){

        }
    }

    useEffect(() => {
        magic = new Magic(MAGIC_PUBLIC_KEY);
        checkUserLoggedIn();
    }, []);

    return(
        <AuthContext.Provider value={{user, loginUser, logoutUser}}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;