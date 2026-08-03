import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../../lib/supabase";
import "./ProductList.css";
import DeleteModal from "../../../components/DeleteModal/DeleteModal";
import ProductTable from "../ProductTable/ProductTable";
import ProductPreviewModal from "../../components/ProductPreviewModal/ProductPreviewModal";
import ProductPagination from "../ProductPagination/ProductPagination";
import { exportProducts } from "../../../utils/exportProducts";

function ProductList() {
  const [previewProduct, setPreviewProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [deleteProduct, setDeleteProduct] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const ITEMS_PER_PAGE = 10;

  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  const [statusFilter, setStatusFilter] = useState("all");
  const [featuredFilter, setFeaturedFilter] = useState("all");
  const [newArrivalFilter, setNewArrivalFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [bulkAction, setBulkAction] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchProducts() {
    setLoading(true);

    const from = (currentPage - 1) * ITEMS_PER_PAGE;
    const to = from + ITEMS_PER_PAGE - 1;

    const { data, count, error } = await supabase
      .from("products")
      .select(
        `
        *,
        categories(name)
      `,
        { count: "exact" },
      )
      .is("deleted_at", null)
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) {
      console.error(error.message);
    } else {
      setProducts(data || []);
      setTotalProducts(count || 0);
    }

    setLoading(false);
  }

  async function fetchCategories() {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("name");

    if (error) {
      console.error(error.message);
      return;
    }

    setCategories(data || []);
  }

  async function handleDelete() {
    if (!deleteProduct) return;

    setDeleting(true);

    const { error } = await supabase
      .from("products")
      .update({
        deleted_at: new Date().toISOString(),
      })
      .eq("id", deleteProduct.id);

    setDeleting(false);

    if (error) {
      alert(error.message);
      return;
    }

    setDeleteProduct(null);

    fetchProducts();
  }

  const filteredProducts = [...products]
    .filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === "" || product.category_id === selectedCategory;

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && product.is_active) ||
        (statusFilter === "inactive" && !product.is_active);

      const matchesFeatured =
        featuredFilter === "all" ||
        (featuredFilter === "featured" && product.featured) ||
        (featuredFilter === "not-featured" && !product.featured);

      const matchesNew =
        newArrivalFilter === "all" ||
        (newArrivalFilter === "new" && product.new_arrival) ||
        (newArrivalFilter === "old" && !product.new_arrival);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus &&
        matchesFeatured &&
        matchesNew
      );
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "oldest":
          return new Date(a.created_at) - new Date(b.created_at);

        case "az":
          return a.name.localeCompare(b.name);

        case "za":
          return b.name.localeCompare(a.name);

        default:
          return new Date(b.created_at) - new Date(a.created_at);
      }
    });

  async function handleBulkAction() {
    if (selectedProducts.length === 0) {
      alert("Please select at least one product.");
      return;
    }

    try {
      switch (bulkAction) {
        case "delete":
          if (!window.confirm(`Delete ${selectedProducts.length} products?`)) {
            return;
          }

          await supabase.from("products").delete().in("id", selectedProducts);

          break;

        case "delete":
          await supabase.from("products").delete().in("id", selectedProducts);
          break;

        case "feature":
          await supabase
            .from("products")
            .update({ featured: true })
            .in("id", selectedProducts);
          break;

        case "unfeature":
          await supabase
            .from("products")
            .update({ featured: false })
            .in("id", selectedProducts);
          break;

        case "new":
          await supabase
            .from("products")
            .update({ new_arrival: true })
            .in("id", selectedProducts);
          break;

        case "old":
          await supabase
            .from("products")
            .update({ new_arrival: false })
            .in("id", selectedProducts);
          break;

        case "active":
          await supabase
            .from("products")
            .update({ is_active: true })
            .in("id", selectedProducts);
          break;

        case "inactive":
          await supabase
            .from("products")
            .update({ is_active: false })
            .in("id", selectedProducts);
          break;

        default:
          return;
      }

      setSelectedProducts([]);
      setBulkAction("");

      fetchProducts();
      setMessage("Bulk action completed successfully!");

      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (error) {
      console.error(error);
      alert("Bulk action failed.");
    }
  }

  function handleExport() {
    const selected = products.filter((product) =>
      selectedProducts.includes(product.id),
    );

    exportProducts(selected);
  }

  return (
    <div className="product-list">
      <DeleteModal
        open={!!deleteProduct}
        title="Delete Product"
        message={
          deleteProduct
            ? `Are you sure you want to delete "${deleteProduct.name}"? This action cannot be undone.`
            : ""
        }
        loading={deleting}
        onCancel={() => setDeleteProduct(null)}
        onConfirm={handleDelete}
      />

      <ProductPreviewModal
        open={!!previewProduct}
        product={previewProduct}
        onClose={() => setPreviewProduct(null)}
      />

      <div className="page-header">
        <div>
          <h2>Products</h2>
          <p>
            Manage your jewellery collection with search, filters and quick
            actions.
          </p>
        </div>
      </div>

      <div className="toolbar">
        <input
          type="text"
          placeholder="🔍 Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search"
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="category-filter"
        >
          <option value="">All Categories</option>

          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        <select
          value={featuredFilter}
          onChange={(e) => setFeaturedFilter(e.target.value)}
        >
          <option value="all">Featured</option>
          <option value="featured">Featured</option>
          <option value="not-featured">Not Featured</option>
        </select>

        <select
          value={newArrivalFilter}
          onChange={(e) => setNewArrivalFilter(e.target.value)}
        >
          <option value="all">New Arrival</option>
          <option value="new">New Arrival</option>
          <option value="old">Regular</option>
        </select>

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="az">A–Z</option>
          <option value="za">Z–A</option>
        </select>

        <button
          className="clear-btn"
          onClick={() => {
            setSearch("");
            setSelectedCategory("");
            setStatusFilter("all");
            setFeaturedFilter("all");
            setNewArrivalFilter("all");
            setSortBy("newest");
          }}
        >
          Reset Filters
        </button>

        <Link to="/admin/products/add" className="add-btn">
          + Add Product
        </Link>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : products.length === 0 ? (
        <div className="empty">
          <h3>No Products Found</h3>
          <p>Add your first product.</p>
        </div>
      ) : (
        <>
          {message && <div className="success-message">{message}</div>}
          <div className="bulk-toolbar">
            <div className="bulk-left">
              <span className="selected-count">
                {selectedProducts.length} Selected
              </span>

              <select
                value={bulkAction}
                onChange={(e) => setBulkAction(e.target.value)}
              >
                <option value="">Bulk Actions</option>

                <option value="feature">⭐ Mark Featured</option>

                <option value="unfeature">Remove Featured</option>

                <option value="new">🆕 Mark New Arrival</option>

                <option value="old">Remove New Arrival</option>

                <option value="active">Activate</option>

                <option value="inactive">Deactivate</option>

                <option value="delete">Delete</option>
              </select>

              <button
                onClick={handleBulkAction}
                disabled={selectedProducts.length === 0 || bulkAction === ""}
              >
                Apply
              </button>
            </div>

            <button
              className="export-btn"
              onClick={handleExport}
              disabled={selectedProducts.length === 0}
            >
              Export CSV
            </button>
          </div>

          <ProductTable
            products={filteredProducts}
            onDelete={setDeleteProduct}
            onPreview={setPreviewProduct}
            selectedProducts={selectedProducts}
            setSelectedProducts={setSelectedProducts}
          />

          <ProductPagination
            currentPage={currentPage}
            totalPages={Math.ceil(totalProducts / ITEMS_PER_PAGE)}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
}

export default ProductList;
