import Room from "../models/rooms.js";

const addRoom = async (req, res) => {
    try {
        // Log the uploaded files and request body to debug
        console.log('Uploaded files:', req.files);
        console.log('Request body:', req.body);

        const { hostelName, roomPrice, roomDescription, roomAddress, roomRating } = req.body;

        // Check if files are uploaded
        const roomImages = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];

        console.log('Room Images:', roomImages); // Debugging line

        const newRoom = new Room({
            hostelName,
            roomImages,
            roomPrice,
            roomDescription,
            roomAddress,
            roomRating,
        });

        const savedRoom = await newRoom.save();

        res.status(201).json({
            message: 'Room added successfully',
            room: savedRoom,
        });
    } catch (err) {
        console.error('Error:', err.message);
        res.status(500).json({
            error: 'Failed to add room',
            details: err.message,
        });
    }
};

// Get all rooms
const getAllRooms = async (req, res) => {
    try {
        const roomsList = await Room.find();
        res.status(200).json(roomsList);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch rooms', details: err.message });
    }
};

export { addRoom, getAllRooms };