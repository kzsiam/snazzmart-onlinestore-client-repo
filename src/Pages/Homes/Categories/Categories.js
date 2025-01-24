import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Category from './Category';

const Categories = () => {
    const { data: categories = [], isPending } = useQuery({
        queryKey: "categories",
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/categories')
            const data = await res.json()
            return data;

        }


    })

    if(isPending){
        return <h1>loading.......</h1>
    }
    return (
        <div className='mb-20'>
            <div>
                <h1 className='font-bold text-2xl my-10'>Browse By Categories</h1>
            </div>
            <div className='grid lg:grid-cols-4 grid-cols-2  gap-2  lg:mx-24 mx-2'>
                {
                    categories.map(category => <Category key={category._id} category={category}></Category>)
                }
            </div>
        </div>
    );
};

export default Categories;