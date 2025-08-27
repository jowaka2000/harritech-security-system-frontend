import { SecuritySystemsContextProvider } from "./contexts/SecuritySystemsContextProvider";
import AppLayout from "./layouts/AppLayout";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./views/auth/Login";
import Register from "./views/auth/Register";
import CreatePosts from "./views/home/CreatePosts";
import Index from "./views/home/Index";
import ShowSystems from "./views/home/ShowSystems";
import AboutUs from "./views/info/AboutUs";

const { createBrowserRouter, Navigate } = require("react-router-dom");

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <SecuritySystemsContextProvider>
        <AppLayout />
      </SecuritySystemsContextProvider>
    ),
    children: [
      {
        path: "/",
        element: <Index />,
      },
      {
        path: "/security-systems/:system",
        element: <ShowSystems />,
      },
      {
        path: "/security-systems/create-posts",
        element: <CreatePosts />,
      },
      {
        path:"/info/about-us",
        element:<AboutUs />
      }
    ],
  },
  {
    path:'/',
    element:<AuthLayout />,
    children:[
      {
        path:'/auth/login',
        element:<Login />
      },
      {
        path:'/auth/sign-up',
        element:<Register />
      },
    ]
  },
  {
    path:'*',
    element:<Navigate  to='/' /> 
  },
]);

export default router;
