import { SecuritySystemsContextProvider } from "./contexts/SecuritySystemsContextProvider";
import AppLayout from "./layouts/AppLayout";
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
        path:"/info/about-us",
        element:<AboutUs />
      }
    ],
  },
  {
    path:'*',
    element:<Navigate  to='/' /> 
  },
]);

export default router;
