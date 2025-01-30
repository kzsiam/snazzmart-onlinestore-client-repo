import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { RiDeleteBin5Line } from "react-icons/ri";
import ConfirmationModal from '../../SharedPages/ConfirmationModal/ConfirmationModal';
import toast from 'react-hot-toast';

const AddToFavourites = () => {
    const { user } = useContext(AuthContext)
    const { data: favouritesData,refetch } = useQuery({

        queryKey: 'favouritesData',
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/addToFavourites?email=${user?.email}`)
            const data = await res.json()
            return data
        }
    })

    const [addToFav,setDeleteingAddToFav] = useState(null)

   const modalCancel = () =>{
    setDeleteingAddToFav(null)
   }

   const handleDeleteFvourites = (id) =>{
        fetch(`http://localhost:5000/addToFavourites/${id}`,{
            method: 'DELETE',

        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if (data.deletedCount > 0) {
                toast.success('Deleted Successfully')
                refetch()
            }
        })
   }

    return (
        <div className='mt-10'>
            {
                favouritesData?.map(favouriteData =>


                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}

                            <tbody>
                                {/* row 1 */}
                                <tr>
                                    <th>
                                        <div className=''>
                                            <label onClick={() => setDeleteingAddToFav(favouriteData._id)} htmlFor="confirmation-modal" className=""><RiDeleteBin5Line className='text-xl text-rose-500 ' /></label>
                                            {/* <button onClick={() => setDeletingCart(cartDetail._id)}></button> */}
                                        </div>
                                    </th>
                                    <td>
                                        <Link to={`/product/${favouriteData.productId}`}>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle h-20 w-15">
                                                        <img
                                                            src={favouriteData.productImage}
                                                            alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{favouriteData.productName.slice(0, 50)}</div>
                                                    <div className="text-sm opacity-50">Color: {favouriteData.color}</div>
                                                    <div className="text-sm opacity-50">Size: {favouriteData.productSize}</div>
                                                </div>
                                            </div>
                                        </Link>
                                    </td>

                                    <td>
                                        <div className='flex items-center text-rose-500  gap-1 mt-2'>
                                            <FaBangladeshiTakaSign className='' />
                                            <p className='font-bold'> {favouriteData.productPrice} </p>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                                
                                    {
                                        addToFav && <ConfirmationModal
                                            title={`Are you sure you want to delete`}
                                            closeModal={modalCancel}
                                            successAction={handleDeleteFvourites}
                                            modalData={addToFav}
                                            buttonName='Yes'
                                        >
    
                                        </ConfirmationModal>
                                    }
                        </table>
                    </div>
                )
            }
        </div>
    );
};

export default AddToFavourites;