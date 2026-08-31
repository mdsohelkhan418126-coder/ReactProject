import { useEffect, useState } from 'react';
import { Card } from './Card';

interface Category {
  strCategory: string;
  strCategoryDescription: string;
  strCategoryThumb: string;
}

export const Datafecing = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://themealdb.com/api/json/v1/1/categories.php')
      .then(res => res.json())
      .then(data => {
        setCategories(data.categories || []);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <section className=" min-h-screen bg-gray-100">
      <div className=" text-center py-6 bg-blue-500 text-white ">
        <h2 className=" text-2xl font-bold">My first Data fecing</h2>
      </div>
      <div className=" container mx-auto py-8">
        {loading && <p className=" text-center text-blue-500">Loading...</p>}
        {error && (
          <p className=" text-center text-red-500">Something is wrong</p>
        )}

        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4 ">
          {categories.map((categorie, index) => (
            <Card key={index} categorie={categorie} />
          ))}
        </div>
      </div>
    </section>
  );
};
