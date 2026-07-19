import "./DeleteModal.css";

function DeleteModal({
  open,
  title = "Delete Item",
  message,
  loading = false,
  onCancel,
  onConfirm,
}) {
  if (!open) return null;

  return (
    <div className="delete-overlay">
      <div className="delete-modal">

        <div className="delete-icon">
          🗑️
        </div>

        <h2>{title}</h2>

        <p>{message}</p>

        <div className="delete-actions">

          <button
            className="cancel-btn"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </button>

          <button
            className="confirm-btn"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </button>

        </div>

      </div>
    </div>
  );
}

export default DeleteModal;