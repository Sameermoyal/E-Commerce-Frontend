import React from 'react';

function About() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-blue-600">About Us</h1>
      <p className="text-lg text-gray-700 mt-4 max-w-2xl text-center">
        Welcome to Fashion.com, your one-stop destination for trendy and affordable fashion. 
        Our mission is to provide high-quality clothing for men, women, and children, ensuring that everyone can look stylish without breaking the bank.
      </p>
      <p className="text-lg text-gray-700 mt-4 max-w-2xl text-center">
        We are committed to delivering exceptional customer service and a seamless shopping experience. 
        Explore our collections and find the perfect outfit for any occasion.
      </p>
      <a href="/shop" className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
        Shop Now
      </a>
    </div>
  );
}

export default About;
