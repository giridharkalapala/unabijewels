import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../../../lib/supabase";
import DeleteModal from "../../../components/DeleteModal/DeleteModal";
import "./ViewEnquiry.css";

function ViewEnquiry() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [enquiry, setEnquiry] = useState(null);
  const [deleteEnquiry, setDeleteEnquiry] = useState(null);

  useEffect(() => {
    fetchEnquiry();
  }, []);

  async function fetchEnquiry() {
    const { data, error } = await supabase
      .from("enquiries")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error(error);
      return;
    }

    // Mark as read if not already
    if (!data.is_read) {
      const { error: updateError } = await supabase
        .from("enquiries")
        .update({ is_read: true })
        .eq("id", id);

      if (!updateError) {
        data.is_read = true;
      }
    }

    setEnquiry(data);
  }

  async function handleDelete() {
    if (!deleteEnquiry) return;

    try {
      const { error } = await supabase
        .from("enquiries")
        .delete()
        .eq("id", deleteEnquiry.id);

      if (error) throw error;

      alert("Enquiry deleted successfully!");

      navigate("/admin/enquiries");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  if (!enquiry) {
    return <p>Loading...</p>;
  }

  return (
    <div className="view-enquiry">
      <div className="header">
        <h2>Customer Enquiry</h2>

        <span className={enquiry.is_read ? "badge read" : "badge new"}>
          {enquiry.is_read ? "Read" : "New"}
        </span>
      </div>

      <div className="card">
        <div className="row">
          <label>Name</label>
          <p>{enquiry.name}</p>
        </div>

        <div className="row">
          <label>Email</label>
          <p>{enquiry.email}</p>
        </div>

        <div className="row">
          <label>Phone</label>
          <p>{enquiry.phone || "-"}</p>
        </div>

        <div className="row">
          <label>Subject</label>
          <p>{enquiry.subject || "-"}</p>
        </div>

        <div className="row">
          <label>Message</label>
          <div className="message-box">
            {enquiry.message}
          </div>
        </div>

        <div className="row">
          <label>Submitted</label>
          <p>{new Date(enquiry.created_at).toLocaleString()}</p>
        </div>
      </div>

      <div className="actions">
        <a
          className="reply-btn"
          href={`mailto:${enquiry.email}?subject=Re: ${encodeURIComponent(
            enquiry.subject || "Your Enquiry"
          )}`}
        >
          Reply via Email
        </a>

        <button
          className="back-btn"
          onClick={() => navigate("/admin/enquiries")}
        >
          Back
        </button>

        <button
          className="delete-btn"
          onClick={() => setDeleteEnquiry(enquiry)}
        >
          Delete
        </button>
      </div>

      <DeleteModal
        open={!!deleteEnquiry}
        title="Delete Enquiry"
        message={
          deleteEnquiry
            ? `Are you sure you want to delete the enquiry from "${deleteEnquiry.name}"?`
            : ""
        }
        onCancel={() => setDeleteEnquiry(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}

export default ViewEnquiry;