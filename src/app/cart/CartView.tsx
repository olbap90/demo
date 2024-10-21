"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import IProduct from '@/Interfaces/IProduct';
import Image from 'next/image';
import Swal from 'sweetalert2';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const CartView = () => {
  const router = useRouter();
  const [cart, setCart] = useState<IProduct[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const handleRemoveFromCart = (productId: number) => {
    const updatedCart = cart.filter(product => product.id !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, product) => total + product.price, 0);
  };

  const handleCheckout = async () => {
    const userSessionString = localStorage.getItem('userSession');

    if (!userSessionString) {
      Swal.fire({
        title: "Error",
        text: "You must be logged in to checkout.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    const userSession = JSON.parse(userSessionString);
    const token: string = userSession.token?.trim();
    const userId: number = userSession.id;

    if (!token) {
      setError('Token no encontrado.');
      return;
    }

    try {
      const productsToSend: number[] = cart.map(product => product.id);
      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({
          userId,         
          products: productsToSend,
        }),
      });

      if (!response.ok) {
        Swal.fire({
          title: "Error",
          text: "There was an error creating the order.",
          icon: "error",
          confirmButtonText: "OK",
        });
        return;
      }

      const result = await response.json();
      Swal.fire({
        title: "Success",
        text: "Order created successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });

      const updatedUserSession = {
        ...userSession,
        user: {
          ...userSession.user,
          orders: [
            ...(userSession.user.orders || []),
            { id: result.id, products: productsToSend, date: new Date().toISOString() }, 
          ],
        },
      };

      localStorage.setItem('userSession', JSON.stringify(updatedUserSession)); 
      localStorage.removeItem('cart');
      setCart([]);

    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        console.error('Catch error:', err.message);
      } else {
        setError('Ocurrió un error inesperado');
        console.error('Unexpected error:', err);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userSession');
    Swal.fire({
      title: "Logged out",
      text: "You have been logged out.",
      icon: "success",
      confirmButtonText: "OK",
    });    
    router.push('/'); 
  };

  const handleLogoutConfirmation = () => {
    Swal.fire({
      title: "Are you sure you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#28a745",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, I want to logout!"
    }).then((result) => {
      if (result.isConfirmed) {
        handleLogout();
      }
    });
  }

  const handleCheckoutConfirmation = () => {
    Swal.fire({
      title: "Are you sure you want to checkout?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#28a745",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, I want to checkout!"
    }).then((result) => {
      if (result.isConfirmed) {
        handleCheckout();
      }
    });
  };

  return (
    <div className="rounded-lg container mx-auto mt-8 px-4 py-8 bg-white text-black">
      <h1 className="rounded-xl bg-slate-100 border-yellow-500 border-2 text-3xl font-semibold text-center mb-6 text-black">My Cart</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {cart.length === 0 ? (
        <p className="text-center text-lg">Your cart is empty.</p>
      ) : (
        <div className="flex flex-col gap-6">
          {cart.map((product) => (
            <div key={product.id} className="flex items-center justify-between border-b border-slate-300 pb-4">
              <div className="flex items-center gap-4">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={100}
                  height={100}
                  className="rounded shadow-lg"
                />
                <div>
                  <h2 className="text-lg font-semibold">{product.name}</h2>
                  <p className="text-slate-500">${product.price}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <p className="text-lg font-semibold">${product.price}</p>
                <button
                  onClick={() => handleRemoveFromCart(product.id)}
                  className="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition-all"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

          <div className="text-right mt-4">
            <h3 className="text-2xl font-bold text-slate-800">Total: ${calculateTotalPrice()}</h3>
          </div>
        </div>
      )}
      {cart.length > 0 && (
        <div className="text-center mt-8">
          <button
            onClick={handleCheckoutConfirmation}
            className="bg-yellow-500 text-black px-6 py-3 rounded-lg shadow-lg hover:bg-yellow-600 transition-all"
          >
            Checkout
          </button>
        </div>
      )}
      <div className="text-center mt-8">
        <button
          onClick={handleLogoutConfirmation}
          className="bg-slate-800 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-black transition-all"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default CartView;
