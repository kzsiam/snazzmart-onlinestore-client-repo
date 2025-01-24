import React from 'react';
import { Area, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, LabelList, BarChart, Label, ComposedChart, Legend, Bar, Line } from 'recharts'


const Dashboard = () => {
    const data = [
        { name: 'Page A', uv: 400, pv: 75000, amt: 40000 },
        { name: 'Page B', uv: 400, pv: 47000, amt: 14000 },
        { name: 'Page c', uv: 400, pv: 32000, amt: 40020 },
        { name: 'Page d', uv: 100, pv: 80400, amt: 90740 },
    ];
    return (
        <div>
            <div className='mt-10 mb-40 lg:mx-20 mx-10'>
                <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-5'>
                    <div className="card bg-base-100 w-96 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">total orders</h2>
                            <p>If a dog chews shoes whose shoes does he choose?</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">Buy Now</button>
                            </div>
                        </div>
                    </div>
                    <div className="card bg-base-100 w-96 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">Ordered Products Sales</h2>
                            <p>If a dog chews shoes whose shoes does he choose?</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">Buy Now</button>
                            </div>
                        </div>
                    </div>
                    <div className="card bg-base-100 w-96 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">Total Review</h2>
                            <p>If a dog chews shoes whose shoes does he choose?</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">Buy Now</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='grid lg:grid-cols-2  lg:mx-20 mx-10'>

                <div>
                    <h1 className='text-start font-bold'>Sales DashBoard</h1>
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
                <div>
                    <h1 className='text-start'>sales DashBoard</h1>
                    <ResponsiveContainer width="80%" height={400}>
                        <ComposedChart width={730} height={250} data={data}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <CartesianGrid stroke="#f5f5f5" />
                            <Area type="monotone" dataKey="amt" fill="#8884d8" stroke="#8884d8" />
                            <Bar dataKey="pv" barSize={20} fill="#413ea0" />
                            <Line type="monotone" dataKey="uv" stroke="#ff7300" />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>

            </div>
        </div>
    );
};

export default Dashboard;