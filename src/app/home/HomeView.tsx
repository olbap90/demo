"use client";
import React, { useEffect, useState } from 'react';
import CardList from '../../components/CardList/CardList';
import Swal from 'sweetalert2';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const HomeView = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState<string | null>(null); 

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/products`);
      if (!response.ok) {
        Swal.fire({
          title: "Error",
          text: "Failed to fetch products.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
      const data = await response.json();
      setProducts(data); 
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message); 
      } else {
        setError('Ocurrió un error inesperado'); 
      }
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return <p className="text-center">Loading products...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-center font-semibold bg-white border-yellow-500 text-black border-2 rounded-full w-fit text-3xl mt-6 mb-8 p-1.5 mx-auto">
        Our Products
      </h1>
      <CardList products={products} />
    </div>
  );
};

export default HomeView;
