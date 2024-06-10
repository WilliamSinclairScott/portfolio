import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/about",
    element: <About/>,
  },
  {
    path: "/contact",
    element: <Contact/>,
  }
]);


const Router: React.FC = () => {
  return (
    <RouterProvider router={router}/>
  )
}
export default Router;