import { SecuritySystemsContextProvider } from "./contexts/SecuritySystemsContextProvider";
import AppLayout from "./layouts/AppLayout";
import AuthLayout from "./layouts/AuthLayout";
import Admin from "./views/admin/Admin";
import Login from "./views/auth/Login";
import Register from "./views/auth/Register";
import CreatePosts from "./views/home/CreatePosts";
import GateInstallationAdvert from "./views/home/GateInstallationAdvert";
import Index from "./views/home/Index";
import ShowSystems from "./views/home/ShowSystems";
import AboutUs from "./views/info/AboutUs";
import Contact from "./views/info/Contact";

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
        path: "/admin",
        element: <Admin />,
      },
      {
        path: "/security-systems/:public_id",
        element: <ShowSystems />,
      },
      {
        path: "/security-systems/create-posts",
        element: <CreatePosts />,
      },
      {
        path: "/info/about-us",
        element: <AboutUs />,
      },
      {
        path: "/info/contact-us",
        element: <Contact />,
      },
      {
        path:'/services/automatic-gate-installation',
        element:<GateInstallationAdvert />
      }
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "/auth/login",
        element: <Login />,
      },
      {
        path: "/auth/sign-up",
        element: <Register />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);

export default router;
