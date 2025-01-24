import React from 'react';
import ImageGallery from "react-image-gallery";



const images = [
    {
        original: 'https://i.ibb.co.com/9rdWxTn/banner1.jpg',
    },
    {
        original: 'https://i.ibb.co.com/phg3Wkw/banner2.jpg',
    },
    {
        original: 'https://i.ibb.co.com/sjTTfbR/banner3.jpg',
    },
    {
        original: 'https://i.ibb.co.com/hMCWj00/banner4.jpg',
    },
    {
        original: 'https://i.ibb.co.com/D9Ks88W/banner5.jpg',
    },
    {
        original: 'https://i.ibb.co.com/0yxMjvP/banner6.jpg',
    },
    {
        original: 'https://i.ibb.co.com/HNRbccb/banner7.png',
    },
];
const Banners = () => {
    return (
        <div className='lg:mx-20 mt-5 flex'>
            <div className='mx-2'>
                <ImageGallery className='' showThumbnails={false}
                    showFullscreenButton={false} showBullets={true}
                    slideInterval={3000} showPlayButton={false} showNav={false} autoPlay={true} items={images}></ImageGallery>
            </div>
            <div className='lg:grid col-span-2 md:hidden hidden  gap-2 w-80'>
            {/* <div className='lg:flex justify-center items-center md:hidden hidden w-80'> */}
                <div >
                    <img className='w-96 mb-2' src='https://i.ibb.co.com/VThHwS0/banner8.jpg' alt=''></img>

                    <img className='w-96 mb-2' src='https://i.ibb.co.com/HNRbccb/banner7.png' alt=''></img>

                    <img className='w-96' src='https://i.ibb.co.com/9rdWxTn/banner1.jpg' alt=''></img>
                </div>
                
            </div>
        </div>
    );
};

export default Banners;