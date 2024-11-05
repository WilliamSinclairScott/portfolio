import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import DandD from "./pages/DandD/DandD";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "5e",
    element: <DandD />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
