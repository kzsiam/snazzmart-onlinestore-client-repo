import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import MyProduct from './MyProduct';

const MyProducts = () => {

    const { user } = useContext(AuthContext)
    console.log(user?.email)

    const { data: myProducts, isLoading } = useQuery({
        queryKey: "myProducts",
        queryFn: async () => {
            const res = await fetch(`https://snazzmart-onlinestore-server.vercel.app/allProductsOfSnazzMart?email=${user?.email}`)
            const data = await res.json()
            return data;
            
        }
    })
    if(isLoading){
        return <h1>loading......</h1>
    }

    // console.log(myProducts)

    return (
        <div className='mt-20'>
            <div className='grid lg:grid-cols-6 grid-cols-2 md:grid-cols-3 gap-5 lg:mx-20 mx-5 '>
                {
                    myProducts.map(myProduct =><MyProduct key={myProduct._id} product={myProduct}></MyProduct>)
                }
            </div>

        </div>
    );
};

export default MyProducts;