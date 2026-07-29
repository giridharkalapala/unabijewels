import { Link } from "react-router-dom";
import {
  FaPlus,
  FaTags,
  FaImages,
  FaCommentDots,
} from "react-icons/fa";

import "./QuickActions.css";

function QuickActions() {
  const actions = [
    {
      title: "Add Product",
      icon: <FaPlus />,
      link: "/admin/products/add",
      color: "#C98F7B",
    },
    {
      title: "Add Category",
      icon: <FaTags />,
      link: "/admin/categories/add",
      color: "#5B8DEF",
    },
    {
      title: "Upload Gallery",
      icon: <FaImages />,
      link: "/admin/gallery/add",
      color: "#38B27F",
    },
    {
      title: "Add Testimonial",
      icon: <FaCommentDots />,
      link: "/admin/testimonials/add",
      color: "#8B5CF6",
    },
  ];

  return (
    <section className="quick-actions">
      <div className="section-title">
        <h2>Quick Actions</h2>
        <p>Frequently used shortcuts</p>
      </div>

      <div className="actions-grid">
        {actions.map((action) => (
          <Link
            key={action.title}
            to={action.link}
            className="action-card"
          >
            <div
              className="action-icon"
              style={{ background: action.color }}
            >
              {action.icon}
            </div>

            <h3>{action.title}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default QuickActions;