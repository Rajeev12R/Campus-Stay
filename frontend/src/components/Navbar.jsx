import React, { useContext } from "react"
import profile from "../assets/profile_icon.png"
import { Link } from "react-router-dom"
import { AppContext } from "../context/AppContext"


const Navbar = () => {

    const {user, setShowLogin, logout} = useContext(AppContext)



  return (
    <div className="flex items-center justify-between py-4">
      <Link to="/">
      <a
        className="text-2xl font-bold text-gray-900 lg:text-3xl hover:text-gray-700"
        href="#"
      >
      <span className="text-2xl font-bold">
      Campus<span className="text-blue-600">Stay</span>.
      </span>
      </a>
      </Link>

      <div className="">
        {user ? (
          <div className="flex items-center gap-2 sm:gap-3">
            <p className="pl-4 max-sm:hidden text-gray-600">Hi, {user.name}</p>
            <div className="relative group">
              <img src={profile} alt="" className="w-10 drop-shadow" />
            <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12 ">
                <ul className="list-none m-0 p-2 bg-white rounded-md border text-sm">
                    <li onClick={logout} className="px-1 py-2 cursor-pointer pr-10 text-center">Logout</li>
                </ul>
            </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 sm:gap-5 ">
            <p onClick={() => navigate("/buy")} className="cursor-pointer">
              Pricing
            </p>
            <button onClick={()=>setShowLogin(true)} className="bg-zinc-800 text-white py-2 px-7 sm:px-8 rounded-xl text-sm">
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
