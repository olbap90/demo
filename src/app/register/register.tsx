"use client";
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';


const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const RegisterPage: React.FC = () => {
  const router = useRouter();

  const handleFormSubmit = async (name: string, email: string, password: string, address: string, phone: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, address, phone }),
      });

      if (response.ok) {
        Swal.fire({
          title: "Success",
          text: "Your account has been created successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });
        router.push('/login');
      } else {
        Swal.fire({
          title: "Error",
          text: "An error occurred while creating your account.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
      Swal.fire({
        title: "Error",
        text: "An error occurred while creating your account.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-center text-2xl font-bold mb-4">Register</h2>
        <RegisterForm onSubmit={handleFormSubmit} /> 
      </div>
    </div>
  );
};

export default RegisterPage;
