import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    hostelName: { type: String, required: true },
    roomImages: { type: [String], required: true },
    roomPrice: { type: String, required: true },
    roomDescription: { type: String, required: true },
    roomAddress: { type: String, required: true },
    roomRating: { type: Number, required: true, min: 0, max: 5 },
});

const Room = mongoose.model('Room', roomSchema);
export default Room;