import React, { useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import UseAdmin from '../../hooks/UseAdmin';
import { AuthContext } from '../../contexts/AuthProvider';
import ConfirmationModal from '../../SharedPages/ConfirmationModal/ConfirmationModal';


const AllUsers = () => {

    const { user, logout } = useContext(AuthContext)

    const [isAdmin, isAdminLoading] = UseAdmin(user?.email)
    console.log(isAdmin)
    

    const [deletingUser, setDeletingUser] = useState(null)
    const [makeAdmin, setMakeAdmin] = useState(null)


    const { data: allUsers, isLoading, refetch } = useQuery({
        queryKey: "allUsers",
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/allUsers')
            const data = await res.json()
            return data;

        }
    })

    if(isLoading){
        return <h1>.....</h1>
    }

    const modalCancel = () => {
        setMakeAdmin(null)
    }
    const modalClose = () => {
        setDeletingUser(null)
    }
    if (isAdminLoading) {
        <div className='flex justify-center items-center my-40'>
            <span className="loading loading-bars loading-xs"></span>
            <span className="loading loading-bars loading-sm"></span>
            <span className="loading loading-bars loading-md"></span>
            <span className="loading loading-bars loading-lg"></span>
        </div>
    }

    const handleMakeAdmin = (id) => {
        console.log(id)
        fetch(`http://localhost:5000/allUsers/${id}`, {
            method: 'PATCH',
            headers: {

            }

        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount > 0) {

                    toast.success('Make Admin Successfully')
                    refetch()
                }
            })
    }

    const handleDeleteUser = (id) => {
        fetch(`http://localhost:5000/allUsers/${id}`, {
            method: 'DELETE',
            headers: {

            }

        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.deletedCount > 0) {

                    toast.success('Make Admin Successfully')
                    refetch()
                }
            })
    }

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>AccountType</th>
                            <th>Admin</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            allUsers?.map((allUser, number) => <tr>

                                <th>{number + 1}</th>
                                <td>{allUser.name}</td>
                                <td>{allUser.email}</td>
                                <td>{allUser.accountType}</td>
                                {
                                    allUser?.role !== 'admin' ? <td><label onClick={() => setMakeAdmin(allUser._id)} htmlFor="confirmation-modal" className="btn btn-xs btn-primary">Make Admin</label></td> : <td><p className='font-bold'>Admin</p></td>
                                }
                                <td><label onClick={() => setDeletingUser(allUser._id)} htmlFor="confirmation-modal" className="btn btn-xs btn-primary">Delete User</label></td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>

            {
                makeAdmin && <ConfirmationModal
                    title={`Are you sure you want to make admin?`}
                    closeModal={modalCancel}
                    successAction={handleMakeAdmin}
                    modalData={makeAdmin}
                    buttonName='Yes'
                >

                </ConfirmationModal>
            }
            {
                deletingUser && <ConfirmationModal
                    title={`Are you sure you want to make admin?`}
                    closeModal={modalClose}
                    successAction={handleDeleteUser}
                    modalData={deletingUser}
                    buttonName='Yes'
                >

                </ConfirmationModal>
            }
        </div>
    );
};

export default AllUsers;