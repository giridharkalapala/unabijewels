import { useRef, useState } from "react";
import { uploadImage } from "../../../services/uploadService";
import "./ImageUpload.css";

function ImageUpload({ value, onUpload, bucket = "products" }) {
  const [preview, setPreview] = useState(value || "");
  const [uploading, setUploading] = useState(false);

  const fileInputRef = useRef();

  async function handleFileChange(e) {
    const file = e.target.files[0];

    if (!file) return;

    // Validate image
    if (!file.type.startsWith("image/")) {
      alert("Please select an image.");
      return;
    }

    // Max 5MB
    if (file.size > 5 * 1024 * 1024) {
      alert("Image should be less than 5MB.");
      return;
    }

    setPreview(URL.createObjectURL(file));

    setUploading(true);

    try {
      const publicUrl = await uploadImage(file, bucket);

      onUpload(publicUrl);
    } catch (error) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="image-upload">
      <div className="upload-box" onClick={() => fileInputRef.current.click()}>
        {preview ? (
          <img src={preview} alt="Preview" />
        ) : (
          <>
            <h3>Click to Upload</h3>
            <p>PNG, JPG, JPEG, WEBP</p>
          </>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleFileChange}
      />

      {uploading && <p className="uploading">Uploading...</p>}
    </div>
  );
}

export default ImageUpload;
