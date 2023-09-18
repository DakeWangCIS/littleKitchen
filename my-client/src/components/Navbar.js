import React from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/reducer/authSlice";
import { Menu, Icon, Image, Button } from 'semantic-ui-react';
import logo from '../assets/logo/logo_black.png';
import styles from './Navbar.module.css';


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
            <Menu borderless className={styles.customNavbar}>
                <Menu.Item onClick={handleBackClick}>
                    <Icon name='arrow left' />
                </Menu.Item>
            </Menu>
        );
    }

    return (
        <Menu borderless className={styles.customNavbar}>
            <Menu.Menu style={{ flex: 1 }}>
                <Menu.Item onClick={handleUserIconClick}>
                    <Icon name='user' />
                </Menu.Item>
                <Menu.Item as={Link} to="/">Home</Menu.Item>
                <Menu.Item as={Link} to="/offers">Offers</Menu.Item>
                <Menu.Item as={Link} to="/menus">Menu</Menu.Item>
                {auth.isLogged &&
                    <>
                        <Menu.Item as={Link} to="/profile">{auth.user.username}</Menu.Item>
                        {auth.is_admin &&
                            <Menu.Item as={Link} to="/all-users">All Registered Users</Menu.Item>
                        }
                        <Menu.Item as={Link} to="/" onClick={() => dispatch(logout())}>Logout</Menu.Item>
                    </>
                }
            </Menu.Menu>

            <Menu.Item style={{ flex: 1, textAlign: 'center' }}>
                <Image centered src={logo} alt="Little Kitchen" size='mini' />
            </Menu.Item>

            <Menu.Menu style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                <Menu.Item as={Link} to="/auth-form">
                    <Button basic color='orange'>Sign Up</Button>
                </Menu.Item>
                <Menu.Item as={Link} to="/cart">
                    <Icon name='shopping cart' />$0.00
                </Menu.Item>

            </Menu.Menu>
        </Menu>
    );
};

export default Navbar;