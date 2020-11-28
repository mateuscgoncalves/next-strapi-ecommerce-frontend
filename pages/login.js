import Head from "next/head";
import {useContext, useState} from "react";
import AuthContext from "../context/AuthContext";
import styles from "../styles/login.module.css";

export default function Login() {
    const [email, setEmail] = useState("");

    const {loginUser} = useContext(AuthContext);

    const handleSubmit = (event) => {
        event.preventDefault();
        loginUser(email);
    }

    return(
        <div>
            <Head>
                <title>Login</title>
                <meta name="Description" content="Login here to make your purchase"/>
            </Head>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input type="email"
                       value={email}
                       onChange={(event => setEmail(event.target.value))}
                       placeholder="Email Address"
                       className={styles.login__emailInput}
                />
                <button type="submit" className={styles.login__button}>Login</button>
            </form>
        </div>
    );
}