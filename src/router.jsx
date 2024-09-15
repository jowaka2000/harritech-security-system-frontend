import { SecuritySystemsContextProvider } from "./contexts/SecuritySystemsContextProvider";
import AppLayout from "./layouts/AppLayout";
import Index from "./views/home/Index";
import ShowSystems from "./views/home/ShowSystems";

const { createBrowserRouter } = require("react-router-dom");

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
    ],
  },
]);

export default router;
