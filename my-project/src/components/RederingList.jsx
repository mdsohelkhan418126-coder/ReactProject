const products = [
  { title: 'Cabbage', isFruit: false, id: 1 },
  { title: 'Garlic', isFruit: false, id: 2 },
  { title: 'Apple', isFruit: true, id: 3 },
];

export function RederingList() {
  return (
    <div>
      {products.map(product => (
        <ul key={product.id}>
          <li
            className={`${product.isFruit ? 'text-emerald-500' : 'text-amber-400'}`}
          >
            {product.id} {product.title}
          </li>
        </ul>
      ))}
    </div>
  );
}
