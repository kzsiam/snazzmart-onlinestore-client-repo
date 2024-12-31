import React from 'react';
import { Link } from 'react-router-dom';
import { IoSearch } from "react-icons/io5";
import { FiShoppingCart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";


const Navbar = () => {
    return (
        <div className=''>
            <div className='bg-rose-500'>

                <div className="">
                    <div className='flex gap-5 justify-end font-semibold mx-5 mb-3 text-white '>

                        <Link to={'/becomeAseller'}>Become a Seller</Link>
                        <Link>My Orders</Link>
                        <Link to={'/dashboard'}>DashBoard</Link>

                    </div>
                    <div className="flex justify-evenly items-center lg:mx-10 mx-5">
                        <div className="navbar-start">
                            <Link to='/'>
                                <h1 className='lg:text-4xl text-2xl font-sans  font-bold text-center'><span className='underline'>Snazz</span><span className='text-white my-0.5 underline'>Mart</span></h1>
                            </Link>
                        </div>
                        <div className="navbar-center lg:flex justify-center  pb-5 pt-5 hidden">
                            <label className="input flex items-center lg:gap-5 bg-gray-200 pr-0">
                                <input type="text" className="lg:w-80 " placeholder="Search in SnazzMart" />
                                <button className='bg-zinc-950 px-10 py-4 rounded-r text-white'><IoSearch /></button>
                            </label>
                        </div>
                        <div className="navbar-end ">
                            <div className="">
                                <div className="text-white flex gap-5 justify-center font-semibold">
                                    <FaHeart className='text-2xl' />
                                    <FiShoppingCart className='text-2xl' />
                                    <Link to={'/signin'}>Signin</Link>


                                </div>

                            </div>
                            <div className='mx-5 flex justify-center items-center'>

                            </div>
                        </div>
                    </div>

                    <div className="navbar-center flex justify-center pb-5 lg:hidden mt-5">
                        <label className="input flex items-center lg:gap-5 bg-gray-200 pr-0">
                            <input type="text" className="lg:w-80 " placeholder="Search in SnazzMart" />
                            <button className='bg-zinc-950 px-10 py-4 rounded-r text-white'><IoSearch /></button>
                        </label>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Navbar;