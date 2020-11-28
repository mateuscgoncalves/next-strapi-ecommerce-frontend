import {createContext, useState} from 'react';
import {useRouter} from "next/router";

const AuthContext = createContext();

export const AuthProvider = (props) => {

    const [user, setState] = useState(null);
    const router = useRouter();
    /**
     * Set email to user
     * @param email
     * @returns {Promise<void>}
     */
    const loginUser = async (email) => {
        setUser({email});
        router.push('/');
    }

    /**
     * Set the user to null
     * @returns {Promise<void>}
     */
    const logoutUser = async () => {
        setUser(null);
        router.push('/')
    }

    return(
        <AuthContext.Provider value={{user, loginUser, logoutUser}}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;