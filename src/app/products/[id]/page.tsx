// src/app/products/[id]/page.tsx
'use client'; 

import React from 'react';
import ProductDetailView from './ProductDetailView';
import { useParams } from 'next/navigation';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams();

  // Me aseguro de que id sea un string y no un array
  if (!id || (Array.isArray(id) ? id.length === 0 : id.trim() === '')) {
    return <p>Error: ID no válido</p>;
  }

  // Convierte id a número si es necesario
  const productId = Array.isArray(id) ? parseInt(id[0], 10) : parseInt(id, 10);

  if (isNaN(productId)) {
    return <p>Error: ID no válido</p>;
  }

  return <ProductDetailView id={productId} />;
};

export default ProductDetailPage;
