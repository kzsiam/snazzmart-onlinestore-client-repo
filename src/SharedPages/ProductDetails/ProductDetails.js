import React, { useContext, useState } from 'react';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
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
import Product from '../AllProducts/Products/Product';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';







const ProductDetails = () => {
    const { user } = useContext(AuthContext)
    const productDetails = useLoaderData()
    console.log(productDetails)

    const navigate = useNavigate()



    const [isAdmin, isAdminLoading] = UseAdmin(user?.email)
    const [isSeller, isSellerLoading] = UseSeller(user?.email)
    const { register, handleSubmit } = useForm();

    const { productName, images, categories, brand, shopName, price, discount, stock, color, description, _id, size,email } = productDetails;
    

    const [quantityNumber, setQuantityNumber] = useState(1)

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

    if (isAdminLoading) {
        return <h1>.....</h1>
    }
    if (isSellerLoading) {
        return <h1>.....</h1>
    }


    const handleAddToCart = (id) => {
        
        const getQuantity = document.getElementById('quantityValue').innerText;
        const cartProdDetails = {
            productName: productName,
            productImage: images,
            productPrice: discountedPrice,
            productQuantity: getQuantity,
            email: user?.email,
            productId: _id,
            brand: brand,
            size:size,
            color:color
        }

        console.log(cartProdDetails)
        fetch('https://snazzmart-onlinestore-server.vercel.app/addToCart', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(cartProdDetails)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.acknowledged) {
                    toast.success('Successfully added on Cart')
                    navigate('/addToCarts')
                }
                else {
                    toast.error(data.message)
                    navigate('/addToCarts')
                }
            })
    }

    const handleFavourites = (id) => {
        const favouritesData = {
            email: user?.email,
            productName: productName,
            productPrice: discountedPrice,
            productImage: images,
            productId: id,
            productSize: size,
            color: color,
            brand: brand
        }
        console.log(favouritesData)
        fetch('https://snazzmart-onlinestore-server.vercel.app/addToFavourites', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(favouritesData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success('Successfully added on Wishlist')
                    navigate('/addToFavourites')
                }
                else {
                    toast.error(data.message)
                    navigate('/addToFavourites')
                }
            })
        
    }
    const itemsDetails = {
        productName:productName,
        email:email,
        orderedEmail:user?.email,
        categories: categories,
        shopName: shopName,
        size:size,
        images:images,
        id:_id,
        quantityNumber: quantityNumber,
        price:discountedPrice,
        color: color,
        brand:brand,
        name:user?.displayName
    }

    console.log(itemsDetails)
  
    const navigateToCheckout = () =>{
        navigate(`/checkout/${_id}`,{state:{itemsDetails: itemsDetails}})
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
                                <button onClick={() => handleFavourites(_id)}><FaHeart className='text-2xl text-gray-500' /></button>
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
                                <button className='btn' disabled={quantityNumber === 1} onClick={handleDecrease}>-</button>
                                <h1 id='quantityValue'>{quantityNumber}</h1>
                                <button className='btn' disabled={quantityNumber === 15} onClick={handleIncrease}>+</button>

                            </div>
                            <div className='flex justify-between items-center mb-20 mt-10 gap-2'>
                                {

                                    <>
                                        {/* <Link to={`/checkout/${_id}`}>
                                            <div>
                                                <button disabled={isAdmin && isSeller} className="btn w-52 bg-rose-500 text-white">Buy Now</button>
                                            </div>
                                        </Link> */}
                                        <button onClick={navigateToCheckout} disabled={isAdmin && isSeller} className="btn w-52 bg-rose-500 text-white">Buy Now</button>

                                        <button disabled={isAdmin && isSeller} onClick={() => handleAddToCart(_id)}  className=" btn w-1/2 bg-custom-blue text-white" >Add to Cart</button>
                                    </>

                                }
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
            <div className='mt-20 mb-40'>
                <h1 className='text-start font-bold mb-10 mx-5'>You may also like</h1>
                <div className='grid lg:grid-cols-6 grid-cols-2 md:grid-cols-3 gap-2 mx-5'>
                    {
                        similarData?.map(similarProd => <Product key={similarProd._id} product={similarProd}></Product>)
                    }
                </div>

            </div>


        </div>
    );
};

export default ProductDetails;