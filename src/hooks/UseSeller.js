import  { useEffect, useState } from 'react';

const UseSeller = (email) => {
    const [isSeller, setIsSeller] = useState(false)
    const [isSellerLoading, setIsSellerLoading] = useState(true)

    useEffect(() =>{
        if(email){
            fetch(`https://snazzmart-onlinestore-server.vercel.app/allUsers/seller/${email}`)
            .then(res=> res.json())
            .then(data =>{
                setIsSeller(data.isSeller)
                console.log(data.isSeller)
                setIsSellerLoading(false)
            })
        }
    },[email])
    return (
        [isSeller,isSellerLoading]
    );
};

export default UseSeller;