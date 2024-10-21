import React from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import IProduct from '../../Interfaces/IProduct';
import Link from 'next/link';

const CardList: React.FC<{ products: IProduct[] }> = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map(product => (
        <Link className='border-2 rounded-lg shadow-lg hover:shadow-xl transition-shadow' href={`/products/${product.id}`} key={product.id}> 
          <ProductCard 
            id={product.id}
            name={product.name}
            description={product.description}
            price={product.price}
            stock={product.stock}
            image={product.image}
            categoryId={product.categoryId}
          />
        </Link>
      ))}
    </div>
  );
};

export default CardList;
