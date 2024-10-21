import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-yellow-500 p-4 text-center mt-4">
      <p>&copy; {new Date().getFullYear()} My Project. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
