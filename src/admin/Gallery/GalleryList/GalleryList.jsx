import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../../lib/supabase";
import "./GalleryList.css";
import DeleteModal from "../../../components/DeleteModal/DeleteModal";

function GalleryList() {
  const [gallery, setGallery] = useState([]);
  const [search, setSearch] = useState("");
  const [deleteGallery, setDeleteGallery] = useState(null);

  useEffect(() => {
    fetchGallery();
  }, []);

  async function fetchGallery() {
    const { data, error } = await supabase
      .from("gallery")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    setGallery(data || []);
  }

  const filteredGallery = gallery.filter((item) => {
    return (
      item.title?.toLowerCase().includes(search.toLowerCase()) ||
      item.category?.toLowerCase().includes(search.toLowerCase())
    );
  });

  async function handleDelete() {
    if (!deleteGallery) return;

    try {
      // Delete image from Storage
      if (deleteGallery.image) {
        const url = new URL(deleteGallery.image);

        const path = url.pathname.split("/object/public/products/")[1];

        if (path) {
          await supabase.storage.from("products").remove([path]);
        }
      }

      // Delete database record
      const { error } = await supabase
        .from("gallery")
        .delete()
        .eq("id", deleteGallery.id);

      if (error) throw error;

      setDeleteGallery(null);

      fetchGallery();
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div className="gallery-list">
      <div className="toolbar">
        <input
          type="text"
          placeholder="Search gallery..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search"
        />

        <Link to="/admin/gallery/add" className="add-btn">
          + Add Image
        </Link>
      </div>

      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Category</th>
            <th>Featured</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredGallery.map((item) => (
            <tr key={item.id}>
              <td>
                <img src={item.image} alt={item.title} className="thumb" />
              </td>

              <td>{item.title}</td>

              <td>{item.category}</td>

              <td>
                <span className={item.featured ? "badge featured" : "badge"}>
                  {item.featured ? "Yes" : "No"}
                </span>
              </td>

              <td>
                <span
                  className={item.is_active ? "badge active" : "badge inactive"}
                >
                  {item.is_active ? "Active" : "Inactive"}
                </span>
              </td>

              <td>
                <Link to={`/admin/gallery/edit/${item.id}`} className="edit">
                  Edit
                </Link>

                <button
                  className="delete"
                  onClick={() => setDeleteGallery(item)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <DeleteModal
        open={!!deleteGallery}
        title="Delete Gallery Image"
        message={
          deleteGallery
            ? `Are you sure you want to delete "${deleteGallery.title}"?`
            : ""
        }
        onCancel={() => setDeleteGallery(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}

export default GalleryList;
