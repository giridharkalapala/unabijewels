import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../../lib/supabase";
import DeleteModal from "../../../components/DeleteModal/DeleteModal";
import "./EnquiryList.css";

function EnquiryList() {
  const [enquiries, setEnquiries] = useState([]);
  const [search, setSearch] = useState("");
  const [deleteEnquiry, setDeleteEnquiry] = useState(null);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  async function fetchEnquiries() {
    const { data, error } = await supabase
      .from("enquiries")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    setEnquiries(data || []);
  }

  async function handleDelete() {
    if (!deleteEnquiry) return;

    const { error } = await supabase
      .from("enquiries")
      .delete()
      .eq("id", deleteEnquiry.id);

    if (error) {
      alert(error.message);
      return;
    }

    setDeleteEnquiry(null);
    fetchEnquiries();
  }

  const filtered = enquiries.filter((item) => {
    const keyword = search.toLowerCase();

    return (
      item.name?.toLowerCase().includes(keyword) ||
      item.email?.toLowerCase().includes(keyword) ||
      item.subject?.toLowerCase().includes(keyword)
    );
  });

  return (
    <div className="enquiry-list">

      <div className="page-header">
        <h2>Contact Enquiries</h2>

        <span className="count">
          Total : {filtered.length}
        </span>
      </div>

      <input
        className="search-box"
        placeholder="Search by Name / Email / Subject..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table>

        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Subject</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {filtered.map((item) => (

            <tr key={item.id}>

              <td>{item.name}</td>

              <td>{item.email}</td>

              <td>{item.subject}</td>

              <td>
                {new Date(item.created_at).toLocaleDateString()}
              </td>

              <td>

                {item.is_read ? (

                  <span className="badge read">
                    Read
                  </span>

                ) : (

                  <span className="badge new">
                    New
                  </span>

                )}

              </td>

              <td>

                <Link
                  className="view-btn"
                  to={`/admin/enquiries/view/${item.id}`}
                >
                  View
                </Link>

                <button
                  className="delete-btn"
                  onClick={() => setDeleteEnquiry(item)}
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

      <DeleteModal
        open={!!deleteEnquiry}
        title="Delete Enquiry"
        message={
          deleteEnquiry
            ? `Delete enquiry from "${deleteEnquiry.name}"?`
            : ""
        }
        onCancel={() => setDeleteEnquiry(null)}
        onConfirm={handleDelete}
      />

    </div>
  );
}

export default EnquiryList;