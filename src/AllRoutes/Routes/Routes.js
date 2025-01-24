import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main/Main";

import Signup from "../../Pages/Signup/Signup";
import Home from "../../Pages/Homes/Home/Home";
import Signin from "../../Pages/Signin/Signin";
import DashBoardLayout from "../../Layout/Main/DashBoardLayout/DashBoardLayout";
import Dashboard from "../../Pages/Dashboard/Dashboard";
import BecomeAseller from "../../Pages/BecomeAseller/BecomeAseller";
import AddProducts from "../../Pages/AddProducts/AddProducts";
import MyProducts from "../../Pages/MyProducts/MyProducts";
import CategoryProducts from "../../Pages/Homes/Categories/CategoryProducts";
import AllProductsOfSnazzMart from "../../Pages/AllProductsOfSnazzMart/AllProductsOfSnazzMart";
import ProductDetails from "../../SharedPages/ProductDetails/ProductDetails";
import AllUsers from "../../Pages/AllUsers/AllUsers";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import AdminRoute from "../AdminRoute/AdminRoute";
import SellerRoute from "../SellerRoute/SellerRoute";
export const router = createBrowserRouter([
    {
       path: '/',
       element: <Main></Main>,
       children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
            path: '/signin',
            element: <Signin></Signin>
        },
        {
            path: '/signup',
            element: <Signup></Signup>
        },
        {
            path: '/becomeAseller',
            element: <PrivateRoute><BecomeAseller></BecomeAseller></PrivateRoute>
        },
        {
            path: '/allProductsOfSnazzMart',
            element: <PrivateRoute><AllProductsOfSnazzMart></AllProductsOfSnazzMart></PrivateRoute>
        },
        {
            path: '/allProducts/:category',
            loader: ({params}) => fetch(`http://localhost:5000/allProducts/${params.category}`),
            element: <PrivateRoute><CategoryProducts></CategoryProducts></PrivateRoute>
        },
        {
            path: '/product/:id',
            loader: ({params}) => fetch(`http://localhost:5000/product/${params.id}`),
            element: <PrivateRoute><ProductDetails></ProductDetails></PrivateRoute>
        }
       ]
    },
    {
        path:'/dashboard',
        element:<DashBoardLayout></DashBoardLayout>,
        children:[
            {
                path:'/dashboard/history',
                element: <Dashboard></Dashboard>
            },
            {
                path:'/dashboard/addProducts',
                element: <SellerRoute><AddProducts></AddProducts></SellerRoute>
            },
            {
                path:'/dashboard/myProducts',
                element: <SellerRoute><MyProducts></MyProducts></SellerRoute>
            },
            {
                path:'/dashboard/allUsers',
                element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
            }
        ]
    }
])