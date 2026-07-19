import { Outlet } from "react-router-dom";

import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import FloatingActions from "../FloatingActions/FloatingActions";

function Layout() {
  return (
    <>
      <Navbar />

      <main>
        <Outlet />
      </main>

      <Footer />

      <FloatingActions />
    </>
  );
}

export default Layout;