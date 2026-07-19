import { useRef, useState } from "react";
import { supabase } from "../../../lib/supabase";
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

    const fileName = `${Date.now()}-${file.name}`;

    const { data: uploadData, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file);

    console.log("Upload Data:", uploadData);
    console.log("Upload Error:", error);

    if (error) {
      alert(error.message);
      setUploading(false);
      return;
    }

    const {
      data: { publicUrl },
    } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);

    console.log("Public URL:", publicUrl);

    onUpload(publicUrl);

    setUploading(false);
  }

  return (
    <div className="image-upload">

      <div
        className="upload-box"
        onClick={() => fileInputRef.current.click()}
      >
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

      {uploading && (
        <p className="uploading">
          Uploading...
        </p>
      )}

    </div>
  );
}

export default ImageUpload;