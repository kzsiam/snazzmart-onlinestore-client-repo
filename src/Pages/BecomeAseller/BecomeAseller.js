import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../contexts/AuthProvider';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const BecomeAseller = () => {
    const {user} = useContext(AuthContext)
    // console.log(user)
    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm()

    const submitInfo = (data) =>{
        const sellerInfo = {
            shopName:data.shopName,
            phoneNumber:data.phoneNumber,
            shopLocation: data.shopLocation
        }

        console.log(sellerInfo)

        fetch(`https://snazzmart-onlinestore-server.vercel.app/allUsers/${user?.email}`,{
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(sellerInfo)
        })

        .then(res => res.json())
        .then(data => {
            console.log(data)
            navigate('/')
            toast.success("Successfully Switched to seller")

        })
    }
    
    return (
        <div>
             <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:px-20 lg:text-left">
                        <h1 className="text-5xl font-bold">Become A SnazzMart Seller Today!</h1>
                        <p className="py-6 text-xl">
                            Create a SnazzMart seller account now and reach millions of customers!
                        </p>
                        <p className="py-6">
                            <span className='font-bold'>Note:</span> If you are signed in with google, you cannot become a seller on our website. So you need to sign up.
                        </p>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form onSubmit={handleSubmit(submitInfo)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Shop Name</span>
                                </label>
                                <input {...register('shopName')} type="text" placeholder="shop name" className="input bg-gray-100" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Phone Number</span>
                                </label>
                                <input {...register('phoneNumber', {
                                    maxLength: { value: 11, message: 'please enter a valid number' },
                                    minLength: { value: 11, message: 'please enter a valid number' }

                                })} type="number" placeholder="phone number" className="input bg-gray-100" required />
                            </div>
                            {errors.phoneNumber && <span className='text-red-600 mt-2'>{errors.phoneNumber.message}</span>}


                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Shop Location</span>
                                </label>
                                <input {...register('shopLocation')} type="text" placeholder="shop location" className="input bg-gray-100" required />
                            </div>

                            <div className="form-control mt-6">
                                <button className="bg-zinc-950 py-2 rounded text-white">Switch To Seller</button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default BecomeAseller;