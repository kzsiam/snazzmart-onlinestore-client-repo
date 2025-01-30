import React from 'react';

const Footer = () => {
    return (
        <div className='mt-auto'>
            <footer className="footer text-white bg-slate-700 text-neutral-content lg:px-52 p-10 py-20">
                    <nav>
                        <h1 className='text-xl mb-5 text-white'>Payment Methods</h1>
                        <img className='w-72' src='https://digitalseba.com.bd/wp-content/uploads/2017/09/payment-support-d5digital-1.webp' alt=''></img>
                    </nav>
                    <nav className='lg:mx-auto'>
                        <h6 className="footer-title">Services</h6>
                        <a className="link link-hover">Branding</a>
                        <a className="link link-hover">Design</a>
                        <a className="link link-hover">Marketing</a>
                        <a className="link link-hover">Advertisement</a>
                    </nav>
                    <nav>
                        <h6 className="footer-title">Company</h6>
                        <a className="link link-hover">About us</a>
                        <a className="link link-hover">Contact</a>
                        <a className="link link-hover">Jobs</a>
                        <a className="link link-hover">Press kit</a>
                    </nav>
                    <nav>
                        <h6 className="footer-title">Legal</h6>
                        <a className="link link-hover">Terms of use</a>
                        <a className="link link-hover">Privacy policy</a>
                        <a className="link link-hover">Cookie policy</a>
                    </nav>
            </footer>
        </div>
    );
};

export default Footer;