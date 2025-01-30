import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { RiDeleteBin5Line } from "react-icons/ri";
import toast from 'react-hot-toast';
import ConfirmationModal from '../../SharedPages/ConfirmationModal/ConfirmationModal';
import { Link, useNavigate } from 'react-router-dom';

const AddToCarts = () => {
    const { user } = useContext(AuthContext)
    const [deletingCart, setDeletingCart] = useState(null)

   

    const { data: cartDetails, refetch, isLoading } = useQuery({
        queryKey: 'cartDetails',
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/addToCarts?email=${user?.email}`)
            const data = await res.json()
            return data
        }


    })


    console.log(cartDetails)
    
    

    const cancelModal = () => {
        setDeletingCart(null)
    }



    const handleDeleteCart = (id) => {
        fetch(`http://localhost:5000/addToCarts/${id}`, {
            method: 'DELETE',

        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.deletedCount > 0) {
                    toast.success('Deleted Successfully')
                    refetch()
                }
            })
    }

    
    

    if (isLoading) {
        return <div className='flex justify-center items-center my-40'>
            <span className="loading loading-bars loading-xs"></span>
            <span className="loading loading-bars loading-sm"></span>
            <span className="loading loading-bars loading-md"></span>
            <span className="loading loading-bars loading-lg"></span>
        </div>


    }

    return (
        <div className='mt-20'>
            <div className="">

                {/* head */}

                {
                    cartDetails?.map((cartDetail) =>
                        <div className='border-b-2 mb-5  mx-2'>

                            <div className='flex lg:gap-48 items-center justify-center gap-10 '>
                                <div className=''>
                                    <label onClick={() => setDeletingCart(cartDetail._id)} htmlFor="confirmation-modal" className=""><RiDeleteBin5Line className='text-xl text-rose-500 ' /></label>
                                    {/* <button onClick={() => setDeletingCart(cartDetail._id)}></button> */}
                                </div>


                                <Link to={`/product/${cartDetail.productId}`}>
                                    <div className="flex items-center gap-1">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-20 w-15">
                                                <img
                                                    src={cartDetail.productImage}
                                                    alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold lg:text-sm text-xs">{cartDetail.productName.slice(0, 40)}..</div>
                                            <div className="text-sm opacity-50"><span>Size:{cartDetail?.size}</span>,<span>Color:{cartDetail?.color}</span></div>
                                        </div>
                                    </div>
                                </Link>

                                <div className='flex items-center text-rose-500  gap-1 mt-2'>
                                    <FaBangladeshiTakaSign className='' />
                                    <p className='font-bold'> {cartDetail.productPrice} </p>
                                </div>



                                {
                                    deletingCart && <ConfirmationModal
                                        title={`Are you sure you want to delete`}
                                        closeModal={cancelModal}
                                        successAction={handleDeleteCart}
                                        modalData={deletingCart}
                                        buttonName='Yes'
                                    >

                                    </ConfirmationModal>
                                }


                            </div>
                            <div className='flex lg:gap-48 items-center justify-center gap-2'>
                                <div className='my-4 flex items-center gap-1 '>


                                    <h1 id='quantityValue'>Quantity: {cartDetail.productQuantity}</h1>

                                </div>
                                <div>
                                    <Link to={`/cartCheckout/${cartDetail.productId}`}><button  className="btn bg-rose-500 text-white btn-sm">CheckOut</button></Link>
                                </div>
                            </div>

                        </div>
                    )
                }
            </div>
        </div >
    );
};

export default AddToCarts;




