import React, {useRef, useState} from 'react';
import {useLoginMutation, useRegisterMutation} from "../store/api/authApi";
import {useDispatch} from "react-redux";
import {login} from "../store/reducer/authSlice";
import {useLocation, useNavigate} from "react-router-dom";

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
        <div>
            <p style={{color:'red'}}>
                {regError && "Username or email already exists."}
                {loginError && "Username or password is incorrect."}
            </p>
            <h2>{isLoginForm ? "Log in" : "Register"}</h2>
            <form onSubmit={submitHandler}>
                <div>
                    <input ref={usernameInput} type="text" placeholder={"Username"}/>
                </div>
                {
                    !isLoginForm &&
                    <div>
                        <input ref={emailInput} type="email" placeholder={"email"}/>
                    </div>
                }
                <div>
                    <input ref={passwordInput} type="password" placeholder={"Password"}/>
                </div>
                <div>
                    <button>{isLoginForm ? "Log in" : "Register"}</button>
                    <a href={"#"} onClick={
                        (event) => {
                            event.preventDefault();
                            setIsLoginForm(!isLoginForm);
                        }
                    }>
                        {
                            isLoginForm ?
                             "Don't have an account? Register here" :
                             "Already have an account? Log in here"
                        }
                    </a>
                </div>
            </form>
        </div>
    );
};

export default AuthForm;