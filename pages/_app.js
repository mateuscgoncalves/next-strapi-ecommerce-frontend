import React from 'react';
import '../styles/globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

import {AuthProvider} from "../context/AuthContext";

function MyApp({ Component, pageProps }) {
    return(
        <AuthProvider>
            <React.Fragment>
                <Header/>
                <Component {...pageProps} />
                <Footer/>
            </React.Fragment>
        </AuthProvider>
    );
}

export default MyApp
