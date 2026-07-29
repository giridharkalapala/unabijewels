import { useEffect, useState } from "react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import { getProductsByMonth } from "../../../services/dashboardService";

function ProductsChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function loadChart() {
      try {
        const result = await getProductsByMonth();
        setData(result);
      } catch (error) {
        console.error(error);
      }
    }

    loadChart();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="month" />

        <YAxis />

        <Tooltip />

        <Bar
          dataKey="products"
          radius={[8, 8, 0, 0]}
          fill="#C98F7B"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default ProductsChart;