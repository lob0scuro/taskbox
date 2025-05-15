import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Toaster } from "react-hot-toast";
import Errors from "../components/Errors";
import { ErrorBoundary } from "react-error-boundary";

const RootLayout = () => {
  return (
    <ErrorBoundary FallbackComponent={Errors}>
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
      <Toaster position="bottom-right" reverseOrder={false} />
      <Footer />
    </ErrorBoundary>
  );
};

export default RootLayout;
