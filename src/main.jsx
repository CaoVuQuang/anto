import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { fetchProducts, fetchSuggestions } from './api/mockApi';
import './index.css';

function App() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [search, setSearch] = useState('');
  const [filterPrice, setFilterPrice] = useState('all');
  const [modalProduct, setModalProduct] = useState(null);

  useEffect(() => {
    fetchProducts().then(data => {
      setProducts(data);
      setFiltered(data);
    });
  }, []);

  useEffect(() => {
    let result = [...products];
    if (search) result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    if (filterPrice === '<500') result = result.filter(p => p.price < 500000);
    else if (filterPrice === '500-1m') result = result.filter(p => p.price >= 500000 && p.price <= 1000000);
    else if (filterPrice === '>1m') result = result.filter(p => p.price > 1000000);
    setFiltered(result);
  }, [search, filterPrice, products]);

  const toggleFavorite = (product) => {
    if (favorites.find(f => f.id === product.id)) {
      setFavorites(favorites.filter(f => f.id !== product.id));
    } else {
      setFavorites([...favorites, product]);
    }
  };

  const getSuggestions = () => {
    fetchSuggestions().then(data => setSuggestions(data)).catch(() => {
      alert('Không thể lấy gợi ý lúc này');
    });
  };

  return (
    <div>
      <header className="bg-blue-600 text-white p-4 text-center text-xl font-bold">
        EduCommerce AI — Sàn giáo dục thương mại điện tử
      </header>

      <main className="p-4 space-y-6">

        {/* Tìm kiếm & lọc */}
        <section>
          <h2 className="text-lg font-semibold mb-2">Tìm kiếm & lọc</h2>
          <input
            type="text"
            placeholder="Tìm theo tên…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border p-1 mr-2"
          />
          <select value={filterPrice} onChange={e => setFilterPrice(e.target.value)} className="border p-1">
            <option value="all">Tất cả</option>
            <option value="<500">Dưới 500K</option>
            <option value="500-1m">500K–1 triệu</option>
            <option value=">1m">Trên 1 triệu</option>
          </select>
        </section>

        {/* Danh sách sản phẩm */}
        <section>
          <h2 className="text-lg font-semibold mb-2">Danh sách sản phẩm</h2>
          <div className="flex flex-wrap gap-4">
            {filtered.map(p => (
              <div key={p.id} className="border rounded bg-white p-4 max-w-xs">
                <img src={p.img} alt={p.name} onError={(e)=>e.target.src='https://placehold.co/300x200?text=No+Image'} />
                <h3 className="font-bold">{p.name}</h3>
                <p>{p.desc}</p>
                <p><strong>{p.price.toLocaleString()} VND</strong></p>
                <button onClick={() => setModalProduct(p)} className="bg-green-600 text-white px-3 py-1 rounded mt-2 mr-2">Xem chi tiết</button>
                <button onClick={() => toggleFavorite(p)} className="bg-yellow-500 text-white px-3 py-1 rounded mt-2">
                  {favorites.find(f => f.id === p.id) ? 'Bỏ yêu thích' : 'Yêu thích'}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Yêu thích */}
        <section>
          <h2 className="text-lg font-semibold mb-2">Yêu thích</h2>
          <div className="flex flex-wrap gap-4">
            {favorites.map(f => (
              <div key={f.id} className="border rounded p-2 bg-yellow-100 max-w-xs">
                {f.name} — {f.price.toLocaleString()} VND
              </div>
            ))}
          </div>
        </section>

        {/* Gợi ý AI */}
        <section>
          <h2 className="text-lg font-semibold mb-2">Gợi ý thông minh (AI)</h2>
          <button onClick={getSuggestions} className="bg-blue-600 text-white px-3 py-1 rounded">Gợi ý sản phẩm</button>
          <div className="flex flex-wrap gap-4 mt-2">
            {suggestions.map(s => (
              <div key={s.id} className="border rounded p-2 bg-green-100 max-w-xs">
                {s.name} — {s.price.toLocaleString()} VND
              </div>
            ))}
          </div>
        </section>

        {/* Modal */}
        {modalProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded max-w-md">
              <h3 className="text-lg font-bold">{modalProduct.name}</h3>
              <img src={modalProduct.img} alt={modalProduct.name} className="my-2" />
              <p>{modalProduct.desc}</p>
              <p><strong>{modalProduct.price.toLocaleString()} VND</strong></p>
              <button onClick={() => setModalProduct(null)} className="mt-2 px-3 py-1 bg-red-500 text-white rounded">Đóng</button>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}



ReactDOM.createRoot(document.getElementById('root')).render(<App />);
