// Create.js

import React, { useState, useEffect } from 'react';
import AxiosInstance from './Axios';
import image from '../Images/food1.jpeg';

function Create() {
  const [dishName, setDishName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [cards, setCards] = useState([]);

  // Function to fetch cards from backend
  const fetchCards = async () => {
    try {
      const response = await AxiosInstance.get('/dish/');
      setCards(response.data);
    } catch (error) {
      console.error('Error fetching cards:', error);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []); // Fetch cards on component mount

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      dishName: dishName,
      imageUrl: imageUrl.trim(),
      isPublished: isPublished,
    };

    try {
      const response = await AxiosInstance.post('/dish/', formData);
      console.log('Form data saved successfully:', response.data);

      setCards([...cards, response.data]); // Add new card to state
      setDishName('');
      setImageUrl('');
      setIsPublished(false);
    } catch (error) {
      console.error('Error saving form data:', error.response.data);
    }
  };

  const togglePublished = async (id, currentStatus) => {
    try {
      const response = await AxiosInstance.patch(`/dish/${id}/`, { isPublished: !currentStatus });
      console.log('Updated publish status:', response.data);

      // Update state to reflect the changed publish status
      setCards(cards.map(card => {
        if (card.id === id) {
          return { ...card, isPublished: !currentStatus };
        }
        return card;
      }));
    } catch (error) {
      console.error('Error updating publish status:', error);
    }
  };

  return (
    <div name="Create" className="max-w-screen-2xl container mx-auto px-4 md:px-20 my-28">
      <h1 className="text-3xl font-bold mb-10 text-center">Create Dish</h1>
      <div className="bg-white shadow-md rounded-lg p-8 flex flex-col md:flex-row max-w-screen-xl">
        <div className="w-full md:w-1/2">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="dishName" className="block text-sm font-medium text-gray-700">
                Enter Your Dish Name
              </label>
              <input
                type="text"
                id="dishName"
                name="dishName"
                value={dishName}
                onChange={(e) => setDishName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
                Enter the Dish URL
              </label>
              <input
                type="text"
                id="imageUrl"
                name="imageUrl"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="isPublished" className="block text-sm font-medium text-gray-700">
                Published
              </label>
              <button
                type="button"
                onClick={() => setIsPublished(!isPublished)}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${isPublished ? 'bg-green-500' : 'bg-red-500'}`}
              >
                {isPublished ? 'Published' : 'Not Published'}
              </button>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="hidden md:block w-full md:w-1/2 p-8">
          <img src={image} alt="Create Dish" className="rounded-lg w-full h-full object-cover" />
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map((card, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-6">
            <img src={card.imageUrl || image} alt={card.dishName} className="rounded-lg w-full h-48 object-cover" />
            <h2 className="text-2xl font-bold mt-4">{card.dishName}</h2>
            <p className="mt-2">{card.isPublished ? 'Published' : 'Not Published'}</p>
            <button
              type="button"
              onClick={() => togglePublished(card.id, card.isPublished)}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${card.isPublished ? 'bg-green-500' : 'bg-red-500'}`}
            >
              {card.isPublished ? 'Unpublish' : 'Publish'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Create;
