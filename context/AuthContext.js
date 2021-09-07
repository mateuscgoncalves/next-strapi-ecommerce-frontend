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
    /**
     * Verifies if there is any loggedin user and set to context
     * @returns {Promise<void>}
     */
    const checkUserLoggedIn = async () => {
        try{
            const isUserLoggedIn = await magic.user.isLoggedIn();
            if(isUserLoggedIn){
                const { email } = await magic.user.getMetadata();
                setUser({ email });

                const token = await getToken();
                console.log( token);
            }
        }catch (err){

        }
    }
    /**
     * Retrieves the magic issues bearer token
     * This allows user to make authenticated requests
     * @returns {Promise<ExtendedPromise<string> & TypedEmitter<{done: (result: string) => void, error: (reason: any) => void, settled: () => void} extends void ? DefaultEvents<string> : ({done: (result: string) => void, error: (reason: any) => void, settled: () => void} & DefaultEvents<string>)>>}
     */
    const getToken = async () =>{
        try {
            const token = magic.user.getIdToken();
            return token;
        }catch (err){

        }
    }

    useEffect(() => {
        magic = new Magic(MAGIC_PUBLIC_KEY);
        checkUserLoggedIn();
    }, []);

    return(
        <AuthContext.Provider value={{user, loginUser, logoutUser, getToken}}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;