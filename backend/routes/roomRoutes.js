import express from 'express';
import { addRoom, getAllRooms } from '../controllers/roomController.js';
import multer from 'multer';
import path from 'path';

const roomRouter = express.Router();

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve("uploads/")); // Ensure the directory exists
    },
    filename: (req, file, cb) => {
        const fileName = `${Date.now()}-${file.originalname}`;
        cb(null, fileName);
    },
});

const upload = multer({ storage: storage });

// Define routes
roomRouter.post('/new-room', upload.array('roomImages', 10), addRoom);
roomRouter.get('/all-rooms', getAllRooms);

export default roomRouter;