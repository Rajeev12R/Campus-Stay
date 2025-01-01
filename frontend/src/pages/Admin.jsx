import React, {useState} from 'react'
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { FaWpforms } from "react-icons/fa6";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import ListNewRoom from '../components/ListNewRoom';

const Admin = () => {
    const navigate = useNavigate();
    const [selectedSection, setSelectedSection] = useState('');

    const handleSectionChange = (section) => {
        setSelectedSection(section);
    }
  return (
    <div className='px-4 mt-5 sm:px-10 md:px-14 lg:px-28 min-h-screen min-w-screen flex '>
        <div className="left w-[30%] h-screen bg-[#1f093b] rounded-lg text-white text-sm">
            <div className="flex gap-2 items-center px-4 py-3 cursor-pointer" onClick={() => navigate('/admin')}>
            <MdOutlineAdminPanelSettings className='text-white size-8'/>
            <h1 className="text-lg">Admin Panel</h1>
            </div>
            <hr />

            <div className="flex flex-col mx-5  mt-12 ">

                <div className="flex gap-2 items-center px-4 py-3 rounded-e-xl hover:bg-[#ffffff] hover:text-black"
                onClick={() => handleSectionChange('form')}
                >
                <FaWpforms className='w-5 h-5'/>
                <h2 className="text-sm">List New Room</h2>
                </div>

                <div className="flex gap-2 items-center px-4 py-3 rounded-e-xl hover:bg-[#ffffff] hover:text-black">
                <RiMoneyRupeeCircleLine className='w-5 h-5'/>
                <h2 className="text-sm">Payments</h2>
                </div>

            </div>
        </div>
        <div className="right w-[70%] h-screen bg-[#ecf0f0] rounded-lg text-black text-sm">
            {selectedSection === 'form' && <ListNewRoom/>}
        </div>
    </div>
  )
}

export default Admin