import { Link } from "react-router-dom";
import styles from "./About.module.css";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import aboutImage from "../../assets/images/about.png";

function About() {
  return (
    <>
      <Breadcrumb
        title="About Us"
        items={[{ label: "Home", link: "/" }, { label: "About Us" }]}
      />
      <section className={styles.about}>
        <div className={styles.hero}>
          <span className={styles.subTitle}>ABOUT UNABI JEWELS</span>

          <h1>
            Where Elegance
            <br />
            Meets Everyday Style
          </h1>

          <div className={styles.divider}></div>

          <p>
            Discover jewellery designed to celebrate confidence, simplicity, and
            timeless elegance. Every piece is thoughtfully curated to become
            part of your everyday story.
          </p>

          <Link to="/collections" className={styles.heroButton}>
            Explore Collection
          </Link>
        </div>

        <div className={styles.sectionDivider}>
          <span></span>
          <div className={styles.diamond}></div>
          <span></span>
        </div>

        <section className={styles.story}>
          <div className={styles.storyContent}>
            {/* <span className={styles.sectionNumber}>01</span> */}

            <h2>
              Crafted for
              <br />
              Everyday Elegance
            </h2>

            <p>
              Unabi Jewels was born from a simple belief that jewellery should
              feel effortless, elegant, and meaningful. We curate timeless
              pieces that blend seamlessly with everyday life while adding a
              refined touch to every moment.
            </p>

            <p>
              Every design reflects simplicity, sophistication, and confidence.
              From anti-tarnish essentials to modern minimalist styles, our
              collections are created to be worn, loved, and remembered.
            </p>

            <div className={styles.signature}>
              <span>With Love</span>
              <h4>Team Unabi</h4>
            </div>
          </div>

          <div className={styles.storyImages}>
            <div className={styles.mainImage}>
              <img src={aboutImage} alt="Unabi Jewels" />
            </div>

            <div className={styles.smallImage}>
              <img src={aboutImage} alt="Jewellery Detail" />
            </div>
          </div>
        </section>

        <div className={styles.sectionDivider}>
          <span></span>
          <div className={styles.diamond}></div>
          <span></span>
        </div>

        {/* ================= Why Choose Unabi ================= */}

        <section className={styles.whyChoose}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>WHY CHOOSE UNABI</span>

            <h2>Designed for Everyday Elegance</h2>

            <p>
              At Unabi Jewels, every piece is thoughtfully selected to blend
              timeless beauty with modern simplicity. We focus on jewellery that
              feels luxurious, lasts longer, and complements your everyday
              style.
            </p>
          </div>

          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <div className={styles.iconCircle}>💎</div>

              <h3>Premium Quality</h3>

              <p>
                Carefully chosen jewellery crafted with attention to detail and
                everyday durability.
              </p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.iconCircle}>✨</div>

              <h3>Minimal Designs</h3>

              <p>
                Elegant pieces designed to complement every outfit without
                overwhelming your look.
              </p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.iconCircle}>🛡</div>

              <h3>Anti-Tarnish</h3>

              <p>
                Made for everyday wear with finishes that help preserve their
                shine and beauty.
              </p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.iconCircle}>🌸</div>

              <h3>Affordable Luxury</h3>

              <p>
                Luxury-inspired jewellery that combines elegance, quality, and
                accessible pricing.
              </p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.iconCircle}>❤</div>

              <h3>Curated With Love</h3>

              <p>
                Every collection is thoughtfully selected to celebrate
                confidence, beauty, and individuality.
              </p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.iconCircle}>⭐</div>

              <h3>Timeless Style</h3>

              <p>
                Classic jewellery designed to stay beautiful and relevant
                through every season.
              </p>
            </div>
          </div>
        </section>

        <div className={styles.sectionDivider}>
          <span></span>
          <div className={styles.diamond}></div>
          <span></span>
        </div>

        {/* ================= Jewellery Journey ================= */}

        <section className={styles.journey}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>OUR JOURNEY</span>

            <h2>From Inspiration to Your Jewellery Box</h2>

            <p>
              Every Unabi piece follows a thoughtful journey—from inspiration to
              careful selection and beautiful packaging—so you receive jewellery
              that's ready to be loved from the very first moment.
            </p>
          </div>

          <div className={styles.timeline}>
            <div className={styles.timelineItem}>
              <div className={styles.timelineCircle}>01</div>

              <div className={styles.timelineContent}>
                <h3>Inspired</h3>

                <p>
                  Every collection begins with timeless inspiration, blending
                  modern trends with elegant simplicity.
                </p>
              </div>
            </div>

            <div className={styles.timelineItem}>
              <div className={styles.timelineCircle}>02</div>

              <div className={styles.timelineContent}>
                <h3>Curated</h3>

                <p>
                  We carefully select jewellery that reflects quality, style,
                  and everyday elegance.
                </p>
              </div>
            </div>

            <div className={styles.timelineItem}>
              <div className={styles.timelineCircle}>03</div>

              <div className={styles.timelineContent}>
                <h3>Quality Checked</h3>

                <p>
                  Each piece is inspected to ensure it meets our standards
                  before it becomes part of your collection.
                </p>
              </div>
            </div>

            <div className={styles.timelineItem}>
              <div className={styles.timelineCircle}>04</div>

              <div className={styles.timelineContent}>
                <h3>Delivered With Care</h3>

                <p>
                  Beautifully packed and delivered with love, ready to become
                  part of your everyday style.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= Customer Promise ================= */}

        <section className={styles.promise}>
          <div className={styles.promiseContainer}>
            <span className={styles.promiseTag}>OUR PROMISE</span>

            <h2>
              Jewellery That Inspires
              <br />
              Confidence Every Day
            </h2>

            <p>
              At Unabi Jewels, we believe jewellery is more than an
              accessory—it's a reflection of your personality. Every piece is
              thoughtfully selected to offer lasting beauty, comfort, and
              timeless elegance, so you can wear it with confidence every single
              day.
            </p>

            <div className={styles.promiseStats}>
              <div className={styles.promiseItem}>
                <h3>Premium</h3>
                <span>Quality Selection</span>
              </div>

              <div className={styles.promiseDivider}></div>

              <div className={styles.promiseItem}>
                <h3>Anti-Tarnish</h3>
                <span>Everyday Shine</span>
              </div>

              <div className={styles.promiseDivider}></div>

              <div className={styles.promiseItem}>
                <h3>Elegant</h3>
                <span>Minimal Designs</span>
              </div>
            </div>
          </div>
        </section>

        <div className={styles.sectionDivider}>
          <span></span>
          <div className={styles.diamond}></div>
          <span></span>
        </div>

        {/* ================= Luxury Quote ================= */}

        <section className={styles.quoteSection}>
          <div className={styles.quoteWrapper}>
            <span className={styles.quoteIcon}>“</span>

            <blockquote className={styles.quote}>
              Elegance isn't about having more.
              <br />
              It's about choosing beautifully.
            </blockquote>

            <div className={styles.quoteFooter}>
              <span></span>
              <p>UNABI JEWELS</p>
              <span></span>
            </div>
          </div>
        </section>

        <div className={styles.sectionDivider}>
          <span></span>
          <div className={styles.diamond}></div>
          <span></span>
        </div>

        {/* ================= CTA ================= */}

        <section className={styles.ctaSection}>
          <div className={styles.ctaContainer}>
            <span className={styles.ctaTag}>DISCOVER UNABI JEWELS</span>

            <h2>
              Find Your
              <br />
              Everyday Sparkle
            </h2>

            <p>
              Discover timeless jewellery designed to celebrate your
              individuality. From everyday essentials to elegant statement
              pieces, find the perfect piece that reflects your unique style.
            </p>

            <div className={styles.ctaButtons}>
              <a href="/collections" className={styles.primaryBtn}>
                Explore Collection
              </a>

              <a href="/contact" className={styles.secondaryBtn}>
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </section>
    </>
  );
}

export default About;
