export const fetchProducts = () => {
  return Promise.resolve([
    { id: 1, name: 'Khoá học React', price: 400000, desc: 'Học React từ cơ bản đến nâng cao', img: 'https://placehold.co/300x200?text=React' },
    { id: 2, name: 'Tiếng Anh giao tiếp', price: 700000, desc: 'Nói tiếng Anh tự tin với người bản xứ', img: 'https://placehold.co/300x200?text=English' },
    { id: 3, name: 'Khóa học Data Science', price: 1200000, desc: 'Phân tích dữ liệu chuyên sâu', img: 'https://placehold.co/300x200?text=Data+Science' }
  ]);
};

export const fetchSuggestions = () => {
  return Promise.resolve([
    { id: 4, name: 'Khoá học Node.js', price: 500000 },
    { id: 5, name: 'Khoá học AI', price: 1500000 }
  ]);
};
