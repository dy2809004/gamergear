/*import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const SalesReport = () => {
  const salesData = [
    { name: "Product A", sold: 400 },
    { name: "Product B", sold: 300 },
    { name: "Product C", sold: 200 },
  ];

  return (
    <div>
      <h2>Sales Report</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={salesData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="sold" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesReport;