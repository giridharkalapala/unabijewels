import { Link } from "react-router-dom";
import "./RecentEnquiries.css";

function RecentEnquiries({ enquiries }) {
  return (
    <section className="recent-enquiries">

      <div className="section-title">
        <h2>Recent Enquiries</h2>
        <p>Latest customer enquiries</p>
      </div>

      {enquiries.length === 0 ? (
        <p className="empty">No enquiries available.</p>
      ) : (
        <div className="enquiry-list">

          {enquiries.map((item) => (
            <div className="enquiry-card" key={item.id}>

              <div className="avatar">
                {item.name.charAt(0).toUpperCase()}
              </div>

              <div className="details">
                <h4>{item.name}</h4>
                <p>{item.subject || "General Enquiry"}</p>

                <small>
                  {new Date(item.created_at).toLocaleDateString()}
                </small>
              </div>

              <Link
                to={`/admin/enquiries/view/${item.id}`}
                className="view-btn"
              >
                View
              </Link>

            </div>
          ))}

        </div>
      )}

    </section>
  );
}

export default RecentEnquiries;