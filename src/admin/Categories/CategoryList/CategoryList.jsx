import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../../lib/supabase";
import "./CategoryList.css";
import DeleteModal from "../../../components/DeleteModal/DeleteModal";

function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [deleteCategory, setDeleteCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    const filtered = categories.filter((category) =>
      category.name.toLowerCase().includes(search.toLowerCase()),
    );

    setFilteredCategories(filtered);
  }, [search, categories]);

  async function fetchCategories() {
    setLoading(true);

    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
    } else {
      const categoriesWithImages = data.map((category) => {
        let imageUrl = "";

        if (category.image) {
          const { data: publicUrlData } = supabase.storage
            .from("categories")
            .getPublicUrl(category.image);

          imageUrl = publicUrlData.publicUrl;
        }

        return {
          ...category,
          imageUrl,
        };
      });

      setCategories(categoriesWithImages);
      setFilteredCategories(categoriesWithImages);
    }

    setLoading(false);
  }

  async function handleDelete() {
    if (!deleteCategory) return;

    const { error } = await supabase
      .from("categories")
      .delete()
      .eq("id", deleteCategory.id);

    if (error) {
      alert(error.message);
      return;
    }

    setDeleteCategory(null);

    fetchCategories();
  }

  return (
    <div className="category-list">
      <div className="toolbar">
        <div>
          <h1>Categories</h1>
          <p>Manage your jewellery categories</p>
        </div>

        <div className="toolbar-right">
          <input
            className="search"
            placeholder="Search categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <Link to="/admin/categories/add" className="add-btn">
            + Add Category
          </Link>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Slug</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan="5">Loading...</td>
            </tr>
          ) : filteredCategories.length === 0 ? (
            <tr>
              <td colSpan="5">No Categories Found</td>
            </tr>
          ) : (
            filteredCategories.map((category) => (
              <tr key={category.id}>
                <td>
                  {category.image ? (
                    <img
                      src={category.imageUrl}
                      alt={category.name}
                      className="thumb"
                      onError={(e) => {
                        e.target.src = "/placeholder-category.png";
                      }}
                    />
                  ) : (
                    "—"
                  )}
                </td>

                <td>{category.name}</td>

                <td>{category.slug}</td>

                <td>
                  <span
                    className={
                      category.is_active ? "badge active" : "badge inactive"
                    }
                  >
                    {category.is_active ? "Active" : "Inactive"}
                  </span>
                </td>

                <td>
                  <Link
                    className="edit"
                    to={`/admin/categories/edit/${category.id}`}
                  >
                    Edit
                  </Link>

                  <button
                    className="delete"
                    onClick={() => setDeleteCategory(category)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <DeleteModal
        open={!!deleteCategory}
        title="Delete Category"
        message={
          deleteCategory
            ? `Are you sure you want to delete "${deleteCategory.name}"?`
            : ""
        }
        onCancel={() => setDeleteCategory(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}

export default CategoryList;
