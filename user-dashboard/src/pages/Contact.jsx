import React from 'react';

function Contact() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-blue-600">Contact Us</h1>
      <p className="text-lg text-gray-700 mt-4 max-w-2xl text-center">
        Have questions or need assistance? Reach out to us, and our team will be happy to help!
      </p>
      
      <form className="mt-6 w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Name</label>
          <input type="text" className="w-full p-2 border border-gray-300 rounded-lg" placeholder="Your Name" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Email</label>
          <input type="email" className="w-full p-2 border border-gray-300 rounded-lg" placeholder="Your Email" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Message</label>
          <textarea className="w-full p-2 border border-gray-300 rounded-lg" placeholder="Your Message" rows="4"></textarea>
        </div>
        <button type="submit" className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Send Message
        </button>
      </form>
    </div>
  );
}

export default Contact;
