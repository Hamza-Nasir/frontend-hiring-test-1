import React, {useContext} from 'react'
import { TTLogo } from '../assets/images'
import AuthContext from '../contexts/AuthContext';

interface navProps {
    loggedIn: boolean;
}

function Navbar({ loggedIn }: navProps) {

  const { token, clearAuthData } = useContext(AuthContext);

  const handleLogout = () => {
    if (loggedIn) {
      clearAuthData();
    }
  }

  return (
    <div className='w-full h-[80px] top-0 bg-white border-b-2 border-b-[#D3D5D8]'>
        <img src={TTLogo}
            className='absolute h-[37px] left-[23px] top-[22px]'
        />

        <button onClick={handleLogout} className={`${!loggedIn ? "hidden" : "" } absolute bg-[#4F46F8] text-[#FFFFFF] font-[500] text-center w-[115px] h-[40px] top-[20px] right-[23px]`}>
            Log out
        </button>
    </div>
  )
}

export default Navbar