import React from 'react';

const AboutView = () => {
    return (
        <div className="container mx-auto px-4">
            <h1 className="text-center font-semibold bg-white border-yellow-500 text-black border-2 rounded-full w-fit text-3xl mt-6 mb-8 p-1.5 mx-auto">
                About Us
            </h1>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-center mb-4">
                    This project was made as a homework for the FrontEnd Developer Bootcamp at Henry.</p>
                <p className="text-center mb-4">
                    My name is Pablo Ricci, a student at Henry.
                </p>
                <p className="text-center">
                    This is my M4 project.</p>
            </div>
        </div>
    );
};

export default AboutView;
