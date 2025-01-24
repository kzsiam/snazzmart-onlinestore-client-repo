import React from 'react';
import { Link } from 'react-router-dom';

const Category = ({ category }) => {

    const { _id, category_name, Dname } = category;
    return (
        <div className='hover:shadow-xl'>
            <Link to={`allProducts/${category_name}`}>
                <div className="card bg-base-100  h-28 shadow-md">
                    <div className="card-body">
                        <h2 className="card-title lg:text-xl text-sm text-center">{Dname}</h2>
                    </div>
                </div>
            </Link>


        </div>
    );
};

export default Category;