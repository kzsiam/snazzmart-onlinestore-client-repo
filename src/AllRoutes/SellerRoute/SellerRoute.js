import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import UseSeller from '../../hooks/UseSeller'

const SellerRoute = ({children}) => {
    const location = useLocation();

    const {user,loader} = useContext(AuthContext);

    const [isSeller,isSellerLoading] = UseSeller(user?.email)
    console.log(isSeller)
    if(loader || isSellerLoading){
        return <div className='mx-auto'>
        <span className="loading loading-bars loading-xs"></span>
        <span className="loading loading-bars loading-sm"></span>
        <span className="loading loading-bars loading-md"></span>
        <span className="loading loading-bars loading-lg"></span>
    </div>
    }

    if(user && isSeller){
        return children;
    }
    return (
        <Navigate to={'/signin'} state={{ from: location }} replace></Navigate>
    );
};

export default SellerRoute;