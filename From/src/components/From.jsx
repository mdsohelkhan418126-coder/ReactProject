import { useState } from 'react';

export const From = () => {
  const [name, SetName] = useState('');
  const [email, SetEmail] = useState('');
  const [meassage, SetMessage] = useState('');
  const [errors, setErrors] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (validateForm()) {
      alert(`Hi ${name}!  Form submitted successfully`);
      SetName('');
      SetEmail('');
      SetMessage('');
      setErrors({});
    }
  };

  // check vilidation
  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Name is reqired!';
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email))
      newErrors.email = 'Email is reqired!';
    if (!meassage.trim()) newErrors.meassage = 'Message is reqired!';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  return (
    <form
      onSubmit={handleSubmit}
      className=" max-w-md mx-auto bg bg-white text-black p-8 rounded space-y-3"
    >
      {/* name */}
      <div>
        <label className=" block mb-1 font-semibold">Name:</label>
        <input
          value={name}
          onChange={e => SetName(e.target.value)}
          type="text"
          name="text"
          id="text"
          placeholder="Enter your name"
          className=" border p-2 md: w-64 h-full"
        />

        {errors.name && (
          <p className=" text-red-600 text-sm italic">{errors.name}</p>
        )}
      </div>
      {/* Email */}
      <div>
        <label className=" block mb-1 font-semibold">Email:</label>
        <input
          value={email}
          onChange={e => SetEmail(e.target.value)}
          type="email"
          name="email"
          id="email"
          placeholder="Enter your Email"
          className=" border p-2 md: w-64 h-full"
        />

        {errors.email && (
          <p className=" text-red-600 text-sm italic">{errors.email}</p>
        )}
      </div>
      {/* meassage */}
      <div>
        <label className=" block mb-1 font-semibold">Message:</label>
        <textarea
          value={meassage}
          onChange={e => SetMessage(e.target.value)}
          rows="6"
          name="message"
          id="message"
          placeholder="Type your message here"
          className=" border p-2 md: w-64 h-full"
        ></textarea>

        {errors.meassage && (
          <p className=" text-red-600 text-sm italic">{errors.meassage}</p>
        )}
      </div>
      <button type="submit" className=" bg-blue-500 rounded px-4 py-2">
        Submit
      </button>
    </form>
  );
};
