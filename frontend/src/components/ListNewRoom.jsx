import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';


const ListNewRoom = () => {

    const {backendUrl} = useContext(AppContext);

    const [roomDetails, setRoomDetails] = useState({
        hostelName: '',
        roomImages: [], // Array to handle multiple images
        roomPrice: '',
        roomDescription: '',
        roomAddress: '',
        roomRating: '',
    });

    const [imagePreviews, setImagePreviews] = useState([]); // State for image previews

    // Handle input change for text inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setRoomDetails({
            ...roomDetails,
            [name]: value,
        });
    };

    // Handle image selection
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const previews = files.map((file) => URL.createObjectURL(file));

        setRoomDetails({
            ...roomDetails,
            roomImages: files,
        });
        setImagePreviews(previews);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        
        console.log('Room Details:', roomDetails);
        // Logic for handling form submission, e.g., sending data to a server.
        formData.append('hostelName', roomDetails.hostelName);
        formData.append('roomPrice', roomDetails.roomPrice);
        formData.append('roomDescription', roomDetails.roomDescription);
        formData.append('roomAddress', roomDetails.roomAddress);
        formData.append('roomRating', roomDetails.roomRating);

        roomDetails.roomImages.forEach((image) => {
            formData.append('roomImages', image);
        });

        try {
            // Send POST request to the backend
            const response = await axios.post(backendUrl + '/api/rooms/new-room', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            console.log('Response:', response.data);
            toast.success('Room added successfully!');
        } catch (error) {
            console.error('Error:', error);
            toast.error('Failed to add the room. Please try again.');
        }
    };

    return (
        <div className="form-container flex flex-col">
            <h2 className="text-lg font-bold text-center my-4">Add New Room</h2>
            <form onSubmit={handleSubmit} className="mx-auto w-full my-5 p-8">
                <div className="flex items-center gap-3 mb-4">
                    <input
                        type="text"
                        name="hostelName"
                        required
                        placeholder="Hostel Name"
                        className="text-gray-600 w-[80%] px-4 py-2 outline-none border border-gray-300 focus:border-zinc-800"
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="roomPrice"
                        required
                        placeholder="Price"
                        className="text-gray-600 px-4 py-2 outline-none border border-gray-300 focus:border-zinc-800 w-[45%]"
                        onChange={handleChange}
                    />
                </div>
                <div className="flex items-center mb-4">
                    <input
                        type="text"
                        name="roomAddress"
                        required
                        placeholder="Address"
                        className="w-full h-20 px-4 py-2 outline-none border border-gray-300 focus:border-zinc-800"
                        onChange={handleChange}
                    />
                </div>
                <div className="flex items-center mb-4">
                    <input
                        type="text"
                        name="roomDescription"
                        required
                        placeholder="Description"
                        className="w-full h-20 px-4 py-2 outline-none border border-gray-300 focus:border-zinc-800"
                        onChange={handleChange}
                    />
                </div>
                <div className="flex justify-between items-center mb-4">
                    <div className="flex flex-col mb-4">
                        <span className="mr-2 text-blue-500 text-md font-bold">Room Images</span>
                        <input
                            type="file"
                            name="roomImages"
                            multiple
                            required
                            className="mt-2"
                            onChange={handleImageChange}
                        />
                    </div>
                    <input
                        type="number"
                        name="roomRating"
                        min={0}
                        max={5}
                        required
                        placeholder="Rating ⭐️"
                        className="border border-gray-300 px-4 py-2 w-32 outline-none focus:border-zinc-800"
                        onChange={handleChange}
                    />
                </div>
                <div className="image-preview grid grid-cols-2 gap-4 mb-4">
                    {imagePreviews.map((src, index) => (
                        <img
                            key={index}
                            src={src}
                            alt={`Preview ${index + 1}`}
                            className="w-auto h-32 object-cover rounded-lg border"
                        />
                    ))}
                </div>
                <div className="flex items-center justify-center mt-4">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ListNewRoom;
