import React from 'react';
import Image from 'next/image';
import IProduct from '../../Interfaces/IProduct';


const ProductCard: React.FC<IProduct> = ({ name, description, price, stock, image }) => {
  return (
    <div className="bg-white border p-4 rounded shadow-sm hover:shadow-md transition-shadow">
      <div className="relative w-full h-48 mb-4 bg-white">
        <Image 
          src={image} 
          alt={name} 
          fill 
          style={{ objectFit: 'scale-down' }} 
          className="rounded"
        />
      </div>
      <h2 className="text-xl font-semibold mb-2">{name}</h2>
      <p className="text-gray-600 mb-4">{description}</p>
      <p className="text-lg font-bold mb-2">${price.toFixed(2)}</p>
      <p className={`text-sm ${stock > 0 ? 'text-green-500' : 'text-red-500'}`}>
        {stock > 0 ? `${stock} in stock` : 'Out of stock'}
      </p>
    </div>
  );
};

export default ProductCard;
