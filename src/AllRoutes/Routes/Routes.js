import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main/Main";

import Signup from "../../Pages/Signup/Signup";
import Home from "../../Pages/Homes/Home/Home";
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
            path: '/signup',
            element: <Signup></Signup>
        }
       ]
    }
])