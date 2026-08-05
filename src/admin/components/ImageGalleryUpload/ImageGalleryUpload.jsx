import { useRef, useState } from "react";
import { uploadImage } from "../../../services/uploadService";
import "./ImageGalleryUpload.css";

function ImageGalleryUpload({ value = [], onUpload, bucket = "products" }) {
  const [images, setImages] = useState(value);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);

  const inputRef = useRef();

  async function handleFiles(e) {
    const files = Array.from(e.target.files);

    if (!files.length) return;

    setUploading(true);

    try {
      const uploaded = [];

      for (const file of files) {
        const url = await uploadImage(file, bucket);
        uploaded.push(url);
      }

      const updatedImages = [...images, ...uploaded];

      setImages(updatedImages);

      onUpload(updatedImages);
    } catch (err) {
      alert(err.message);
    } finally {
      setUploading(false);
    }
  }

  function removeImage(index) {
    const updated = images.filter((_, i) => i !== index);

    setImages(updated);

    onUpload(updated);
  }

  return (
    <div className="gallery-upload">
      <div
        className="gallery-dropzone"
        onClick={() => inputRef.current.click()}
      >
        <h3>📸 Upload Gallery Images</h3>

        <p>Click to upload multiple images</p>
      </div>

      <input
        ref={inputRef}
        hidden
        multiple
        type="file"
        accept="image/*"
        onChange={handleFiles}
      />

      {uploading && <p className="gallery-uploading">Uploading...</p>}

      <div className="gallery-grid">
        {images.map((image, index) => (
          <div className="gallery-card" key={index}>
            <img src={image} alt={`Gallery ${index + 1}`} />

            <div className="gallery-actions">
              <button
                type="button"
                className="cover-btn"
                title="Set as Cover"
                onClick={() => onSetCover(image)}
              >
                ⭐
              </button>

              <button
                type="button"
                className="preview-btn"
                title="Preview"
                onClick={() => setPreview(image)}
              >
                👁
              </button>

              <button
                type="button"
                className="delete-btn"
                onClick={() => removeImage(index)}
              >
                🗑
              </button>
            </div>
          </div>
        ))}
      </div>
      {preview && (
        <div className="preview-overlay" onClick={() => setPreview(null)}>
          <img src={preview} alt="" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </div>
  );
}

export default ImageGalleryUpload;
