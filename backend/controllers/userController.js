import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;

        if(!name || !email || !password) {
            return res.status(400).json({message: "Please fill in all fields"});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const userData = {
            name,
            email,
            password: hashedPassword
        }

        const newUser = new userModel(userData);
        const user = await newUser.save();

        const token = jwt.sign({id: user._id}, process.env.SECRET_KEY);

        res.json({success: true, message: "Account Created Successfully", token, user: {name: user.name, email: user.email}});

    } catch (error) {
        console.log(error);
        res.json({success: false , message: "Failed to register user"});
        
    }
}

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password) {
            return res.status(400).json({message: "Please fill in all fields"});
        }
        const user = await userModel.findOne({email});
        if(!user) {
            return res.status(400).json({message: "User not found"});
        }        
        
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({message: "Invalid password"});
        }else{
            const token = jwt.sign({id: user._id}, process.env.SECRET_KEY);
            res.json({success: true, message: "Login Successful, Hi " + user.name, token, user: {name: user.name, email: user.email}});
        }
    }
    catch (error) {
        console.log(error);
        res.json({success: false, message: "Failed to login user"});
    }   
}

const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
            return res.status(401).json({ success: false, message: "Unauthorized: Incorrect admin credentials" });
        }

        // Check if admin already exists
        let admin = await userModel.findOne({ email });
        if (!admin) {
            const hashedPassword = await bcrypt.hash(password, 10);

            admin = new userModel({
                name: "Admin",
                email,
                password: hashedPassword,
                role: "admin",
                isAdmin: true,
            });

            await admin.save();
        }

        const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.SECRET_KEY);
        res.json({ success: true, message: `Admin Login Successful, Hi Admin`, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to login admin" });
    }
};


export {registerUser, loginUser, loginAdmin}; 