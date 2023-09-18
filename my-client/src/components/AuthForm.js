import React, {useRef, useState} from 'react';
import {useLoginMutation, useRegisterMutation} from "../store/api/authApi";
import {useDispatch} from "react-redux";
import {login} from "../store/reducer/authSlice";
import {useLocation, useNavigate} from "react-router-dom";
import {Button, Form, Segment, Container, Checkbox} from 'semantic-ui-react';
import logo from '../assets/logo/logo_black.png';
import styles from './AuthForm.module.css';

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
        if (isLoginForm) {
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
        <Container>
            <div className={styles.logo}>
                <img src={logo} alt="logo"/>
            </div>
            <Segment style={{
                width: '100%',
                maxWidth: '480px',
                margin: '0 auto',
                padding: 0,
                backgroundColor: '#fff',
                borderRadius: '30px 30px 10px 10px',
                border: 'none',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                height: '640px'
            }}>
                <div className={styles.authTabs}>
                    <div
                        className={!isLoginForm ? `${styles.tab} ${styles.activeTab}` : styles.tab}
                        onClick={() => setIsLoginForm(false)}
                    >
                        Sign Up
                    </div>
                    <div
                        className={isLoginForm ? `${styles.tab} ${styles.activeTab}` : styles.tab}
                        onClick={() => setIsLoginForm(true)}
                    >
                        Sign In
                    </div>

                </div>
                <Form onSubmit={submitHandler}>
                    <label>
                        Username <span className={styles.required}>*</span>
                        <Form.Input
                            fluid
                            icon='user'
                            iconPosition='left'
                            placeholder='Username'
                            input={{ref: usernameInput}}
                            style={{ marginLeft: '2em', marginRight: '2em', marginBottom: '1.5em', marginTop: '0.5em', width: 'calc(100% - 4em)' }}
                        />
                    </label>
                    {!isLoginForm && (
                        <label>
                            Email <span className={styles.required}>*</span>
                            <Form.Input
                                fluid
                                icon='mail'
                                iconPosition='left'
                                placeholder='Email address'
                                input={{ref: emailInput}}
                                style={{ marginLeft: '2em', marginRight: '2em', marginBottom: '1.5em', marginTop: '0.5em', width: 'calc(100% - 4em)' }}
                            />
                        </label>
                    )}
                    <label>
                        Password <span className={styles.required}>*</span>
                        <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                            input={{ref: passwordInput}}
                            style={{ marginLeft: '2em', marginRight: '2em', marginBottom: '1.5em', marginTop: '0.5em', width: 'calc(100% - 4em)' }}
                        />
                    </label>
                    {!isLoginForm && (
                        <Form.Field>
                            <Checkbox
                                label='I want to receive special offers and other information from Popeyes via email'
                            />
                        </Form.Field>
                    )}
                    <Button color='orange'
                            fluid size='large'
                            type="submit"
                            style={{
                                marginTop: '2em',
                                marginBottom: '4em',
                                marginLeft: '2em',
                                marginRight: '2em',
                                width: 'calc(100% - 4em)',
                                borderRadius: '30px'
                            }}
                            >
                        {isLoginForm ? "Log in" : "Register"}
                    </Button>
                </Form>
            </Segment>
        </Container>
    );
};

export default AuthForm;