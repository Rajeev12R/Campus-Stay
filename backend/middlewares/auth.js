import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
    const {token} = req.headers;
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        if(decoded.id){
            req.body.userId = decoded.id;
        }else{
            return res.status(401).json({ message: 'Access denied. Invalid token.' });
        }
        next();
    }
    catch (error) {
        return res.status(400).json({ message: 'Invalid token' });
    }


}
export default userAuth; 