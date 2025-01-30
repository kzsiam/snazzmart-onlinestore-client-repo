import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { HiBadgeCheck } from "react-icons/hi";
import toast from 'react-hot-toast';




const CheckOut = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm();
     const itemsDetails = location.state.itemsDetails;

    //  console.log(itemsDetails)

     const itemPrice = parseInt(itemsDetails.price)
     const deliveryCharge = 60

    const totalItemsPrice = (itemsDetails.quantityNumber * itemPrice);
    const totalPrice = totalItemsPrice + deliveryCharge;

     const handleOrder = (data) =>{
        // console.log(data)
        const orderedData = {
            productName: itemsDetails.productName,
            email: itemsDetails.email,
            name: data.name,
            orderedEmail:data.email,
            quantityNumber:itemsDetails.quantityNumber,
            totalPrice: totalPrice,
            phoneNumber: data.phoneNumber,
            address:data.address,
            size:data.size,
            color:data.color,
            orderStatus:'',
            itemsId: itemsDetails.id,
            images: itemsDetails.images
        }
        fetch('https://snazzmart-onlinestore-server.vercel.app/orders',{
            method:'POST',
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify(orderedData)
        })
        .then(res => res.json())
        .then(data => {
            if(data.acknowledged){
                toast.success('Order Placed')
                navigate('/myorders')
            }
        })
     }

    return (
        <div>
            <div className='mt-10'>
                <h1 className='text-start font-bold mb-10'>Shipping & Billing</h1>
                <div className='flex justify-between mx-10 mb-20'>
                    <h1>Package 1 of 1</h1>
                    <h1>Shipped by <span className='font-bold'>{itemsDetails.shopName}</span></h1>
                </div>
                <div className='mt-5'>
                    <div>
                        <Link to={`/product/${itemsDetails.id}`}>
                            <div className="flex items-center gap-3 justify-evenly">
                                <div className="avatar">
                                    <div className="mask mask-squircle h-20 w-15">
                                        <img
                                            src={itemsDetails.images}
                                            alt="Avatar Tailwind CSS Component" />
                                    </div>
                                </div>
                                <div>
                                    <div className="font-bold">{itemsDetails.productName.slice(0, 50)}</div>
                                    <div className="text-sm opacity-50"><h1>Brand: {itemsDetails.brand}</h1></div>
                                </div>
                                <div className='flex items-center mb-5 text-rose-500 font-bold'>
                                    <FaBangladeshiTakaSign />
                                    <p >{itemsDetails.price}</p>
                                </div>
                                <div>
                                    <h1>Qty:{itemsDetails.quantityNumber}</h1>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className='flex justify-evenly mt-20'>
                        <div>
                            <h1 className='text-start mb-6'>Delivery Option</h1>
                            <div className='border-2 lg:w-64 p-2 w-48 text-start flex gap-5'>
                                <div>

                                    <HiBadgeCheck className='text-2xl text-green-600' />
                                </div>
                                <div>
                                    <div className='flex items-center'>

                                        <FaBangladeshiTakaSign />
                                        <h1>60 </h1>
                                    </div>
                                    <h1>Standard Delivery</h1>
                                    <h1>Guaranteed By 3 to 4 days</h1>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h1 className='text-start mb-2'>Orders Summary</h1>
                            <div className=''>

                                <div className='flex justify-between items-center my-5 gap-5'>
                                    <h1>Item,s Total ({itemsDetails.quantityNumber}items)</h1>
                                    <h1>{totalItemsPrice}</h1>
                                </div>
                                <div className='flex justify-between items-center my-5'>
                                    <h1>Delivery Fee: </h1>
                                    <div className='flex items-center'>

                                        <FaBangladeshiTakaSign />
                                        <h1>60 </h1>
                                    </div>
                                </div>
                                <div className='flex justify-between items-center my-5'>
                                    <h1>Total: </h1>
                                    <div className='flex items-center text-rose-500 font-bold'>

                                        <FaBangladeshiTakaSign />
                                        <h1>{totalPrice} </h1>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="hero-content flex lg:mx-32">

                        <div className="  shrink-0  ">
                            <form onSubmit={handleSubmit(handleOrder)} className="card-body">
                                <div className='grid lg:grid-cols-3 md:grid-cols-2 md:gap-3 lg:gap-10 '>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Name</span>
                                        </label>
                                        <input defaultValue={itemsDetails?.name} {...register("name")} type="text" placeholder="Name" className="input bg-slate-100" required />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Email</span>
                                        </label>
                                        <input {...register("email")} type="email" placeholder="Email" defaultValue={itemsDetails?.orderedEmail} className="input bg-slate-100" required />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Phone Number</span>
                                        </label>
                                        <input {...register("phoneNumber",{
                                            maxLength: { value: 11, message: 'please enter a valid number' },
                                            minLength: { value: 11, message: 'please enter a valid number' }
                                        })} type="number" placeholder="Phone Number" className="input bg-slate-100" required />
                                        {errors.phoneNumber && <span className='text-red-600 mt-2'>{errors.phoneNumber.message}</span>}
                                    </div>
                                    
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Address</span>
                                        </label>
                                        <input {...register("address")} type="text" placeholder="Address" className="input bg-slate-100" required />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Size</span>
                                            <span className="label-text">{itemsDetails.size}</span>
                                        </label>
                                        <input {...register("size")} type="text" placeholder="Size" className="input bg-slate-100" required />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Color</span>
                                            <span className="label-text">{itemsDetails.color}</span>
                                        </label>
                                        <input {...register("color")} type="text" placeholder="Color" className="input bg-slate-100" required />
                                    </div>
                                </div>
                                <div className="mt-10 flex justify-end">
                                    <button className="btn bg-rose-500 text-white">Order Now</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default CheckOut;