import React, { useEffect, useState } from 'react';
import AllProductOfSnazzMart from './AllProductOfSnazzMart';


const AllProductsOfSnazzMart = () => {
    const [asc, setAsc] = useState(true)
 
    const [allProductsOfSnazzMart,setAllProductsOfSnazzMart] = useState()
    useEffect(() => {
        fetch(`https://snazzmart-onlinestore-server.vercel.app/allProductsOfSnazzMart?sort=${asc ? 'asc' : 'dsc'}`)
            .then(res => res.json())
            .then(data => {
                setAllProductsOfSnazzMart(data)
            })
    }, [asc])


    // const { data: allProductsOfSnazzMart, isPending } = useQuery({
    //     queryKey: 'allProductsOfSnazzMart',
    //     queryFn: async () => {
    //         const res = await fetch(`https://snazzmart-onlinestore-server.vercel.app/allProductsOfSnazzMart?order=${isAsc ? 'PriceAsc' : 'PriceDsc'}`)
    //         const data = await res.json()
    //         return data;
    //     }
    // })
    



    // if (isPending) {
    //     return <h1>loading</h1>
    // }




    return (
        <div className='mt-10'>
            <div className='flex lg:justify-end justify-center items-center mb-5'>
                <h1 className='font-bold mb-1 mx-5'>Sort By</h1>
                <button onClick={() => setAsc(!asc)}>{asc ? 'Price: High to Low' : 'Price Low to High'}</button>

            </div>
            <div className='grid lg:grid-cols-6 grid-cols-2 md:grid-cols-3 gap-2 mx-5'>
                {
                    allProductsOfSnazzMart?.map(product => <AllProductOfSnazzMart key={product._id} product={product}></AllProductOfSnazzMart>)
                }
            </div>

            <div>
                <button className='btn bg-rose-500 mt-5 text-white'>Load More</button>
            </div>
        </div>
    );
};

export default AllProductsOfSnazzMart;