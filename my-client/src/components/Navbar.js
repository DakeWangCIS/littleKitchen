import React from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/reducer/authSlice";
import { Menu, Icon, Image, Button, Dropdown } from 'semantic-ui-react';
import logo from '../assets/logo/logo_black.png';
import styles from './Navbar.module.css';

const Navbar = () => {
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    // this is a hack to make the back button work
    const handleBackClick = () => {
        navigate(-1);
    }

    // Dropdown options for the user menu
    const userDropdownOptions = [
        {
            key: 'profile',
            text: 'Profile',
            active: location.pathname === '/profile',
            onClick: () => {
                if (!auth.isLogged) {
                    navigate('/auth-form');
                } else {
                    navigate('/profile');
                }
            }
        },
        {
            key: 'order-history',
            text: 'Order history',
            active: location.pathname === '/order-history',
            onClick: () => {
                if (!auth.isLogged) {
                    navigate('/auth-form');
                } else {
                    navigate('/order-history'); // TBD
                }
            }
        },
        ...(auth.isLogged ? [{ key: 'logout', text: 'Log out', onClick: () => dispatch(logout()) }] : [])
    ];

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
                <Menu.Item>
                    <Dropdown
                        simple
                        icon={null}
                        options={userDropdownOptions}
                        defaultValue={null}
                        value={location.pathname}
                        trigger={
                            <span>
                                <Icon name='user' />
                                <Icon name='caret down' />
                            </span>
                        }
                    />
                </Menu.Item>
                <Menu.Item as={Link} to="/">Home</Menu.Item>
                <Menu.Item as={Link} to="/offers">Offers</Menu.Item>
                <Menu.Item as={Link} to="/menus">Menu</Menu.Item>
                {auth.isLogged && auth.is_admin &&
                    <Menu.Item as={Link} to="/admin-entrance">System Management</Menu.Item>
                }
            </Menu.Menu>

            <Menu.Item style={{ flex: 1, textAlign: 'center' }}>
                <Image centered src={logo} alt="Little Kitchen" size='mini' as={Link} to={"/"} />
            </Menu.Item>

            <Menu.Menu style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                {!auth.isLogged &&
                    <Menu.Item as={Link} to="/auth-form">
                        <Button basic color={"orange"} className={styles.customButton}>Sign Up</Button>
                    </Menu.Item>
                }
                <Menu.Item as={Link} to="/cart">
                    <Icon name='shopping cart' />$0.00
                </Menu.Item>
            </Menu.Menu>
        </Menu>
    );
};

export default Navbar;
