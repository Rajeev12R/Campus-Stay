import { createContext, useState} from "react";
import { toast } from "react-toastify";
import axios from "axios";
export const AppContext = createContext()
import { useNavigate } from "react-router-dom";


const AppContextProvider = (props) => {
    const [user, setUser] = useState(null);
    const [showLogin, setShowLogin] = useState(false);
    const [showAdminLogin, setShowAdminLogin] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token'));


    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const mapAPI = import.meta.env.VITE_MAP_API_KEY;


    const navigate = useNavigate();



    const logout =  () => {
        localStorage.removeItem('token')
        setToken('')
        setUser(null)
    }
    

    const value = {
        user, 
        setUser,
        showLogin,
        setShowLogin,
        showAdminLogin,
        setShowAdminLogin,
        backendUrl,
        token,
        setToken,
        logout,
        mapAPI,
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
export default AppContextProvider;  