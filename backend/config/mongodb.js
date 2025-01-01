import mongoose from 'mongoose';

const connectDB = async () => {
    mongoose.connection.on('connected', ()=> {
        console.log('Connnected to MongoDB')
    })
    await mongoose.connect(process.env.MONGO_URI, {

    })
}
export default connectDB;  