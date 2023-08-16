/* eslint-disable react/function-component-definition */
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Homepage, Login, LoginSteps, Account } from "./pages";

const routes = [
  {
    path: "/",
    element: <Homepage />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/loginsteps",
    element: <LoginSteps />
  },
  {
    path: "/account",
    element: <Account />
  }
];

const router = createBrowserRouter(routes);
const RouterApp = () => <RouterProvider router={router} />;
export default RouterApp;
