import styles from "./Contact.module.css";

function Contact() {
  return (
    <section className={styles.contact}>
      <div className={styles.hero}>
        <h1>Contact Us</h1>
        <p>We'd love to hear from you. Get in touch with us today.</p>
      </div>

      <div className={styles.infoGrid}>
        <div className={styles.card}>
          <h3>📍 Address</h3>
          <p>Your Store Address</p>
        </div>

        <div className={styles.card}>
          <h3>📞 Phone</h3>
          <p>+91 98765 43210</p>
        </div>

        <div className={styles.card}>
          <h3>📧 Email</h3>
          <p>info@unabijewels.com</p>
        </div>

        <div className={styles.card}>
          <h3>💬 WhatsApp</h3>
          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noopener noreferrer"
          >
            Chat with Us
          </a>
        </div>
      </div>

      <div className={styles.formSection}>
        <h2>Send Us a Message</h2>

        <form className={styles.form}>
          <input type="text" placeholder="Your Name" />
          <input type="email" placeholder="Email Address" />
          <input type="tel" placeholder="Phone Number" />
          <textarea rows="6" placeholder="Your Message"></textarea>

          <button type="submit">Send Message</button>
        </form>
      </div>

      <div className={styles.map}>
        <iframe
          title="Google Map"
          src="https://www.google.com/maps?q=Hyderabad&output=embed"
          loading="lazy"
          allowFullScreen
        ></iframe>
      </div>
    </section>
  );
}

export default Contact;