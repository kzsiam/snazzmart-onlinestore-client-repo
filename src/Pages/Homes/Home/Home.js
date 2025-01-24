import React from 'react';
import Banners from '../Banners/Banners';
import Categories from '../Categories/Categories';
import Products from '../../../SharedPages/AllProducts/Products/Products';
import FlashSales from '../../FlashSales/FlashSales';
import { Link } from 'react-router-dom';


const Home = () => {
    return (
        <div>
           <Banners></Banners>
           <FlashSales></FlashSales>
           <Categories></Categories>
           <Products></Products>

           <div className='mt-40'>
                <Link to={'/allProducts/groceries'}><img className='w-full' src='https://m2ce.sindabad.com/pub/media/scriptlodge/banner/image//web/stb-monthly-bazar-1420-en.jpg' alt=''></img></Link>
           </div>
        </div>
    );
};

export default Home;