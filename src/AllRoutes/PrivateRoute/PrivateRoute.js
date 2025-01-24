import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const location = useLocation()

    const { user, loader } = useContext(AuthContext)
    if (loader) {
        return <div className='mx-96 my-96'>
            <span className="loading loading-bars loading-xs"></span>
            <span className="loading loading-bars loading-sm"></span>
            <span className="loading loading-bars loading-md"></span>
            <span className="loading loading-bars loading-lg"></span>
        </div>
    }
    if(user){
        return children;
    }
    return (
        <Navigate to={'/signin'} state={{from: location}} replace></Navigate>
    );
};

export default PrivateRoute;