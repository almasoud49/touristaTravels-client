import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/home/Home";
import ServiceDetails from "../pages/serviceDetails/ServiceDetails";
import Services from "../pages/services/Services";
import Blogs from "../pages/blogs/Blogs";
import Login from "../pages/login/Login";
import Registration from "../pages/registration/Registration";

const router = createBrowserRouter([
    {
        path: "/",
      element: <Main></Main>,
      children:[
        {
          path:"/",
          element:<Home/>
        },
        {
          path:"/service/:id",
          element:<ServiceDetails/>
        },
        {
          path:"/services",
          element:<Services/>
        },
        {
          path:"/blogs",
          element:<Blogs/>
        },
        {
          path:"/login",
          element:<Login/>
        },
        {
          path:"/registration",
          element:<Registration/>
        },

      ]
    }
]);

export default router;