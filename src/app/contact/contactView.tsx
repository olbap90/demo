import React from 'react';

const ContactView = () => {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-center font-semibold bg-white border-yellow-500 text-black border-2 rounded-full w-fit text-3xl mt-6 mb-8 p-1.5 mx-auto">
        Contact Us
      </h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-center mb-4">
          If you have any questions or need more information about this project, feel free to contact us:
        </p>
        <div className="text-center">
          <p>Email: <a href="mailto:olbap_olimpo@hotmail.com" className="text-blue-500 underline">olbap_olimpo@hotmail.com</a></p>
          <p>Linkedin: <a href="https://www.linkedin.com/in/pablo-ricci-628ba19a/" className="text-blue-500 underline">Pablo Ricci</a></p>
        </div>
      </div>
    </div>
  );
};

export default ContactView;
