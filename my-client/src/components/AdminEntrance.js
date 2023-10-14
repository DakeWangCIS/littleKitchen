import React from 'react';
import {useSelector} from "react-redux";

const AdminEntrance = () => {
    const auth = useSelector(state => state.auth);
    console.log(auth);


    const getGreeting = () => {
        const currentHour = new Date().getHours();
        if (currentHour >= 0 && currentHour < 6) {
            return "Good Night";
        } else if (currentHour >= 6 && currentHour < 12) {
            return "Good Morning";
        } else if (currentHour >= 12 && currentHour < 18) {
            return "Good Afternoon";
        } else {
            return "Good Evening";
        }
    };

    return (
        <div style={{ textAlign: 'center', padding: '50px 0' }}>
            <h1>{getGreeting()}, {auth.user.username}</h1>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                <li><a href="/all-users">User Management</a></li>
                <li><a href="/all-items">Item Management</a></li>
                {/* Add other management links as needed */}
            </ul>
        </div>
    );
};

export default AdminEntrance;
