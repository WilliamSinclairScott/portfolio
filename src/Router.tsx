import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact"
import { Flex } from "@radix-ui/themes";

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
    <Flex direction='column' align='stretch' justify='center'>
      <RouterProvider router={router}/>
    </Flex>
  )
}
export default Router;