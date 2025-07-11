import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "../api/mockApi";

export default function Home() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts().then((data) => setProducts(data));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Danh sách sản phẩm</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {products.map((p) => (
          <div key={p.id} className="border p-2 rounded shadow">
            <img src={p.img} alt={p.name} />
            <h3>{p.name}</h3>
            <p>{p.desc}</p>
            <p>
              <strong>{p.price.toLocaleString()} VND</strong>
            </p>
            <button
              onClick={() => navigate(`/product/${p.id}`)}
              className="mt-2 px-3 py-1 bg-blue-500 text-white rounded"
            >
              Xem chi tiết
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
