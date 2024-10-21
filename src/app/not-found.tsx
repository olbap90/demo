// app/not-found.tsx
import React from 'react';
import Link from 'next/link';

const NotFound: React.FC = () => {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link href="/">Go back to Home</Link>
    </div>
  );
};

export default NotFound;