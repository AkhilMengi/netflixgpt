import React, { useState, useRef, useEffect } from 'react';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { toggleGPTSearch } from '../utils/gptSlice';
import { languages } from "../utils/constants"
import { Globe } from 'lucide-react'
import { changeLanguage } from '../utils/configSlice';


const Header = () => {

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const gptButtonRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showLanguageBUtton = useSelector((store) => store.gpt.showGPTSearch)


  // Handle auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid, email, displayName }));
        navigate('/browse');
      } else {
        dispatch(removeUser());
      }
    });

    return () => unsubscribe();
  }, [dispatch, navigate]);

  // Handle outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        gptButtonRef.current &&
        !gptButtonRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = () => {
    signOut(auth).catch((error) => {
      console.error("Sign-out error:", error.message);
    });
  };

  const handleGPTSearchToggle = () => {

    dispatch(toggleGPTSearch());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value))
  }

  return (
    <header className="absolute w-screen py-2 z-10 bg-black">
      <div className="flex items-center justify-between px-6 relative z-20">
        {/* Logo */}
        <img
          src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
          alt="Logo"
          className="w-44"
        />

        {/* Profile and GPT Search */}
        {user && (
          <div className="flex items-center gap-3">
            {/* GPT Search Button */}
            <button
              ref={gptButtonRef}
              className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
              onClick={handleGPTSearchToggle}
            >
              {showLanguageBUtton?"Home page": "GPT Search"}
            </button>
            {showLanguageBUtton &&
              <div className="relative inline-block">
                {/* Globe Icon */}
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Globe className="text-white w-4 h-4" />
                </div>

                {/* Select Box */}
                <select className="appearance-none pl-10 pr-4 py-2 bg-black text-white text-sm rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleLanguageChange}
                >
                  {languages.map(lang => <option key={lang.identifier} value={lang.identifier} >{lang.name}</option>)}
                </select>
              </div>}

            {/* Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <img
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-10 h-10 rounded-full cursor-pointer border-2 border-white hover:border-red-500 transition duration-300"
                src="https://i.pravatar.cc/150?img=56"
                alt="profile"
              />

              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-44 bg-gray-900 text-white rounded-xl shadow-2xl border border-gray-700 py-2 backdrop-blur-lg animate-fadeIn transition-all">
                  <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-700 transition">
                    Profile - (Hello {user?.displayName})
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-700 transition">
                    Settings
                  </button>
                  <div className="border-t border-gray-700 my-1"></div>
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700 transition"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900/40 to-transparent w-full z-0" />
    </header>
  );
};

export default Header;
