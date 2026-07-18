import { useParams } from "react-router-dom";

function ProductDetails() {
  const { slug } = useParams();

  return (
    <section>
      <h1>Product Details</h1>

      <p>
        Product Slug: <strong>{slug}</strong>
      </p>

      <p>This page will display complete product information.</p>
    </section>
  );
}

export default ProductDetails;