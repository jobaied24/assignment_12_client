import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home/Home";
import RootLayout from "../Layout/RootLayout";
import { Component } from "react";
import AuthLayout from "../Layout/AuthLayout";
import { path } from "framer-motion/client";
import Login from "../Pages/Authentication/Login/Login";
import Register from "../Pages/Authentication/Register/Register";
import AddCamp from "../Pages/AdminRouts/AddCamp/AddCamp";
import AllCamps from "../Pages/Home/AllCamps/AllCamps";
import CampDetails from "../Pages/Home/CampDetails/CampDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element:<RootLayout></RootLayout>,
    children:[
    {
        index:true,
        Component:Home
    },
    {
      path:'addCamp',
      element:<AddCamp></AddCamp>
    },
    {
      path:'allCamps',
      element:<AllCamps></AllCamps>
    },
    {
      path:'camp-details/:campId',
      element:<CampDetails></CampDetails>
    }
]
  },
  {
    path:'/',
    Component:AuthLayout,
    children:[
      {
      path:'login',
      Component:Login
      },
      {
        path:'register',
        Component:Register
      }
    ]
  }
]);