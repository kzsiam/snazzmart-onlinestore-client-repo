import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const SellerOrders = () => {
    const { user } = useContext(AuthContext)
    console.log(user?.email)
    const { data: sellerOrders, refetch, isLoading } = useQuery({

        queryKey: 'sellerOrders',
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/sellerOrders/${user?.email}`)
            const data = await res.json()
            return data
        }
    })
    if(isLoading){
        return <h1>loading...</h1>
    }

    console.log(sellerOrders)
    if(sellerOrders.length === 0){
        return <h1 className='font-bold mt-40'> no data found</h1>
    }
    return (
        <div>
            <h1>TotalOrder: {sellerOrders.length}</h1>
            {
                sellerOrders?.map(sellerOrder =>
                    
                        <div className="overflow-x-auto lg:mx-20">

                        <table className="table">
                            {/* head */}

                            <tbody>
                                {/* row 1 */}
                                <tr>

                                    <td>
                                        <Link to={`/dashboard/sellerOrderDetails/${sellerOrder._id}`}>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle lg:h-20 h-10 w-15">
                                                        <img
                                                            src={sellerOrder.images}
                                                            alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold ">{sellerOrder.productName.slice(0, 50)}...</div>
                                                   
                                                </div>
                                            </div>
                                        </Link>
                                    </td>

                                    <td>
                                        
                                    </td>
                                    <td>
                                        <div className='flex items-center text-rose-500  gap-1 mt-2'>
                                            <FaBangladeshiTakaSign className='' />
                                            <p className='font-bold'> {sellerOrder.totalPrice} </p>
                                        </div>
                                    </td>
                                    <td>
                                        <div className=''>
                                            <h1 className='text-sm'>Order Status</h1>
                                            <p className='font-bold'> {sellerOrder.orderStatus} </p>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )
            }
        </div>
    );
};

export default SellerOrders;