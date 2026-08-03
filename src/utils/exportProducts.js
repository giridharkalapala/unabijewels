import { saveAs } from "file-saver";

export function exportProducts(products) {
  const headers = [
    "Name",
    "Category",
    "Material",
    "Price",
    "Featured",
    "New Arrival",
    "Status",
    "Created",
  ];

  const rows = products.map((product) => [
    product.name,
    product.categories?.name || "",
    product.material,
    product.price,
    product.featured ? "Yes" : "No",
    product.new_arrival ? "Yes" : "No",
    product.is_active ? "Active" : "Inactive",
    new Date(product.created_at).toLocaleDateString("en-IN"),
  ]);

  const csv = [
    headers.join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\n");

  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;",
  });

  saveAs(blob, "products.csv");
}