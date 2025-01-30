import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { AuthContext } from '../../contexts/AuthProvider';
import toast from 'react-hot-toast';

const Signup = () => {
    const { createUser, updateUserInfo, emailVerification } = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'



    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [passwordError, setPasswordError] = useState("")
    const [signupError, setSignupError] = useState('')
    const handleSignup = data => {


        // if (!/(^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$)/.test(data.password)) {
        //     setPasswordError('please add at least one letter, one number and one special character')
        // }
        if (data.password !== data.confirmPassword) {
            setPasswordError('password did not match')
        }
        if (data.password === data.confirmPassword) {
            console.log(data)
            createUser(data.email, data.password)
                .then(result => {
                    handleUpdate(data.name)

                    const userInfo = {
                        name: data.name,
                        email: data.email,
                    }
                    console.log(userInfo)

                    console.log(result)

                    fetch("https://snazzmart-onlinestore-server.vercel.app/allUsers", {
                        method: 'POST',
                        headers:{
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(userInfo)
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data)
                            if (data.acknowledged) {
                                toast.success("created successfully")
                                navigate(from,{replace:true})
                            }
                        })
                })
                .catch(error => {
                    setSignupError(error.message)
                })
        }
    };

    const handleUpdate = (name) => {
        const profile = {
            displayName: name
        }
        updateUserInfo(profile)
            .then(() => {

            })
            .catch((error) => {

            })

    }
    return (
        <div className=''>
            <h1 className='text-2xl font-bold m-10'>Welcome to SnazzMart! Signup now</h1>

            <div className="hero">
                <div className="hero-content shadow-xl rounded-xl">
                    <div className="card bg-base-100 w-96 shadow-sm">
                        <form onSubmit={handleSubmit(handleSignup)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Full Name</span>
                                </label>
                                <input {...register("name", { required: true, maxLength: 20 })} type="text" placeholder="Full Name" className="input bg-gray-100" required />
                                {errors.name && <span className='text-red-600 mt-2'>Name is too long</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input {...register("email")} type="email" placeholder="email" className="input bg-gray-100" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input {...register("password", { minLength: 8 })} type="password" placeholder="password" className="input bg-gray-100" required />
                                {errors.password && <span className='text-red-600 mt-2'>password must be 8 characters</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Confirm Password</span>
                                </label>
                                <input {...register("confirmPassword")} type="password" placeholder="Confirm Password" className="input bg-gray-100" required />
                                {
                                    passwordError && <span className='text-red-600 mt-2'>{passwordError}</span>
                                }
                                {
                                    signupError && <span className='text-red-600 mt-2'>{signupError}</span>
                                }
                            </div>
                            <div className="form-control ">

                                <div>
                                    <span className="label-text">By clicking signup or Continue with Google, you agree to SnazzMart's <Link className='text-blue-600' to={'google.com'}>Terms of Use</Link> & <Link className='text-blue-600' to={'google.com'}>Privacy Policy</Link>.</span>
                                </div>

                            </div>
                            <div className="form-control mt-2">
                                <button className="bg-rose-500 py-2 rounded text-white">Signup</button>
                            </div>
                        </form>
                        <div className='my-1'>
                            <p>Don't have an account? <Link className='text-blue-600 font-semi-bold' to={'/signin'}>Signin</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;