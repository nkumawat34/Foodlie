import React, { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState('');

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');

    try {
      const response = await fetch('https://foodlie-backend.onrender.com/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setStatus('Form submitted successfully!');
        setFormData({ name: '', email: '', message: '' }); // Reset form fields
      } else {
        setStatus(`Error: ${data.error}`);
      }
    } catch (error) {
      setStatus('Failed to submit form. Please try again later.');
    }
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen flex items-center justify-center p-8">
      <div className="container bg-white shadow-lg rounded-lg p-8 max-w-4xl">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Contact Us</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap justify-center gap-8 mb-8">
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="border border-gray-300 rounded-lg px-4 py-2 w-60 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="border border-gray-300 rounded-lg px-4 py-2 w-60 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="flex flex-wrap justify-between items-start gap-8">
            <div className="flex-1 order-2 md:order-1">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Get In Touch</h2>
              <p className="text-gray-600 mb-4">Email: nkumawat34@gmail.com</p>
              <p className="text-gray-600">Phone: 7014069681</p>
            </div>
            <div className="flex-1 order-1 md:order-2">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full h-40 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Message"
                required
              ></textarea>
              <div className="flex justify-center mt-4">
                <button
                  type="submit"
                  className="bg-blue-500 text-white rounded-full py-2 px-6 hover:bg-blue-600 transition-all duration-200"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
        {status && <p className="text-center text-gray-700 mt-4">{status}</p>}
      </div>
    </div>
  );
}
