import React, { useState } from 'react';
import RegisterFormProps from '../../Interfaces/IRegisterFormProps';

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    phone: ''
  });

  const validateName = (value: string) => {
    if (value.length < 3) {
      return 'Name must be at least 3 characters long.';
    }
    return '';
  };

  const validateEmail = (value: string) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(value)) {
      return 'Please enter a valid email address.';
    }
    return '';
  };

  const validatePassword = (value: string) => {
    if (value.length < 6) {
      return 'Password must be at least 6 characters long.';
    }
    return '';
  };

  const validateAddress = (value: string) => {
    if (value.length < 5) {
      return 'Address must be at least 5 characters long.';
    }
    return '';
  };

  const validatePhone = (value: string) => {
    const phonePattern = /^[0-9]{10,}$/; 
    if (!phonePattern.test(value)) {
      return 'Phone number must be at least 10 digits long.';
    }
    return '';
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    setErrors((prevErrors) => ({ ...prevErrors, name: validateName(value) }));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setErrors((prevErrors) => ({ ...prevErrors, email: validateEmail(value) }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setErrors((prevErrors) => ({ ...prevErrors, password: validatePassword(value) }));
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAddress(value);
    setErrors((prevErrors) => ({ ...prevErrors, address: validateAddress(value) }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhone(value);
    setErrors((prevErrors) => ({ ...prevErrors, phone: validatePhone(value) }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (Object.values(errors).some((error) => error !== '')) {
      return;
    }

    onSubmit(name, email, password, address, phone);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={handleNameChange}
          className="w-full p-2 border rounded"
          required
        />
        {errors.name && <p className="text-red-500">{errors.name}</p>}
      </div>
      <div>
        <label htmlFor="email" className="block">E-Mail:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          className="w-full p-2 border rounded"
          required
        />
        {errors.email && <p className="text-red-500">{errors.email}</p>}
      </div>
      <div>
        <label htmlFor="password" className="block">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          className="w-full p-2 border rounded"
          required
        />
        {errors.password && <p className="text-red-500">{errors.password}</p>}
      </div>
      <div>
        <label htmlFor="address" className="block">Address:</label>
        <input
          type="text"
          id="address"
          value={address}
          onChange={handleAddressChange}
          className="w-full p-2 border rounded"
          required
        />
        {errors.address && <p className="text-red-500">{errors.address}</p>}
      </div>
      <div>
        <label htmlFor="phone" className="block">Phone:</label>
        <input
          type="tel"
          id="phone"
          value={phone}
          onChange={handlePhoneChange}
          className="w-full p-2 border rounded"
          required
        />
        {errors.phone && <p className="text-red-500">{errors.phone}</p>}
      </div>
      <button type="submit" className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600">Register</button>
    </form>
  );
};

export default RegisterForm;
