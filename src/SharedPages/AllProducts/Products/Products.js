import React, { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import Product from './Product';
import { Link } from 'react-router-dom';

const Products = () => {
    const { user } = useContext(AuthContext)

    const { data: products, isPending } = useQuery({
        queryKey: 'products',
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/justForyou')
            const data = await res.json()
            return data;

        }
    })

    const count = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 3, 5, 5, 5, 5, 5, 55]

    // console.log(products)

    if (isPending) {
        return (
            <div className='grid lg:grid-cols-6 grid-cols-2 md:grid-cols-3 gap-5 lg:mx-20 mx-5 '>
                {
                    count?.map(product => <div className="flex w-52 flex-col gap-4">
                        <div className="skeleton h-32 w-full"></div>
                        <div className="skeleton h-4 w-28"></div>
                        <div className="skeleton h-4 w-full"></div>
                        <div className="skeleton h-4 w-full"></div>
                    </div>)
                }
            </div>
        );
    }
    return (
        <div className=''>
            <h1 className='font-bold text-start mx-10'>Just For You</h1>

            <div className='grid lg:grid-cols-6 grid-cols-2 md:grid-cols-3 gap-2 mx-5'>
                {
                    products.map(product => <Product key={product._id} product={product}></Product>)
                }
            </div>
        </div>
    );
};

export default Products;