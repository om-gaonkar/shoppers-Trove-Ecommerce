import React from "react";
import { Navigate, useLocation } from "react-router";

const CheckAuth = ({ isAuthenticated, user, children }) => {
    const location = useLocation();
    console.log(location.pathname, isAuthenticated)

    if (
        !isAuthenticated &&
        !(
            location.pathname.includes("/login") ||
            location.pathname.includes("/register")
        )) {
        return <Navigate to="/auth/login" />;
    }
    if (isAuthenticated && (location.pathname.includes('/login') || location.pathname.includes('/register'))) {
        if (user?.role === 'admin') {
            return <Navigate to='/admin/dashboard'></Navigate>
        } else {
            return <Navigate to='/shop/home'>  </Navigate>
        }
    }
    if (isAuthenticated && user?.role !== 'admin' && location.pathname.includes('admin')) {
        return <Navigate to='/unauth-page'></Navigate>
    }

    if (isAuthenticated && user?.role === 'admin' && location.pathname.includes('shop')) {
        return <Navigate to='/admin/dashboard' />
    }

    return <>{children}</>
};



export default CheckAuth;
