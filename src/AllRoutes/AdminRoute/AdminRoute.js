import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import UseAdmin from '../../hooks/UseAdmin';

const AdminRoute = ({children}) => {
    const location = useLocation()
    const {user,loader} = useContext(AuthContext)

    const [isAdmin,isAdminLoading] = UseAdmin(user?.email)

    if(loader || isAdminLoading){
        return <div className='mx-auto'>
        <span className="loading loading-bars loading-xs"></span>
        <span className="loading loading-bars loading-sm"></span>
        <span className="loading loading-bars loading-md"></span>
        <span className="loading loading-bars loading-lg"></span>
    </div>
    }
    if(user && isAdmin){
        return children;
    }
    return (
        <Navigate to={'/signin'} state={{ from: location }} replace></Navigate>
    );
};

export default AdminRoute;