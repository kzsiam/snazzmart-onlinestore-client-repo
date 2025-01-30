import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { XAxis, YAxis, CartesianGrid, ResponsiveContainer, LabelList, BarChart, Bar,Label } from 'recharts'
import { AuthContext } from '../../contexts/AuthProvider';


const Dashboard = () => {
    const { user } = useContext(AuthContext)
    const { data: allOrderData, refetch, isLoading } = useQuery({

        queryKey: 'allOrderData',
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/orders`)
            const data = await res.json()
            return data
        }
    })
    const { data: allUsers } = useQuery({

        queryKey: 'allUsers',
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/allUsers`)
            const data = await res.json()
            return data
        }
    })
    const { data: allProducts } = useQuery({

        queryKey: 'allProducts',
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/allproductsOfSnazzMart`)
            const data = await res.json()
            return data
        }
    })

    const data = [
        {
            name: 'Page A',
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: 'Page B',
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: 'Page C',
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: 'Page D',
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: 'Page E',
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: 'Page F',
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            name: 'Page G',
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
    ];



    const total = allOrderData.map(items => items.totalPrice).reduce((acc, curr) => acc + curr, 0);

    return (
        <div>
            <div className='mt-20 mb-40 lg:mx-20 mx-10'>
                <div className='grid lg:grid-cols-4 md:grid-cols-2 gap-5 mx-10'>
                    <div className="card bg-base-100 w-80 shadow-xl">
                        <div className="card-body">
                            <p className='font-bold'>Total orders: {allOrderData.length}</p>
                        </div>
                    </div>
                    <div className="card bg-base-100 w-80 shadow-xl">
                        <div className="card-body">
                            <p className='font-bold'>Total Users : {allUsers.length}</p>
                        </div>
                    </div>

                    <div className="card bg-base-100 w-80 shadow-xl">
                        <div className="card-body">
                            <p className='font-bold'>Total Products: {allProducts.length}</p>
                        </div>
                    </div>
                    <div className="card bg-base-100 w-80 shadow-xl">
                        <div className="card-body">
                            <p className='font-bold'>Total sales Amount: {total} Taka</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='lg:mx-52 mx-5'>

                <div>
                    <h1 className='text-center font-bold mb-20'>Sales Chart</h1>
                    <ResponsiveContainer width="80%" height={400}>
                        <BarChart
                            width={730}
                            height={250}
                            data={data}
                            margin={{ top: 15, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name">
                                <Label value="Pages of my website" offset={0} position="insideBottom" />
                            </XAxis>
                            <YAxis label={{ value: 'pv of page', angle: -90, position: 'insideLeft', textAnchor: 'middle' }} />
                            <Bar dataKey="pv" fill="#8884d8">
                                <LabelList dataKey="name" position="insideTop" angle="45" />
                            </Bar>
                            <Bar dataKey="uv" fill="#82ca9d">
                                <LabelList dataKey="uv" position="top" />
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

            </div>
        </div>
    );
};

export default Dashboard;