import React, { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    interests: [],
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      interests: checked
        ? [...prevData.interests, value]
        : prevData.interests.filter((interest) => interest !== value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div>
      <h1>Newsletter Signup</h1>
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleInputChange}
            aria-label="name"
          />
          <br />
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            aria-label="email"
          />
          <br />
          <div>
            <label htmlFor="interest1">
              <input
                id="interest1"
                type="checkbox"
                value="interest 1"
                onChange={handleCheckboxChange}
                checked={formData.interests.includes('interest 1')}
                aria-label="interest 1"
              />
              Interest 1
            </label>
            <label htmlFor="interest2">
              <input
                id="interest2"
                type="checkbox"
                value="interest 2"
                onChange={handleCheckboxChange}
                checked={formData.interests.includes('interest 2')}
                aria-label="interest 2"
              />
              Interest 2
            </label>
          </div>
          <button type="submit">Submit</button>
        </form>
      ) : (
        <div>
          <p>Form submitted successfully!</p>
          <p>Interests: {formData.interests.join(', ')}</p>
        </div>
      )}
    </div>
  );
}

export default App;
