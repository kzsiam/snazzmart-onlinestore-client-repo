import { useQuery } from '@tanstack/react-query';
import React from 'react';
import AllProductOfSnazzMart from './AllProductOfSnazzMart';

const AllProductsOfSnazzMart = () => {

    const { data: allProductsOfSnazzMart, isPending } = useQuery({
        queryKey: 'allProductsOfSnazzMart',
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/allProductsOfSnazzMart')
            const data = await res.json()
            return data;
        }
    })

    if (isPending) {
        return <h1>loading</h1>
    }


    return (
        <div className='mt-10'>
            <div className='flex lg:justify-end justify-center items-center mb-5'>
                <h1 className='font-bold mb-1'>Sort By</h1>
                <label className="form-control">
                    <select className="select select-bordered mx-3">
                        <option disabled selected>Pick one</option>
                        <option>Star Wars</option>
                        <option>Harry Potter</option>
                        <option>Lord of the Rings</option>
                        <option>Planet of the Apes</option>
                        <option>Star Trek</option>
                    </select>

                </label>
            </div>
            <div className='grid lg:grid-cols-6 grid-cols-2 md:grid-cols-3 gap-2 mx-5'>
                {
                    allProductsOfSnazzMart?.map(product => <AllProductOfSnazzMart key={product._id} product={product}></AllProductOfSnazzMart>)
                }
            </div>
        </div>
    );
};

export default AllProductsOfSnazzMart;