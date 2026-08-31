

interface CardProps {
  categorie: {
    strCategoryThumb: string;
    strCategory: string;
    strCategoryDescription:string
  };
}

export const Card = ({ categorie }: CardProps) => {
  return (
    <div className=" bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={categorie?.strCategoryThumb}
        alt=""
        className=" w-full h-48 md:h-56 object-cover hover:scale-105 transition-all duration-200 cursor-pointer"
      />

      <div className=" p-5">
        <h2 className=" text-lg font-semibold">{categorie.strCategory}</h2>
        <h3 className=" text-sm text-gray-600">{categorie.strCategoryDescription.slice(0, 100)}...</h3>
        <a href="#" className=" text-blue-500 mt-2 hover:underline">Learn More</a>
      </div>
    </div>
  );
}
