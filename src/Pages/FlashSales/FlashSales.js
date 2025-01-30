import React from 'react';
import Product from '../../SharedPages/AllProducts/Products/Product';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

const FlashSales = () => {
    const { data: flashSales } = useQuery({
        queryKey: 'flashSales',
        queryFn: async () => {
            const res = await fetch('https://snazzmart-onlinestore-server.vercel.app/flashSale')
            const data = res.json();
            return data;
        }
    })

    console.log(flashSales)
    return (
        <div className='bg-slate-100 py-5 rounded-xl lg:mx-20 mt-5'>
            <div className='flex justify-between mx-10 mb-10'>
                <h1 className='font-bold text-xl'>Flash Sale</h1>
                <Link to={'/allProductsOfSnazzMart'}><button className='btn border-rose-500 text-rose-500'>SHOP ALL PRODUCTS</button></Link>
            </div>
            <div className='grid lg:grid-cols-6 grid-cols-2 md:grid-cols-3 gap-2 mx-5'>
                {
                    flashSales?.map(product => <Product key={product._id} product={product}></Product>)
                }
            </div>
        </div>
    );
};

export default FlashSales;