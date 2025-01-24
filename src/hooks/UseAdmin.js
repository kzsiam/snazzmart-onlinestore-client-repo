import React, { useEffect, useState } from 'react';

const UseAdmin = (email) => {
    const [isAdmin, setIsAdmin] = useState(false)
        const [isAdminLoading, setIsAdminLoading] = useState(true)
     useEffect(() =>{
            if(email){
                fetch(`http://localhost:5000/allUsers/admin/${email}`)
                .then(res=> res.json())
                .then(data =>{
                    setIsAdmin(data.isAdmin)
                    console.log(data.isAdmin)
                    setIsAdminLoading(false)
                })
            }
        },[email])
        return (
            [isAdmin,isAdminLoading]
        );
};

export default UseAdmin;