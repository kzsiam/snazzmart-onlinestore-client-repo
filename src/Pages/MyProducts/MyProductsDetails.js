import React, { useContext, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { SlLocationPin } from "react-icons/sl";
import { CiDeliveryTruck } from "react-icons/ci";
import { CiCircleInfo } from "react-icons/ci";
import { GiTakeMyMoney } from "react-icons/gi";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { PiNumberCircleSevenBold } from "react-icons/pi";
import { MdDoNotDisturb } from "react-icons/md";
import { IoStar, IoStarHalf } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { IoMdShare } from "react-icons/io";
import UseAdmin from '../../hooks/UseAdmin';
import { AuthContext } from '../../contexts/AuthProvider';
import UseSeller from '../../hooks/UseSeller';
import { useQuery } from '@tanstack/react-query';
import { MdEditNote } from "react-icons/md";
import toast from 'react-hot-toast';
import ConfirmationModal from '../../SharedPages/ConfirmationModal/ConfirmationModal'
import { useForm } from 'react-hook-form';
import Product from '../../SharedPages/AllProducts/Products/Product';

const MyProductsDetails = () => {

    const { user } = useContext(AuthContext)
    const productDetails = useLoaderData()

    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm();

    const [deletingProducts, setDeletingProducts] = useState(null)

    const [isAdmin, isAdminLoading] = UseAdmin(user?.email)
    const [isSeller, isSellerLoading] = UseSeller(user?.email)

    const { productName, images, categories, brand, shopName, price, discount, stock, color, description, _id, size } = productDetails;

    const [quantityNumber, setQuantityNumber] = useState(0)

    const handleIncrease = () => {
        setQuantityNumber(quantityNumber + 1)
    }
    const handleDecrease = () => {
        setQuantityNumber(quantityNumber - 1)
    }


    const realPrice = parseInt(price)
    const realDiscount = parseInt(discount)
    const discountedAmount = (realPrice * realDiscount) / 100
    const discountedPrice = (realPrice - discountedAmount).toFixed(0)

    const { data: similarData, refetch } = useQuery({
        queryKey: 'similarData',
        queryFn: async () => {
            const res = await fetch(`https://snazzmart-onlinestore-server.vercel.app/similarProduct/${categories}`)
            const data = await res.json()
            return data
        }

    })


    const cancelModalProd = () => {
        setDeletingProducts(null)
    }

    const handleDelete = (id) => {
        fetch(`https://snazzmart-onlinestore-server.vercel.app/product/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.deletedCount > 0) {
                    toast.success('Deleted Successfully')
                    refetch()
                    navigate('/dashboard/myProducts')
                }
            })

    }

    if (isAdminLoading) {
        return <h1>.....</h1>
    }




    const handleUpdateProducts = (data) => {
        const price = parseInt(data.price)
        const discount = parseInt(data.discount)
        const stock = parseInt(data.stock)

        const UpdateDetails = {
            price: price,
            discount: discount,
            stock: stock,
            color: color
        }
        fetch(`https://snazzmart-onlinestore-server.vercel.app/myProduct/${_id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(UpdateDetails)
        })
            .then(res => res.json())
            .then(data => {

                if (data.modifiedCount > 0) {
                    toast.success('Updated Successfully')
                    window.location.reload()
                }

            })
    }

    return (
        <div>
            <div className="mt-14">
                <div className="flex lg:gap-20 gap-10  justify-center lg:items-start items-center flex-col lg:flex-row border-b-2">
                    <img
                        src={images}
                        className=" max-w-sm rounded-lg shadow-2xl" alt='' />

                    <div className='text-start'>
                        <h1 className="text-2xl font-bold text-start w-96">{productName}</h1>
                        <div className='pt-5 flex justify-between '>
                            <div className='text-orange-400 flex'>
                                <IoStar />
                                <IoStar />
                                <IoStar />
                                <IoStarHalf />
                                <IoStarHalf />
                            </div>
                            <div className='flex items-center gap-2'>
                                <FaHeart className='text-2xl text-gray-500' />
                                <IoMdShare className='text-2xl ' />
                            </div>
                        </div>
                        <p className='font-bold py-5 border-b-2'>Brand: <span className='text-blue-700'>{brand}</span></p>
                        <div>
                            <div className='flex items-center text-rose-500 text-xl gap-1 mt-2'>
                                <FaBangladeshiTakaSign className='' />
                                <p className='font-bold'> {discountedPrice}</p>
                            </div>
                            <div className='flex items-center mb-5'>
                                <FaBangladeshiTakaSign className='line-through' />
                                <p className='line-through'>{price}</p>
                                <p className='mx-2'>-{discount}%</p>



                            </div>
                            <p className='border-b-2 pb-2'>Available Items for sell {stock}</p>
                            <div className='my-4'>
                                <h1>Color Family:<span className='mx-2'>{color}</span></h1>
                                <h1>Size:<span className='mx-2'>{size}</span></h1>
                            </div>
                            <div className='my-4 flex items-center gap-5 font-bold'>
                                <h1>Quantity: </h1>
                                <button className='btn' disabled={quantityNumber === 0} onClick={handleDecrease}>-</button>
                                <h1>{quantityNumber}</h1>
                                <button className='btn' disabled={quantityNumber === 15} onClick={handleIncrease}>+</button>
                                
                            </div>
                            <div className='flex justify-between items-center mb-20 mt-10 '>
                               
                                {
                                    !isAdmin && !isSeller ? <>
                                        
                                    </> : <>
                                        <label onClick={() => setDeletingProducts(_id)} htmlFor="confirmation-modal" className="btn bg-rose-500 text-white">Delete</label>


                                        <label htmlFor="my_modal_6" className="btn"><MdEditNote className='text-xl' /></label>

                                       

                                        <input type="checkbox" id="my_modal_6" className="modal-toggle" />
                                        <div className="modal" role="dialog">
                                            <div className="modal-box">

                                                <form onSubmit={handleSubmit(handleUpdateProducts)} className="card-body">
                                                    <div className='grid lg:grid-cols-2 md:grid-cols-2 gap-5'>
                                                        <div className="form-control">
                                                            <label className="label">
                                                                <span className="label-text">Color</span>
                                                            </label>
                                                            <input {...register("color")} type="text" placeholder="color" className="input bg-slate-100" required />
                                                        </div>
                                                        <div className="form-control">
                                                            <label className="label">
                                                                <span className="label-text">Price</span>
                                                            </label>
                                                            <input {...register("price")} type="number" placeholder="Price" className="input bg-slate-100" required />
                                                        </div>
                                                        <div className="form-control">
                                                            <label className="label">
                                                                <span className="label-text">Discount</span>
                                                            </label>
                                                            <input {...register("discount")} type="text" placeholder="Discount" className="input bg-slate-100" required />
                                                        </div>
                                                        <div className="form-control">
                                                            <label className="label">
                                                                <span className="label-text">Stock</span>
                                                            </label>
                                                            <input {...register("stock")} type="number" placeholder="Stock" className="input bg-slate-100" required />
                                                        </div>

                                                    </div>
                                                    <div className="mt-2">
                                                        <button className="btn bg-rose-500 text-white">Update Product</button>
                                                    </div>
                                                </form>
                                                <div className="modal-action">
                                                    <label htmlFor="my_modal_6" className="btn bg-rose-500 text-white">Close!</label>
                                                </div>
                                            </div>
                                        </div>
                                    </>}
                            </div>
                        </div>
                    </div>
                    <div className=' font-semibold lg:shadow-none shadow-xl lg:p-0 p-10 lg:mb-0 mb-20'>

                        <div className=''>
                            {/* <h1 className='mb-2'>Products by {shopName}</h1> */}
                            <div className='flex justify-between items-center mb-2 '>
                                <h1>DeliveryOptions</h1>
                                <CiCircleInfo />
                            </div>

                            <div className='flex justify-start gap-2 items-center mb-2 border-b-2 pb-3'>

                                <SlLocationPin />
                                <h1>Entire Bangladesh</h1>
                            </div>
                            <div className='flex justify-between gap-5 items-center mb-2 '>
                                <div className='flex items-center gap-2 '>
                                    <CiDeliveryTruck />
                                    <h1 >Standard Delivery 3-4 days</h1>
                                </div>
                                <div className='flex items-center '>
                                    <FaBangladeshiTakaSign className='line-through' />
                                    <h1 className='text-base'>60-120</h1>
                                </div>
                            </div>
                            <div className='flex justify-start gap-2  items-center mb-5 border-b-2 pb-3'>
                                <GiTakeMyMoney />
                                <h1>Cash On delivery available</h1>
                            </div>
                            <div className='flex justify-between gap-5 items-center mb-2 '>
                                <h1>Return & Warranty</h1>
                                <CiCircleInfo />
                            </div>
                            <div className='flex justify-start gap-2 items-center mb-2 '>
                                <PiNumberCircleSevenBold />
                                <h1>7 Days Returns</h1>
                            </div>
                            <div className='flex justify-start gap-2 items-center mb-2 border-b-2 pb-3 '>
                                <MdDoNotDisturb />
                                <h1>Warranty not available</h1>
                            </div>
                            <div className='flex items-center border-b-2 pb-3'>
                                <img className='w-20' alt='' src='https://i.ibb.co.com/74NggwK/Untitled.png'></img>
                                <h1 className='w-48'>Download app to enjoy exclusive discounts!</h1>
                            </div>
                            <div className='flex justify-between gap-2 items-center mb-2 mt-5 '>
                                <h1>Sold By</h1>
                                <h1>{shopName}</h1>
                            </div>
                        </div>
                        <div>

                        </div>
                    </div>
                </div>
                <div className=''>
                    <h1 className='text-xl font-semibold mt-5'>Product details of {productName}</h1>
                    <p className='mt-10'>{description}</p>
                </div>
            </div>
            <div className='mt-20'>
                <h1 className='text-start font-bold mb-10 mx-5'>You may also like</h1>
                <div className='grid lg:grid-cols-6 grid-cols-2 md:grid-cols-3 gap-2 mx-5'>
                    {
                        similarData?.map(similarProd => <Product key={similarProd._id} product={similarProd}></Product>)
                    }
                </div>

            </div>

            {
                deletingProducts && <ConfirmationModal
                    title={`Are you sure you want to delete?`}
                    closeModal={cancelModalProd}
                    successAction={handleDelete}
                    modalData={deletingProducts}
                    buttonName='Delete'
                >

                </ConfirmationModal>
            }
        </div>
    );
};

export default MyProductsDetails;