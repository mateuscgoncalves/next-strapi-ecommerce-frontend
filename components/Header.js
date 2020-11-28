import Link from "next/link";
import styles from "../styles/Header.module.css";
import {useRouter} from "next/router";
import {useContext} from "react";

import AuthContext from "../context/AuthContext";

export default () => {
    const router = useRouter();
    const isHome = router.pathname === "/";

    const goBack = (event) => {
        event.preventDefault();
        router.back();
    }

    const {user} = useContext(AuthContext);

    return(
            <header className={styles.nav}>
                {
                    !isHome &&
                        <div className={`${styles.nav__item} ${styles.nav__back}`}>
                            <a href='#' onClick={goBack}>{'<'} Back</a>
                        </div>
                }
                <div className={`${styles.nav__title} ${styles.nav__title}`}>
                    <Link href={'/'}>
                        <a><h1>The E-commerce</h1></a>
                    </Link>
                </div>
                <div className={`${styles.nav__item} ${styles.nav__auth}`}>
                    {
                        user ? (
                            <Link href={'/account'}>
                                <a><img src="/user.png" alt={user.email} className={styles.nav__userAvatar}/></a>
                            </Link>
                        ) : (
                            <Link href={'/login'}>
                                <a>Login</a>
                            </Link>
                        )
                    }
                </div>
            </header>
    );
}