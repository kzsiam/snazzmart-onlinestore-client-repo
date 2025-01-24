import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import toast from 'react-hot-toast';

const Signin = () => {
    const { signinEmailPass, signinWGoogle, emailReset } = useContext(AuthContext)

    const [forgetEmail, setForgetEmail] = useState("")
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'

    const [signinError, setSigninError] = useState('')

    const { register, handleSubmit, formState: { errors } } = useForm()

    const handleEmailBlur = (e) => {
        setForgetEmail(e.target.value)
        console.log(e.target.value)
    }
    const handleSignin = (data) => {
        signinEmailPass(data.email, data.password)
            .then(result => {
                toast.success('welcome back')
                navigate(from,{replace:true})
            })
            .catch(error => {
                setSigninError(error.message)
            })
    }

    const handleForget = () => {
        if (!forgetEmail) {
            toast.error("please type your email first")
        }
        else {
            emailReset(forgetEmail)
                .then(() => {
                    alert("password reset email sent")
                })
        }

    }

    const handleGoogleSign = () => {
        signinWGoogle()
            .then(result => {
                navigate('/')
                console.log(result)
            })
            .catch(error => {
                console.log(error)
            })
    }
    return (
        <div className=''>
            <h1 className='text-2xl font-bold m-10'>Welcome back! Login now</h1>

            <div className="hero">
                <div className="hero-content shadow-xl rounded-xl">
                    <div className="card bg-base-100 w-96 shadow-sm">
                        <form onSubmit={handleSubmit(handleSignin)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input onFocus={handleEmailBlur} {...register("email")} type="email" placeholder="email" className="input bg-gray-100" required />

                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input {...register("password")} type="password" placeholder="password" className="input bg-gray-100" required />
                                <label className="label">
                                    <button onClick={handleForget} >Forgot password?</button>
                                </label>

                                {
                                    signinError && <span className='text-red-600 mt-2'>{signinError}</span>
                                }
                            </div>
                            <div className="form-control mt-2">
                                <button className="bg-rose-500 py-2 rounded text-white">Login</button>
                            </div>
                        </form>
                        <div>
                            <button onClick={handleGoogleSign} className="btn  px-24"><img alt='' className='w-7' src='https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png' />Sign In Google</button>
                        </div>
                        <div className='my-10'>
                            <p>Don't have an account? <Link to={'/signup'}>Signup</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signin;