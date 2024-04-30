import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/home/Home";
import ServiceDetails from "../pages/serviceDetails/ServiceDetails";
import Services from "../pages/services/Services";
import Blogs from "../pages/blogs/Blogs";

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
        }
      ]
    }
]);

export default router;