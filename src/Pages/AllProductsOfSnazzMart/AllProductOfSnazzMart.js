import React from 'react';
import { Link } from 'react-router-dom';
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { IoMdStar } from "react-icons/io";

const AllProductOfSnazzMart = ({product}) => {
    const { price, discount,_id,productName } = product;
    const discountedAmount = (price * discount) / 100
    const discountedPrice = (price - discountedAmount).toFixed(0)
    return (
        <div>
             <Link to={`/product/${_id}`}>
                <div className=" bg-base-100 w-62 shadow-sm hover:shadow-xl">
                    <figure className="px-5 pt-5">
                        <img
                            src={product.images}
                            alt="Shoes"
                            className=" pr-img" />
                    </figure>
                    <div className="card-body text-start ">
                        <h2 className="font-semibold text-sm">{productName.slice(0, 30)}...</h2>
                        <div className='flex items-center text-rose-500 text-xl'>
                            <FaBangladeshiTakaSign className='' />
                            <p className='font-bold'> {discountedPrice}</p>
                        </div>
                        <div className='flex items-center'>
                            <FaBangladeshiTakaSign className='line-through' />
                            <p className='line-through'>{price}</p>
                            <p>-{product.discount}%</p>
                        </div>
                        <div className='text-orange-400 flex'>
                            <IoMdStar />
                            <IoMdStar />
                            <IoMdStar />
                            <IoMdStar />
                            <IoMdStar />
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default AllProductOfSnazzMart;