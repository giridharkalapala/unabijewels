import { useRef, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { uploadImage } from "../../../services/uploadService";
import "./AvatarUpload.css";

function AvatarUpload({
  value,
  name = "Admin",
  bucket = "avatars",
  onUpload,
}) {
  const inputRef = useRef();

  const [preview, setPreview] = useState(value || "");
  const [uploading, setUploading] = useState(false);

  async function handleFile(e) {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be under 5MB.");
      return;
    }

    const localPreview = URL.createObjectURL(file);

    setPreview(localPreview);
    setUploading(true);

    try {
      const url = await uploadImage(file, bucket);

      setPreview(url);

      onUpload(url);
    } catch (err) {
      alert(err.message);
    }

    setUploading(false);
  }

  return (
    <div
      className="avatar-upload"
      onClick={() => inputRef.current.click()}
    >
      <img
        src={
          preview ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}`
        }
        alt="Avatar"
      />

      <div className="avatar-overlay">
        <FaCamera />
      </div>

      {uploading && (
        <div className="avatar-loading">
          Uploading...
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleFile}
      />
    </div>
  );
}

export default AvatarUpload;