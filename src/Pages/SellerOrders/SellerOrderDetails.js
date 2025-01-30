import React from 'react';
import { useLoaderData, Link } from 'react-router-dom';
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { MdEditNote } from "react-icons/md";

import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const SellerOrderDetails = () => {

    const sellerOrderDetails = useLoaderData()
    // console.log(sellerOrderDetails)
    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleOrderStatus = (data) => {
        
        fetch(`http://localhost:5000/orders/${sellerOrderDetails._id}`,{
            method: 'PATCH',
            headers:{
                'content-type': 'application/json'
            },
            body:JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => {

            if (data.modifiedCount > 0) {
                toast.success('Order Status Updated ')
                window.location.reload()
            }

        })
    }
    return (
        <div className='mt-20'>
            <h1 className='text-xl text-center  mb-20'>Order Details of <span className='font-bold'> - {sellerOrderDetails.productName}</span></h1>
            <div className="flex lg:gap-20 gap-10  justify-center lg:items-start items-center flex-col lg:flex-row border-b-2">
                <img
                    src={sellerOrderDetails.images}
                    className=" max-w-sm rounded-lg shadow-2xl" alt='' />

                <div className='text-start'>
                    <h1 className="text-2xl font-bold py-5 border-b-2 text-start w-96">{sellerOrderDetails.productName}</h1>
                    <div>
                        <div className='my-4'>
                            <h1>Qty:<span className='mx-2 mb-2'>{sellerOrderDetails.quantityNumber}</span></h1>
                            <h1>Color:<span className='mx-2 mb-2'>{sellerOrderDetails.color}</span></h1>
                            <h1>Size:<span className='mx-2 mb-2'>{sellerOrderDetails.size}</span></h1>
                            <h1 className='font-bold mb-2'>Address: <span className='mx-2'>{sellerOrderDetails.address}</span></h1>
                            <h1 className='font-bold mb-2'>Contact Number:  {sellerOrderDetails.phoneNumber} </h1>
                            <h1 className='font-bold'>Email:  {sellerOrderDetails.orderedEmail} </h1>
                        </div>
                        <div className='flex items-center justify-between text-rose-500 text-xl gap-1 mt-2'>
                            <h1 className='font-bold'>Total Price: </h1>
                            <div className='flex items-center'>
                                <FaBangladeshiTakaSign className='' />
                                <p className='font-bold'> {sellerOrderDetails.totalPrice}</p>
                            </div>
                        </div>

                        <div className='flex justify-between items-center mb-20 mt-10 '>
                            <h1>Ordered Status: {sellerOrderDetails.orderStatus}</h1>
                            <label htmlFor="my_modal_6" className="btn"><MdEditNote className='text-xl' /></label>



                            <input type="checkbox" id="my_modal_6" className="modal-toggle" />
                            <div className="modal" role="dialog">
                                <div className="modal-box">

                                    <form  className="card-body">
                                        <div className=''>
                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text">Order Status</span>
                                                </label>
                                                <select {...register("orderStatus", { required: "please select Order Status" })} className="select bg-slate-100 ">
                                                    <option selected></option>
                                                    <option>Order Received</option>
                                                    <option>Processing</option>
                                                    <option>Packing</option>
                                                    <option>Shipped </option>
                                                    <option>In Transit</option>
                                                    <option>Out for Delivery</option>
                                                    <option>Delivered </option>
                                                    <option>Failed Delivery</option>
                                                </select>
                                                {
                                                    errors.size && <p className='text-red-600 mt-2'>{errors.size.message}</p>
                                                }
                                            </div>

                                        </div>
                                        <div className="mt-2">
                                            <button onClick={handleSubmit(handleOrderStatus)} className="btn bg-rose-500 text-white">Update Status</button>
                                        </div>
                                    </form>
                                    <div className="modal-action">
                                        <label htmlFor="my_modal_6" className="btn bg-rose-500 text-white">Close!</label>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default SellerOrderDetails;