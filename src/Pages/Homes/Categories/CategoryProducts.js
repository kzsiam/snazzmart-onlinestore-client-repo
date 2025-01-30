import React, { useState } from 'react';
import Product from '../../../SharedPages/AllProducts/Products/Product';
import { useLoaderData } from 'react-router-dom';

const CategoryProducts = () => {
    const categoriesProducts = useLoaderData()
    console.log(categoriesProducts)



    return (
        <div className='mb-96 mt-20'>
            <div className='flex justify-between items-center'>
                {/* <h1 className='lg:text-xl text-sm text-start font-bold p-10'>Available products by categories</h1> */}
                <h1 className='text-xl  text-start font-bold p-10'>showing {categoriesProducts.length} results for...</h1>
                {/* <label className="form-control">
                    <h1 className='font-bold mb-1'>Sort By</h1>
                    <select className="select select-bordered mx-10">
                        <option disabled selected>Pick one</option>
                        <option>Star Wars</option>
                        <option>Harry Potter</option>
                        <option>Lord of the Rings</option>
                        <option>Planet of the Apes</option>
                        <option>Star Trek</option>
                    </select>
                    
                </label> */}
            </div>

            <div className='grid lg:grid-cols-6 grid-cols-2 md:grid-cols-3 gap-2 mx-5'>
                {
                    categoriesProducts.map(categoriesProduct => <Product product={categoriesProduct} key={categoriesProduct._id}></Product>)
                }
            </div>
        </div>
    );
};

export default CategoryProducts;