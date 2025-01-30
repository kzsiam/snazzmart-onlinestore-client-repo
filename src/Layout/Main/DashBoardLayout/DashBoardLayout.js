import React, { useContext, useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { RiBarChartHorizontalFill, } from "react-icons/ri";
import { AuthContext } from '../../../contexts/AuthProvider';
import UseAdmin from '../../../hooks/UseAdmin';
import UseSeller from '../../../hooks/UseSeller';

const DashBoardLayout = () => {
    const { user } = useContext(AuthContext)
    const [isSeller] = UseSeller(user?.email)
    const [isAdmin] = UseAdmin(user?.email)

    console.log(user?.email)
    const [sellerInfo, setSellerInfo] = useState(null)

   
    
        useEffect(() =>{
                fetch(`https://snazzmart-onlinestore-server.vercel.app/allUsers/${user?.email}`)
                .then(res=> res.json())
                .then(data =>{
                    setSellerInfo(data)
                })
            
        },[user?.email])

        console.log(sellerInfo)

    return (
        <div>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* Page content here */}
                    <div className='flex justify-around'>
                        <Link to='/'>
                            <h1 className='lg:text-4xl text-2xl font-sans font-bold text-center'>Snazz<span className='text-red-500 my-0.5'>Mart</span></h1>
                        </Link>
                        {
                            isSeller && <h1 className='font-bold text-lg'>Shop Name: {sellerInfo?.shopName}</h1>
                        }
                        <label htmlFor="my-drawer" className=" lg:hidden  drawer-button"><RiBarChartHorizontalFill className='w-10' /></label>

                    </div>
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 font-semibold">
                        {/* Sidebar content here */}
                        {
                            isSeller && <>
                                <li><Link to={"/"} className="mb-5" >Home</Link></li>
                                <li><Link to={"/dashboard/addProducts"} className="mb-5">Add Products</Link></li>
                                <li><Link to={"/dashboard/myProducts"} className="mb-5">My Products</Link></li>
                                <li><Link to={"/dashboard/sellerOrders"} className="mb-5">Orders</Link></li>
                            </>
                        }

                        {
                            isAdmin && <li><Link to={"/dashboard/allUsers"} className="mb-5">All Users</Link></li>
                        }
                        {
                            isAdmin && <li><Link to={"/dashboard/history"} className="mb-5">DashBoard History</Link></li>
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashBoardLayout;