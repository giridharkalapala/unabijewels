import { useState } from "react";
import styles from "./Contact.module.css";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { submitEnquiry } from "../../services/enquiryService";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    setSuccess(false);
    setError("");

    try {
      await submitEnquiry(formData);

      setSuccess(true);

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      console.error(err);
      setError("Unable to send your enquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Breadcrumb
        title="Contact Us"
        subtitle="We'd love to hear from you."
        items={[{ label: "Home", link: "/" }, { label: "Contact" }]}
      />

      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.subtitle}>GET IN TOUCH</span>

          <h1>Let's Connect</h1>

          <p>
            We'd love to hear from you. Whether you have a question about our
            jewellery, collaborations, or general enquiries, our team is always
            happy to assist you.
          </p>

          <div className={styles.heroDivider}></div>
        </div>
      </section>

      <section className={styles.contact}>
        <section className={styles.contactInfo}>
          <div className={styles.sectionHeading}>
            <span>GET IN TOUCH</span>
            <h2>We're Always Here to Help</h2>
            <p>
              Have a question about our jewellery or need assistance? Reach out
              to us through any of the channels below.
            </p>
          </div>

          <div className={styles.infoGrid}>
            <div className={styles.card}>
              <div className={styles.icon}>📱</div>
              <h3>WhatsApp</h3>
              <p>Chat with our team for product enquiries.</p>

              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
              >
                Chat Now →
              </a>
            </div>

            <div className={styles.card}>
              <div className={styles.icon}>📧</div>
              <h3>Email</h3>
              <p>unabijewels@gmail.com</p>

              <a href="mailto:unabijewels@gmail.com">Send Email →</a>
            </div>

            <div className={styles.card}>
              <div className={styles.icon}>📍</div>
              <h3>Online Store</h3>
              <p>Serving customers across India.</p>
            </div>

            <div className={styles.card}>
              <div className={styles.icon}>🕒</div>
              <h3>Business Hours</h3>
              <p>Monday – Saturday</p>
              <span>10:00 AM – 7:00 PM</span>
            </div>
          </div>
        </section>

        <section className={styles.formSection}>
          <div className={styles.formHeader}>
            <span>SEND A MESSAGE</span>

            <h2>Let's Start a Conversation</h2>

            <p>
              Whether you're looking for product details, collaborations, or
              general enquiries, we'd be delighted to hear from you.
            </p>
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.row}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.row}>
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
              />
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
              />
            </div>

            <textarea
              rows="7"
              name="message"
              placeholder="Tell us how we can help you..."
              value={formData.message}
              onChange={handleChange}
              required
            />

            <button
              type="submit"
              className={styles.submitButton}
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>

            {success && (
              <p className={styles.success}>
                ✅ Thank you! Your enquiry has been sent successfully.
              </p>
            )}

            {error && <p className={styles.error}>{error}</p>}
          </form>
        </section>

        <div className={styles.map}>
          <iframe
            title="Google Map"
            src="https://www.google.com/maps?q=Hyderabad&output=embed"
            loading="lazy"
            allowFullScreen
          ></iframe>
        </div>
      </section>
    </>
  );
}

export default Contact;
