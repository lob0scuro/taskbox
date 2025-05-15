import {
  createBrowserRouter,
  createRoutesFromElements,
  Routes,
  RouterProvider,
  Route,
} from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import Home from "./routes/Home";
import Login from "./routes/Login";
import ProtectedRoutes from "./layout/ProtectedRoutes";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<RootLayout />} path="/">
        <Route element={<ProtectedRoutes />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="login" element={<Login />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
