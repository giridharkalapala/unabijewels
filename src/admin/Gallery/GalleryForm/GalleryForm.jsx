import { useEffect, useState } from "react";
import "./GalleryForm.css";

const DEFAULT_FORM = {
  title: "",
  category: "",
  description: "",
  featured: false,
  is_active: true,
  image: null,
};

function GalleryForm({
  initialData = DEFAULT_FORM,
  onSubmit,
  loading = false,
}) {
  const [formData, setFormData] = useState(DEFAULT_FORM);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    setFormData({
      title: initialData.title || "",
      category: initialData.category || "",
      description: initialData.description || "",
      featured: initialData.featured || false,
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
    <form className="gallery-form" onSubmit={submit}>

      <div className="image-upload">

        <label>Image *</label>

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
        <label>Title</label>

        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">

        <label>Category</label>

        <input
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Wedding"
        />

      </div>

      <div className="form-group">

        <label>Description</label>

        <textarea
          rows="5"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />

      </div>

      <div className="checkbox-group">

        <input
          type="checkbox"
          name="featured"
          checked={formData.featured}
          onChange={handleChange}
        />

        <label>Featured</label>

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
        {loading ? "Saving..." : "Save Gallery"}
      </button>

    </form>
  );
}

export default GalleryForm;