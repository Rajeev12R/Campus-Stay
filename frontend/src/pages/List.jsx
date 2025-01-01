import React, { useContext, useEffect, useState } from "react";
import { CiLocationArrow1, CiFilter, CiSearch } from "react-icons/ci";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import rating from '../assets/rating_star.svg';
import { AppContext } from "../context/AppContext.jsx";
import { useNavigate } from "react-router-dom";

const List = () => {
  const [rooms, setRooms] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRoomImages, setCurrentRoomImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { backendUrl } = useContext(AppContext);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(backendUrl + '/api/rooms/all-rooms')
      .then(response => response.json())
      .then(data => setRooms(data))
      .catch(error => console.error('Error fetching rooms:', error));
  }, [backendUrl]);

  const openModal = (roomImages) => {
    setCurrentRoomImages(roomImages);
    setCurrentImageIndex(0);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentRoomImages([]);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (currentImageIndex < currentRoomImages.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  return (
    <div className="px-4 mt-5 sm:px-10 md:px-14 lg:px-28 min-h-screen min-w-screen gap-7 flex overflow-hidden">
<div className="left bg-white/10 flex w-[60%] h-screen flex-col overflow-scroll scrollbar-thin scrollbar-thumb-black scrollbar-track-gray-300">
        <h1 className="text-2xl text-gray-400 font-light">
          Search For Rooms...
        </h1>

        <div className="flex items-center gap-2 border border-gray-400 bg-white rounded-lg my-2 lg:w-[90%] md:w-[75%] sm:w-[60%] px-3 py-2">
          <CiLocationArrow1 className="text-gray-500 text-lg" />
          <input
            type="search"
            placeholder="Enter the location"
            className="flex-1 outline-none text-gray-700 bg-transparent"
          />
        </div>

        <div className="flex gap-3 my-4">
          <button className="flex items-center border-gray-400 border bg-white hover:bg-green-50 text-black py-1 px-1 sm:px-6 rounded-3xl text-sm space-x-2">
            <span className="text-base text-gray-600">Filter</span>
            <CiFilter className="text-lg" />
          </button>
          <button className="flex items-center border-gray-400 border bg-white hover:bg-green-50 text-black py-1 px-1 sm:px-6 rounded-3xl text-sm space-x-2">
            <span className="text-base text-gray-600">Search</span>
            <CiSearch className="text-lg" />
          </button>
        </div>

        <div className="flex flex-wrap gap-6">
          {rooms.length === 0 ? (
            <p className="text-gray-600 text-lg mt-3">No rooms available</p>
          ) : (
            rooms.map((room, index) => (
              <div
                key={index}
                className="flex gap-6 bg-white/20 p-6 rounded-lg shadow-md w-full h-auto min-h-64 cursor-pointer transition-transform hover:scale-105"
              >
                <div className="justify-center">
                  <img
                    src={backendUrl + room.roomImages[0]} // Prepending the backend URL
                    alt={room.hostelName}
                    className="h-full w-72 object-cover"
                    onClick={() => openModal(room.roomImages)}
                  />
                </div>

                <div className="mt-4">
                  <h2 className="text-lg font-bold text-red-800">{room.hostelName}</h2>
                  <p className="text-sm text-gray-500 mt-2 mb-1">{room.roomDescription}</p>
                  <p className="text-sm text-gray-500 mt-2">{room.roomAddress}</p>
                  <div className="flex items-center justify-between mt-5">
                  <p className="text-md text-green-600 font-bold ">
                  <span className="line-through text-red-500">₹{room.roomPrice}</span> 
                  <span className="ml-2 text-green-600">₹{(room.roomPrice - 0.3 * room.roomPrice)}</span>
                  </p>
                  <a href="" className="text-white text-sm bg-zinc-800 px-3 py-2 mr-5 rounded-md" onClick={()=> navigate('/booking')}>Book Now</a>
                  </div>
                  <div className="flex justify-between mt-4">
                  <div className="flex ">
                    {Array.from({ length: room.roomRating }).map((_, starIndex) => (
                      <img src={rating} key={starIndex} className="w-5 h-5" alt="Star" />
                    ))}
                  </div>
                  <a href="" className="text-blue-600 mr-5">View on map</a>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Map Section */}
      <div className="right bg-green-200 flex-1 h-full">Map</div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 relative w-[90%] sm:w-[60%] md:w-[40%]">
            <button
              onClick={closeModal}
              className="absolute top-2 right-4 text-gray-700 text-lg font-bold"
            >
              ✕
            </button>
            <div className="flex items-center">
              <button
                onClick={prevImage}
                disabled={currentImageIndex === 0}
                className={`text-gray-700 ${
                  currentImageIndex === 0 ? "opacity-50" : "opacity-100"
                }`}
              >
                <AiOutlineArrowLeft size={30} />
              </button>
              <img
                src={backendUrl + currentRoomImages[currentImageIndex]} // Prepending the backend URL
                alt="Room"
                className="h-64 w-full object-contain mx-4"
              />
              <button
                onClick={nextImage}
                disabled={currentImageIndex === currentRoomImages.length - 1}
                className={`text-gray-700 ${
                  currentImageIndex === currentRoomImages.length - 1
                    ? "opacity-50"
                    : "opacity-100"
                }`}
              >
                <AiOutlineArrowRight size={30} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default List;
