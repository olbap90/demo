"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface LoginFormData {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {

      const response = await fetch(`${API_BASE_URL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        Swal.fire({
          title: "Error",
          text: "Incorrect email or password.",
          icon: "error",
          confirmButtonText: "OK",
        });
        return;
      }

      const { token, user } = await response.json();
      
      localStorage.setItem('userSession', JSON.stringify({ token, user }));
      Swal.fire({
        title: "Welcome!",
        text: "You have successfully logged in.",
        icon: "success",
        confirmButtonText: "OK",
      });
      router.push('/');
    } catch (error) {
      setError('Error en la conexión. Intenta nuevamente.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-96">
      <h2 className="text-center  text-2xl font-bold mb-5">Log In</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mb-4">
        <label className="block mb-2 text-sm font-bold text-gray-700">E-Mail</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="mb-6">
        <label className="block mb-2 text-sm font-bold text-gray-700">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
      >
        Log In
      </button>
    </form>
  );
};

export default LoginForm;
