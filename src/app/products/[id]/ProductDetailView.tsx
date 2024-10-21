
import React, { useEffect, useState } from 'react';
import IProduct from '@/Interfaces/IProduct';
import IProductDetailProps from '@/Interfaces/IProductDetailProps';
import Image from 'next/image';
import Swal from 'sweetalert2';
import Link from 'next/link';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;



const ProductDetailView: React.FC<IProductDetailProps> = ({ id }) => {
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/products`);
        if (!response.ok) {
          throw new Error('Error al obtener los productos');
        }
        const data: IProduct[] = await response.json();
        const foundProduct = data.find((product) => product.id === id);
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          setError('Producto no encontrado');
        }
      } catch (err) {
        setError('Ocurrió un error inesperado');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();

    const token = localStorage.getItem('userSession');
    setIsLoggedIn(!!token);
  }, [id]);

  const addToCart = (product: IProduct) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const updatedCart = [...cart, product];
    localStorage.setItem('cart', JSON.stringify(updatedCart));

    Swal.fire({
      title: "Success",
      text: "Product added to cart.",
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  if (loading) {
    return <p className="text-center text-lg">Loading product...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center text-lg">{error}</p>;
  }

  if (!product) {
    return <p className="text-center text-lg">Product not found.</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-center justify-center gap-8">
        <div className="w-full md:w-1/3">
          <Image
            src={product.image}
            alt={product.name}
            layout="responsive"
            width={300}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{product.name}</h1>
          <p className="text-gray-700 text-lg mb-4">{product.description}</p>
          <p className="text-2xl font-semibold text-green-700 mb-4">Price: ${product.price}</p>
          {isLoggedIn && (
            <button
              className=" bg-yellow-500 border-2 border-black text-white px-6 py-3 rounded-lg shadow-lg hover:underline hover:bg-yellow-600 transition-all"
              onClick={() => addToCart(product)}
            >
              <svg className="inline w-5 h-8 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 21">
                <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
              </svg>

              Add to cart
            </button>
          )}
        </div>
      </div>
      <div className="mt-8 text-center">
        <Link href="/">
        <button className=" bg-black text-yellow-500 rounded-full border-2 border-yellow-500 py-2 px-4 hover:underline hover:bg-gray-800 text-base font-medium">
          Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProductDetailView;
