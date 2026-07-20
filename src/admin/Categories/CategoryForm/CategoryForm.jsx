import { useEffect, useState } from "react";
import "./CategoryForm.css";

const DEFAULT_FORM_DATA = {
  name: "",
  slug: "",
  description: "",
  is_active: true,
};

function CategoryForm({
  initialData = DEFAULT_FORM_DATA,
  onSubmit,
  loading = false,
}) {
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    is_active: true,
  });

  useEffect(() => {
    if (initialData === DEFAULT_FORM_DATA) return;

    setFormData({
      name: initialData.name || "",
      slug: initialData.slug || "",
      description: initialData.description || "",
      is_active: initialData.is_active ?? true,
    });
  }, [initialData]);

  function generateSlug(value) {
    return value
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    if (name === "name") {
      setFormData((prev) => ({
        ...prev,
        name: value,
        slug: generateSlug(value),
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  //   function handleSubmit(e) {
  //     e.preventDefault();
  //     onSubmit(formData);
  //   }

  function handleSubmit(e) {
    e.preventDefault();

    alert("Category Form Submitted");

    console.log(formData);

    if (onSubmit) {
      onSubmit(formData);
    }
  }

  return (
    <form className="category-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Category Name</label>

        <input
          type="text"
          name="name"
          placeholder="Enter category name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Slug</label>

        <input type="text" name="slug" value={formData.slug} readOnly />
      </div>

      <div className="form-group">
        <label>Description</label>

        <textarea
          name="description"
          rows="5"
          placeholder="Category description"
          value={formData.description}
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

      <button className="save-btn" type="submit" disabled={loading}>
        {loading ? "Saving..." : "Save Category"}
      </button>
    </form>
  );
}

export default CategoryForm;
