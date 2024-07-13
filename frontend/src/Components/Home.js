import React, { useState, useEffect } from 'react';
import pic1 from '../Images/apasta.jpg';
import pic2 from '../Images/biryani.jpg';
import pic3 from '../Images/jrice.jpg';
import pic4 from '../Images/ptikka.jpg';
import pic5 from '../Images/rabdi.jpg';

const images = [pic1, pic2, pic3, pic4, pic5];

function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div
        name="Home"
        className="max-w-screen-xl container mx-auto px-4 md:px-20 my-28 shadow-md bg-gray-200"
      >
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 mt-12 md:mt-24 space-y-2 order-2 md:order-1">
            <span className="text-xl">Welcome to My Website</span>
            <div className="flex space-x-1 text-2xl md:text-4xl">
              <h1>Hello Welcome to the Dishes Website</h1>
            </div>
            <br />
            <p className="text-sm md:text-md text-justify">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi
              at vero ad ut nobis error voluptates sit excepturi. Autem dolorem
              quaerat consequatur dicta sit earum eius cum placeat culpa dolorum
              consectetur repellendus dolores minima, praesentium saepe enim
              tempora illo voluptate.
            </p>
            <br />
            
          </div>
          <div className="md:w-1/2 md:ml-48 md:mt-20 mt-8 order-1">
            <img
              src={images[currentImageIndex]}
              className="rounded-full md:w-[450px] md:h-[450px]"
              alt="Home"
            />
          </div>
        </div>
      </div>
      <hr />
    </>
  );
}

export default Home;
