import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import userRouter from './routes/userRoutes.js';
import roomRouter from './routes/roomRoutes.js';
import bodyParser from 'body-parser';


const PORT = process.env.PORT || 4000;
const app = express()

app.use(express.json())
app.use(cors())
app.use(bodyParser.json())
app.use('/uploads', express.static('uploads'))
await connectDB()

app.use('/api/user', userRouter);
app.use('/api/rooms', roomRouter);
app.get('/', (req, res) => res.send('API Working'));

app.listen(PORT, ()=> console.log('Server running at port ' + PORT)
)