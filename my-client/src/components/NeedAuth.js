import React from 'react';
import {useSelector} from "react-redux";
import {Navigate, useLocation} from "react-router-dom";

const NeedAuth = ({requireAdmin = false, children}) => {
    const auth = useSelector(state => state.auth);
    const location = useLocation();

    if (!auth.isLogged || (requireAdmin && !auth.is_admin)) {
        return <Navigate
            to={"/auth-form"}
            replace
            state={{ preLocation: location }}
        />;
    }

    return children;
};

export default NeedAuth;