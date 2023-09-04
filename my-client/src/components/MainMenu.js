import React from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../store/reducer/authSlice";

const MainMenu = () => {
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    return (
        <header>
            <ul>
                <li>
                    <Link to={"/"}>Home Page</Link>
                </li>
                {
                    !auth.isLogged &&
                    <li>
                        <Link to={"/auth-form"}>Login/Register</Link>
                    </li>
                }

                {
                    auth.isLogged &&
                    <>
                        <li>
                            <Link to={"/profile"}>{auth.user.username}</Link>
                        </li>
                        {
                            auth.is_admin
                                ? <li>
                                    <Link to={"/all-users"}>All Registered Users</Link>
                                </li>
                                : null
                        }

                        <li>
                            <Link to={"/"} onClick={
                                () => {
                                    dispatch(logout());
                                }
                            }>Logout</Link>
                        </li>
                    </>
                }

            </ul>
        </header>
    );
};

export default MainMenu;
