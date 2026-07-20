import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout/Layout";

import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import NotFound from "./pages/NotFound/NotFound";
import Collections from "./pages/Collections/Collections";
import Gallery from "./pages/Gallery/Gallery";

// Admin
import Login from "./admin/Login/Login";
import Dashboard from "./admin/Dashboard/Dashboard";
import ManageProducts from "./admin/ManageProducts/ManageProducts";
// import AddProduct from "./admin/AddProduct/AddProduct";
// import EditProduct from "./admin/EditProduct/EditProduct";
import AdminLayout from "./admin/AdminLayout/AdminLayout";
import AddProduct from "./admin/Products/AddProduct/AddProduct";
import ProductList from "./admin/Products/ProductList/ProductList";
import EditProduct from "./admin/Products/EditProduct/EditProduct";
import CategoryList from "./admin/Categories/CategoryList/CategoryList";
import AddCategory from "./admin/Categories/AddCategory/AddCategory";
import EditCategory from "./admin/Categories/EditCategory/EditCategory";
import GalleryList from "./admin/Gallery/GalleryList/GalleryList";
import AddGallery from "./admin/Gallery/AddGallery/AddGallery";
import EditGallery from "./admin/Gallery/EditGallery/EditGallery";
import TestimonialList from "./admin/Testimonials/TestimonialList/TestimonialList";
import AddTestimonial from "./admin/Testimonials/AddTestimonial/AddTestimonial";
import EditTestimonial from "./admin/Testimonials/EditTestimonial/EditTestimonial";
import EnquiryList from "./admin/Enquiries/EnquiryList/EnquiryList";
import ViewEnquiry from "./admin/Enquiries/ViewEnquiry/ViewEnquiry";
import WebsiteSettings from "./admin/WebsiteSettings/WebsiteSettings";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Website */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/collections" element={<Products />} />
          <Route path="/products/:slug" element={<ProductDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          {/* <Route path="/collections" element={<Collections />} /> */}
          <Route path="/gallery" element={<Gallery />} />
          {/* <Route path="/about" element={<About />} /> */}
        </Route>

        {/* Admin Login */}
        <Route path="/admin/login" element={<Login />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />

          <Route path="products" element={<ProductList />} />
          <Route path="products/add" element={<AddProduct />} />
          <Route path="products/edit/:id" element={<EditProduct />} />

          <Route path="categories" element={<CategoryList />} />
          <Route path="categories/add" element={<AddCategory />} />
          <Route path="categories/edit/:id" element={<EditCategory />} />

          <Route path="gallery" element={<GalleryList />} />
          <Route path="gallery/add" element={<AddGallery />} />
          <Route path="gallery/edit/:id" element={<EditGallery />} />

          <Route path="testimonials" element={<TestimonialList />} />
          <Route path="testimonials/add" element={<AddTestimonial />} />
          <Route path="testimonials/edit/:id" element={<EditTestimonial />} />

          <Route path="enquiries" element={<EnquiryList />} />
          <Route path="enquiries/view/:id" element={<ViewEnquiry />} />
          
          <Route path="settings"element={<WebsiteSettings />}/>

        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
