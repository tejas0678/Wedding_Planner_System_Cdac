import React, { useState } from 'react';
import SimplePage from '../../components/common/SimplePage';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <SimplePage title="Contact Us" subtitle="We'd love to hear about your big day">
      <div className="bg-white rounded-2xl shadow-sm p-8">
        {submitted ? (
          <p className="text-center text-rose-600 font-medium">
            Thanks for reaching out! We'll get back to you within 24 hours.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Message</label>
              <textarea
                name="message"
                rows={4}
                required
                value={form.message}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-rose-600 text-white py-2 rounded-full hover:bg-rose-700 transition"
            >
              Send Message
            </button>
          </form>
        )}
      </div>
    </SimplePage>
  );
};

export default Contact;
