import React from 'react';
import {Link, NavLink, useLocation, useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/reducer/authSlice";
import styles from './Navbar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingCart, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/logo/logo_black.png';

const Navbar = () => {
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const handleUserIconClick = () => {
        if (auth.isLogged) {
            navigate('/profile');
        } else {
            navigate('/auth-form');
        }
    };

    const handleBackClick = () => {
        navigate(-1);
    }
    if (location.pathname === '/auth-form') {
        return (
            <nav className={`${styles.navbar} navbar navbar-expand-lg navbar-light bg-white`}>
                <div className="container-fluid">
                    <FontAwesomeIcon
                        icon={faArrowLeft}
                        className={`${styles.clickableIcon} mr-3`}
                        onClick={handleBackClick}
                    />
                </div>
            </nav>
        );
    }

    return (
        <nav className={`${styles.navbar} navbar navbar-expand-lg navbar-light bg-white`}>
            <div className="container-fluid">
                <FontAwesomeIcon
                    icon={faUser}
                    className={`${styles.userIcon} ${styles.clickableIcon} mr-3`}
                    onClick={handleUserIconClick}
                />
                <NavLink
                    className={styles.navLink}
                    to="/"
                    style={({ isActive }) => ({
                        color: isActive ? '#f06511' : 'black'
                    })}
                >
                    Home
                </NavLink>
                <NavLink
                    className={styles.navLink}
                    to="/offers"
                    style={({ isActive }) => ({
                        color: isActive ? '#f06511' : 'black'
                    })}
                >
                    Offers
                </NavLink>
                <NavLink
                    className={styles.navLink}
                    to="/menus"
                    style={({ isActive }) => ({
                        color: isActive ? '#f06511' : 'black'
                    })}
                >
                    Menu
                </NavLink>

                <div className="mx-auto">
                    <Link to="/">
                        <img src={logo} alt="Little Kitchen" className={styles.logoImage} />
                    </Link>
                </div>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className={styles.customOrangeBg} to="/auth-form">Sign Up</Link>
                    </li>
                    <li className="nav-item">
                        <Link className={styles.emptyCart} to="/cart">
                            <FontAwesomeIcon icon={faShoppingCart} className={`${styles.cartIcon}`} />$0.00
                        </Link>
                    </li>
                    {auth.isLogged &&
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/profile">{auth.user.username}</Link>
                            </li>
                            {auth.is_admin &&
                                <li className="nav-item">
                                    <Link className="nav-link" to="/all-users">All Registered Users</Link>
                                </li>
                            }
                            <li className="nav-item">
                                <Link className="nav-link" to="/" onClick={() => dispatch(logout())}>Logout</Link>
                            </li>
                        </>
                    }
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;

{/*{!auth.isLogged &&*/}
{/*    <li className="nav-item">*/}
{/*        <Link className="nav-link" to="/auth-form">Login/Register</Link>*/}
{/*    </li>*/}
{/*}*/}