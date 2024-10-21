'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import IOrder from '../../../Interfaces/IOrder';
import Swal from 'sweetalert2';

const Dashboard: React.FC = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [userAddress, setUserAddress] = useState<string | null>(null);
  const [userPhone, setUserPhone] = useState<string | null>(null);
  const [userOrders, setUserOrders] = useState<IOrder[]>([]);

  useEffect(() => {
    const userSession = localStorage.getItem('userSession');
    
    if (userSession) {
      const parsedSession = JSON.parse(userSession);

      if (parsedSession && parsedSession.user) {
        setUserName(parsedSession.user.name);
        setUserAddress(parsedSession.user.address);
        setUserPhone(parsedSession.user.phone);
        
        if (parsedSession.user.orders) {
          setUserOrders(parsedSession.user.orders);
        }
      }
      setIsLoggedIn(true);
    } else {
      router.push('/login'); 
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('userSession'); 
    setIsLoggedIn(false); 
    Swal.fire({
      title: "Logged out",
      text: "You have been logged out.",
      icon: "success",
      confirmButtonText: "OK",
    });    
    router.push('/login'); 
  };

  if (!isLoggedIn) {
    return null; 
  }

  return (
    <div className="container mx-auto p-8 min-h-screen">
      <div className="bg-white shadow-xl rounded-lg p-8">
        <h1 className="text-4xl font-bold mb-6 text-black border-2 border-yellow-500 rounded-full w-fit text-center p-2 bg-slate-200">Welcome back, {userName || 'User'}!</h1>
        <div className="space-y-6 text-slate-700">
          <div className="flex items-center space-x-6">
            <span className="font-semibold text-lg underline">Shipping Address:</span>
            <p>{userAddress || 'No address provided.'}</p>
          </div>
          <div className="flex items-center space-x-6">
            <span className="font-semibold text-lg underline">Phone:</span>
            <p>{userPhone || 'No phone number provided.'}</p>
          </div>
        </div>

        <h2 className="text-3xl font-semibold mt-10 text-black border-2 border-yellow-500 rounded-full w-fit text-center p-2 bg-slate-200">Your Orders</h2>
        {userOrders.length === 0 ? (
          <p className="text-slate-500 mt-6">You have no orders yet.</p>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {userOrders.map((order) => (
              <div key={order.id} className="border border-slate-300 rounded-lg p-6 bg-slate-100 hover:bg-slate-300 transition duration-300 ease-in-out">
                <h3 className="font-semibold text-2xl text-yellow-500 mb-4">Order #{order.id}</h3>
                <p className="text-slate-700">
                  <span className="font-medium">State:</span> {order.status}
                </p>
                <p className="text-slate-700">
                  <span className="font-medium">Date:</span> {new Date(order.date).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}

        <button 
          onClick={handleLogout} 
          className="mt-10 bg-slate-800 text-white px-6 py-2 rounded-lg hover:bg-black transition-all duration-300 mx-auto block">
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
