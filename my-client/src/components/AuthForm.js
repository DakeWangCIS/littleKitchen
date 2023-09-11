import React, {useRef, useState} from 'react';
import {useLoginMutation, useRegisterMutation} from "../store/api/authApi";
import {useDispatch} from "react-redux";
import {login} from "../store/reducer/authSlice";
import {useLocation, useNavigate} from "react-router-dom";
import logo from '../assets/logo/logo_black.png';
import styles from "./AuthForm.module.css";

const AuthForm = () => {
    const [isLoginForm, setIsLoginForm] = useState(true);

    //import register api
    const [regFn, {error: regError}] = useRegisterMutation();
    //import login api
    const [loginFn, {error: loginError}] = useLoginMutation();

    const usernameInput = useRef();
    const passwordInput = useRef();
    const emailInput = useRef();

    // get dispatch function from store
    const dispatch = useDispatch();

    // get Navigate
    const navigate = useNavigate();

    const location = useLocation();
    const from = location.state?.preLocation?.pathname || '/';

    const submitHandler = (event) => {
        event.preventDefault();
        const username = usernameInput.current.value;
        const password = passwordInput.current.value;
        if(isLoginForm) {
            loginFn({
                identifier: username,
                password
            }).then((res) => {
                if (!res.error) {
                    dispatch(login(
                        {
                            token: res.data.token,
                            user: res.data.data
                        }
                    ));
                    navigate(from, {replace: true});
                }
            })
        } else {
            const email = emailInput.current.value;
            regFn({username, password, email})
                .then((res) => {
                    if (!res.error) {
                        setIsLoginForm(true);
                        usernameInput.current.value = '';
                        passwordInput.current.value = '';
                        emailInput.current.value = '';
                    }
                })
        }
    }

    return (
        <div className={styles.authContainer}>
            <div className={styles.authLogo}>
                <img src={logo} alt="logo" className={styles.logoImage} />
            </div>
            <div className={styles.authTabs}>
                <button className={isLoginForm ? styles.activeTab : ""} onClick={() => setIsLoginForm(true)}>Sign In</button>
                <button className={!isLoginForm ? styles.activeTab : ""} onClick={() => setIsLoginForm(false)}>Sign Up</button>
            </div>
            <form onSubmit={submitHandler}>
                <div className={styles.authInputGroup}>
                    <input ref={usernameInput} type="text" placeholder="Username" />
                </div>
                {!isLoginForm && (
                    <div className={styles.authInputGroup}>
                        <input ref={emailInput} type="email" placeholder="Email" />
                    </div>
                )}
                <div className={styles.authInputGroup}>
                    <input ref={passwordInput} type="password" placeholder="Password" />
                </div>
                <div className={styles.authActions}>
                    <button type="submit">{isLoginForm ? "Log in" : "Register"}</button>
                </div>
            </form>
        </div>
    );
};

export default AuthForm;