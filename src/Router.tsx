import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";

import NavBar from "./components/NavBar";

import { Flex } from "@radix-ui/themes";

const NavbarWrapper = () => (
  <Flex direction="column" justify="center" gap="4">
    <NavBar />
    <Outlet />
  </Flex>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <NavbarWrapper />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
    ],
  },
]);

const Router: React.FC = () => {
  return <RouterProvider router={router} />;
};
export default Router;
