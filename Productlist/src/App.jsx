import { useState } from 'react';

const products = [
  {
    id: 1,
    name: 'Product A',
    price: 50,
  },
  {
    id: 2,
    name: 'Product B',
    price: 30,
  },
  {
    id: 3,
    name: 'Product C',
    price: 20,
  },
];
const App = () => {
  const [cart, setCart] = useState([]);
  // add to cart
  const addToCart = product => {
    setCart(prevcart => [...prevcart, product]);
  };
  return (
    <div className=" px-4 py-28 max-w-7xl mx-auto">
      <h1 className=" text-2xl font-bold mb-4">Product List</h1>
      <div className=" grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map(product => (
          <div
            key={product.id}
            className="p-4 border-gray-500 rounded shadow-md hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className=" text-gray-700">${product.price}</p>
            <button
              onClick={() => addToCart(product)}
              className=" bg-green-500  text-white rounded px-4 py-2 mt-2"
            >
              Add to cart
            </button>
          </div>
        ))}
      </div>

      {/* display Data */}

      <h2 className=" text-xl font-bold mt-4">Cart</h2>

      {cart.length === 0 ? (
        <p className=" text-gray-600">Your cart is empty</p>
      ) : (
        <ul className=" list-disc pl-6">
          {cart.map((item, index) => (
            <li key={index} className=" text-gray-800">
              {item.name}-${item.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
