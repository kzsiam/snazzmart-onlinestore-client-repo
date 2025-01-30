import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { FaBangladeshiTakaSign } from "react-icons/fa6";


const MyOrders = () => {
    const { user } = useContext(AuthContext)
    console.log(user?.email)
    const { data: myOrderedData, refetch, isLoading } = useQuery({

        queryKey: 'myOrderedData',
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/orders/${user?.email}`)
            const data = await res.json()
            return data
        }
    })

    if (isLoading) {
        return (
            <h1>loading.....</h1>
        )
    }

    console.log(myOrderedData)
    return (

        <div>
            <h1 className='text-xl font-bold mb-20 mt-10'>Your Ordered Item</h1>
            {
                myOrderedData?.map(orderedData =>
                   

                    <div className="overflow-x-auto">

                        <table className="table">
                            {/* head */}

                            <tbody>
                                {/* row 1 */}
                                <tr>

                                    <td>
                                        <Link to={`/product/${orderedData.itemsId}`}>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle lg:h-20 h-10 w-15">
                                                        <img
                                                            src={orderedData.images}
                                                            alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold ">{orderedData.productName.slice(0, 30)}...</div>
                                                    <div className="text-sm opacity-50">Color: {orderedData.color}</div>
                                                    <div className="text-sm opacity-50">Size: {orderedData.size}</div>
                                                    <div className="text-sm opacity-50">Qty: {orderedData.quantityNumber}</div>
                                                </div>
                                            </div>
                                        </Link>
                                    </td>

                                    <td>
                                        <div className='flex items-center text-rose-500  gap-1 mt-2'>
                                            <FaBangladeshiTakaSign className='' />
                                            <p className='font-bold'> {orderedData.totalPrice} </p>
                                        </div>
                                    </td>
                                    <td>
                                        <div className=''>
                                            <h1 className='text-sm'>Order Status</h1>
                                            <p className='font-bold'> {orderedData.orderStatus} </p>
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

export default MyOrders;