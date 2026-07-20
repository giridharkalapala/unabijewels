import { useEffect, useState } from "react";
import "./TestimonialForm.css";

const DEFAULT_FORM = {
  name: "",
  designation: "",
  review: "",
  rating: 5,
  is_active: true,
  image: null,
};

function TestimonialForm({
  initialData = DEFAULT_FORM,
  onSubmit,
  loading = false,
}) {
  const [formData, setFormData] = useState(DEFAULT_FORM);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    setFormData({
      name: initialData.name || "",
      designation: initialData.designation || "",
      review: initialData.review || "",
      rating: initialData.rating || 5,
      is_active:
        initialData.is_active !== undefined
          ? initialData.is_active
          : true,
      image: null,
    });

    setPreview(initialData.image || "");
  }, [initialData]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleImage(e) {
    const file = e.target.files[0];

    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      image: file,
    }));

    setPreview(URL.createObjectURL(file));
  }

  function submit(e) {
    e.preventDefault();

    if (onSubmit) {
      onSubmit(formData);
    }
  }

  return (
    <form className="testimonial-form" onSubmit={submit}>

      <div className="image-upload">

        <label>Profile Image *</label>

        <div className="preview-box">
          {preview ? (
            <img src={preview} alt="Preview" />
          ) : (
            <span>No Image Selected</span>
          )}
        </div>

        <input
          type="file"
          accept="image/*"
          onChange={handleImage}
        />

      </div>

      <div className="form-group">
        <label>Customer Name</label>

        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Designation</label>

        <input
          name="designation"
          value={formData.designation}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Rating</label>

        <select
          name="rating"
          value={formData.rating}
          onChange={handleChange}
        >
          <option value={5}>★★★★★</option>
          <option value={4}>★★★★☆</option>
          <option value={3}>★★★☆☆</option>
          <option value={2}>★★☆☆☆</option>
          <option value={1}>★☆☆☆☆</option>
        </select>
      </div>

      <div className="form-group">
        <label>Review</label>

        <textarea
          rows="5"
          name="review"
          value={formData.review}
          onChange={handleChange}
        />
      </div>

      <div className="checkbox-group">
        <input
          type="checkbox"
          name="is_active"
          checked={formData.is_active}
          onChange={handleChange}
        />

        <label>Active</label>
      </div>

      <button
        className="save-btn"
        disabled={loading}
      >
        {loading ? "Saving..." : "Save Testimonial"}
      </button>

    </form>
  );
}

export default TestimonialForm;