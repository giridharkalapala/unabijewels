import { useEffect, useState } from "react";
import "./ProductForm.css";
import ImageUpload from "../../components/ImageUpload/ImageUpload";

function ProductForm({
  initialData = {},
  categories = [],
  onSubmit,
  loading = false,
}) {
  const [formData, setFormData] = useState({
    name: initialData.name || "",
    slug: initialData.slug || "",
    category_id: initialData.category_id || "",
    material: initialData.material || "",
    description: initialData.description || "",
    image: initialData.image || "",
    price: initialData.price || "",
    featured: initialData.featured || false,
    new_arrival: initialData.new_arrival || false,
    is_active: initialData.is_active ?? true,
  });

  useEffect(() => {
    setFormData({
      name: initialData.name || "",
      slug: initialData.slug || "",
      category_id: initialData.category_id || "",
      material: initialData.material || "",
      description: initialData.description || "",
      image: initialData.image || "",
      price: initialData.price || "",
      featured: initialData.featured || false,
      new_arrival: initialData.new_arrival || false,
      is_active: initialData.is_active ?? true,
    });
  }, [initialData]);

  useEffect(() => {
    if (initialData.slug) return;

    const slug = formData.name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

    setFormData((prev) => ({
      ...prev,
      slug,
    }));
  }, [formData.name, initialData.slug]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const submitForm = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="product-form" onSubmit={submitForm}>
      <div className="grid">

        <div className="form-group">
          <label>Product Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Slug</label>
          <input
            name="slug"
            value={formData.slug}
            readOnly
          />
        </div>

        <div className="form-group">
          <label>Category</label>

          <select
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
          >
            <option value="">Select Category</option>

            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}

          </select>
        </div>

        <div className="form-group">
          <label>Material</label>

          <select
            name="material"
            value={formData.material}
            onChange={handleChange}
          >
            <option>Gold</option>
            <option>Silver</option>
            <option>Rose Gold</option>
            <option>Diamond</option>
            <option>Platinum</option>
          </select>
        </div>

        <div className="form-group">
          <label>Price</label>

          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter price"
          />
        </div>

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

      <div className="form-group">
        <label>Product Image</label>

        <ImageUpload
          value={formData.image}
          onUpload={(url) => {
            console.log("Received URL:", url);

            setFormData((prev) => ({
              ...prev,
              image: url,
            }));
          }}
        />
      </div>

      <div className="switches">

        <label>
          <input
            type="checkbox"
            name="featured"
            checked={formData.featured}
            onChange={handleChange}
          />
          Featured
        </label>

        <label>
          <input
            type="checkbox"
            name="new_arrival"
            checked={formData.new_arrival}
            onChange={handleChange}
          />
          New Arrival
        </label>

        <label>
          <input
            type="checkbox"
            name="is_active"
            checked={formData.is_active}
            onChange={handleChange}
          />
          Active
        </label>

      </div>

      <button className="save-product-btn" disabled={loading}>
        {loading
          ? "Saving..."
          : initialData.id
            ? "Update Product"
            : "Save Product"}
      </button>
    </form>
  );
}

export default ProductForm;