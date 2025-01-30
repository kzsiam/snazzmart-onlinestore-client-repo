import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../contexts/AuthProvider';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddProducts = () => {


    const navigate = useNavigate()

    const { user } = useContext(AuthContext)

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { data: categoriesCollection, isPending } = useQuery({
        queryKey: ['categoriesCollection'],
        queryFn: async () => {
            const res = await fetch('https://snazzmart-onlinestore-server.vercel.app/categories')
            const data = await res.json()
            return data;
        }


    })

    const [sellerInfo, setSellerInfo] = useState(null)

    useEffect(() => {
        fetch(`https://snazzmart-onlinestore-server.vercel.app/allUsers/${user?.email}`)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                console.log(data)
                setSellerInfo(data)
            })
    }, [user?.email])
    const handleAddProducts = (data) => {
        const price = parseInt(data.price)
        const discount = parseInt(data.discount)
        const stock = parseInt(data.stock)
        
        const uploadedImg = data.images[0]
        const formData = new FormData()
        formData.append('image', uploadedImg)
        const url = 'https://api.imgbb.com/1/upload?key=22c91bff968cdf91f2c314bc15c86485'
        fetch(url, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                
                const productsData = {
                    shopName: sellerInfo?.shopName,
                    productName: data.productName,
                    brand: data.brand,
                    categories: data.categories,
                    color: [data.color],
                    description: data.descriptions,
                    images: imgData.data.url,
                    size: data.size,
                    email: user?.email,
                    stock: stock,
                    price: price,
                    discount: discount,
                }

                console.log(productsData)

                fetch('https://snazzmart-onlinestore-server.vercel.app/allProducts', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(productsData)
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.acknowledged) {
                            navigate('/dashboard/myProducts')
                            toast.success('Product added Successfully')
                        }
                    })
            })
    }
    return (
        <div>
            <h1 className='my-10 font-bold text-xl'>Add your product and grew up your sells</h1>
            <div className="">
                <div className="">
                    <div className="">
                        <form onSubmit={handleSubmit(handleAddProducts)} className="card-body">
                            <div className='grid lg:grid-cols-2 md:grid-cols-2 gap-5'>
                                <div className="form-control ">
                                    <label className="label">
                                        <span className="label-text">Products Name</span>
                                    </label>
                                    <input {...register("productName", 
                                        {minLength: { value: 30, message: 'it should be 30+ character' }}
                                    )} type="text" placeholder="products name" className="input bg-slate-100" required />
                                    {
                                        errors.productName && <p className='text-red-600 mt-2'>{errors.productName.message}</p>
                                    }

                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Brand</span>
                                    </label>
                                    <input {...register("brand", { required: "brand option is required" })} type="text" placeholder="Brand" className="input bg-slate-100" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Select Products Category</span>
                                    </label>
                                    <select {...register("categories", { required: "brand option is required" })} className="select bg-slate-100 ">
                                        <option disabled selected></option>
                                        {
                                            categoriesCollection?.map(category => <>
                                                <option>{category.category_name
                                                }</option>
                                            </>)
                                        }
                                    </select>
                                    {
                                        errors.categories && <p className='text-red-600 mt-2'>{errors.categories.message}</p>
                                    }
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Size</span>
                                    </label>
                                    <select {...register("size", { required: "please select size" })} className="select bg-slate-100 ">
                                        <option disabled selected></option>
                                        <option>No Size</option>
                                        <option>All Sizes</option>
                                        <option disabled>Clothes Size</option>
                                        <option>0</option>
                                        <option>1-5</option>
                                        <option>10-15y</option>
                                        <option>S-XXL</option>
                                        <option disabled>Shoes Size</option>
                                        <option>0</option>
                                        <option>1-5y</option>
                                        <option>10-15y</option>
                                        <option>38-45</option>
                                    </select>
                                    {
                                        errors.size && <p className='text-red-600 mt-2'>{errors.size.message}</p>
                                    }
                                </div>
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
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Descriptions</span>
                                    </label>
                                    <input {...register("descriptions")} type="text" placeholder="Descriptions" className="input bg-slate-100 input-lg w-full" required />

                                </div> 
                                 <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Products Images</span>
                                    </label>
                                    <input multiple {...register("images")} type="file" className="file-input file-input-bordered bg-black text-white file-input-lg w-full" accept='image/*' required />
                                </div>

                            </div>
                            <div className="mt-10">
                                <button className="btn bg-zinc-950 text-white">Add Products</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddProducts;