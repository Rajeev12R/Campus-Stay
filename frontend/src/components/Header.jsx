import React, {useContext} from "react"
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  
  const { user, setShowLogin } = useContext(AppContext);
  const navigate = useNavigate();

  const onClickHandler = () => {
    if (user) {
      console.log('Navigating to /list');
      setShowLogin(false);
      navigate('/list');
    } else {
      console.log('User not logged in, showing login');
      setShowLogin(true);
    }

  }
  return (
      <div className="relative mx-auto px-4 pt-16 sm:max-w-xl md:max-w-full md:px-8 lg:py-28 xl:px-20">
        <div className="header mx-auto max-w-xl lg:max-w-screen-xl">
          <div className="mx-auto mb-16 flex flex-col items-center text-center lg:mb-0 lg:max-w-lg">
            <div className="mb-6 max-w-xl">
              <div className='items-center mb-6 text-stone-500 inline-flex text-center gap-2 bg-white px-6 py-2 rounded-full border border-neutral-500'>
                <p className="bg-teal-accent-400 inline-block rounded-full px-3 py-px text-xs font-semibold uppercase tracking-wider text-blue-900">
                ~&nbsp;&nbsp; Campus Stay Services
                </p>
              </div>
              <h2 className="mb-6 max-w-lg font-sans text-3xl font-bold tracking-tight sm:text-4xl">
              Find the Best PGs & Hostels for  <br />
                <span className="inline-block text-blue-600">
                Students
                </span>
              </h2>
              <p className="text-base text-gray-700 md:text-lg">
                Choose from a wide variety of PGs, hostels, and mess services
              around the campus. Book rooms before you arrive and secure a
              comfortable stay.
              </p>
            </div>
            <div className="flex items-center">
              <button
                onClick={onClickHandler}
                className="mr-6 inline-flex h-12 items-center justify-center rounded bg-blue-600 px-6 font-medium tracking-wide text-white shadow-md outline-none transition duration-200 hover:bg-blue-700 focus:ring"
              >
                
                Get started
              </button>
              <a
                href="#"
                aria-label=""
                className="inline-flex items-center font-semibold text-blue-600 transition-colors duration-200 hover:text-blue-800"
              >
                Learn more
              </a>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Header
