import React from "react";

export default function ProductModal({ product, onClose }) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded max-w-md w-full">
        <h3 className="text-lg font-bold">{product.name}</h3>
        <img
          src={product.img}
          alt={product.name}
          className="my-2 w-full rounded"
        />
        <p>{product.desc}</p>
        <p>
          <strong>{product.price.toLocaleString()} VND</strong>
        </p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
        >
          Đóng
        </button>
      </div>
    </div>
  );
}
