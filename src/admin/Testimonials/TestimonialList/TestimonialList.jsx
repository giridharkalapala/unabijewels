import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../../lib/supabase";
import "./TestimonialList.css";
import DeleteModal from "../../../components/DeleteModal/DeleteModal";

function TestimonialList() {
  const [testimonials, setTestimonials] = useState([]);
  const [search, setSearch] = useState("");
  const [deleteTestimonial, setDeleteTestimonial] = useState(null);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  async function fetchTestimonials() {
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    setTestimonials(data || []);
  }

  const filteredTestimonials = testimonials.filter(
    (item) =>
      item.name?.toLowerCase().includes(search.toLowerCase()) ||
      item.designation?.toLowerCase().includes(search.toLowerCase()),
  );

  async function handleDelete() {
    if (!deleteTestimonial) return;

    try {
      // Delete image from Storage
      if (deleteTestimonial.image) {
        const url = new URL(deleteTestimonial.image);

        const path = url.pathname.split("/object/public/products/")[1];

        if (path) {
          const { error: storageError } = await supabase.storage
            .from("products")
            .remove([path]);

          if (storageError) {
            console.error(storageError);
          }
        }
      }

      // Delete database record
      const { error } = await supabase
        .from("testimonials")
        .delete()
        .eq("id", deleteTestimonial.id);

      if (error) throw error;

      setDeleteTestimonial(null);

      fetchTestimonials();
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div className="testimonial-list">
      <div className="toolbar">
        <input
          className="search"
          type="text"
          placeholder="Search testimonials..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Link className="add-btn" to="/admin/testimonials/add">
          + Add Testimonial
        </Link>
      </div>

      <table>
        <thead>
          <tr>
            <th>Photo</th>
            <th>Name</th>
            <th>Designation</th>
            <th>Rating</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredTestimonials.map((item) => (
            <tr key={item.id}>
              <td>
                <img src={item.image} alt={item.name} className="avatar" />
              </td>

              <td>{item.name}</td>

              <td>{item.designation}</td>

              <td>{"⭐".repeat(item.rating)}</td>

              <td>
                <span
                  className={item.is_active ? "badge active" : "badge inactive"}
                >
                  {item.is_active ? "Active" : "Inactive"}
                </span>
              </td>

              <td>
                <Link
                  className="edit"
                  to={`/admin/testimonials/edit/${item.id}`}
                >
                  Edit
                </Link>

                <button
                  className="delete"
                  onClick={() => setDeleteTestimonial(item)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <DeleteModal
        open={!!deleteTestimonial}
        title="Delete Testimonial"
        message={
          deleteTestimonial
            ? `Are you sure you want to delete "${deleteTestimonial.name}"?`
            : ""
        }
        onCancel={() => setDeleteTestimonial(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}

export default TestimonialList;
