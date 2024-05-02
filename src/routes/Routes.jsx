import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/home/Home";
import ServiceDetails from "../pages/serviceDetails/ServiceDetails";
import Services from "../pages/services/Services";
import Blogs from "../pages/blogs/Blogs";
import Login from "../pages/login/Login";
import Registration from "../pages/registration/Registration";
import MyReview from "../pages/myReview/MyReview";
import AddService from "../pages/addService/AddService";

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
        {
          path:"/my-review",
          element:<MyReview/>
        },
        {
          path:"/add-service",
          element:<AddService/>
        }

      ]
    }
]);

export default router;