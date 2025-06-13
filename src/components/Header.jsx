import React, { useState, useRef, useEffect } from 'react';
import {onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser,removeUser } from '../utils/userSlice';



const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  const dispatch= useDispatch()
  const navigate= useNavigate()
  const user = useSelector((store)=>store.user)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {

            const { uid, email, displayName } = user;
            dispatch(
                addUser({
                    uid: uid,
                    email: email,
                    displayName: displayName
                })
            )
            navigate('/browse')
           

        } else {
            dispatch(removeUser())

        }
    });
    return () => unsubscribe();
}, [])

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = () => {
    signOut(auth).then(() => {
    
      
    }).catch((error) => {
     setError(error.message)
    });
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

        {/* Profile dropdown */}
        { user && <div className="relative" ref={dropdownRef}>
          <img
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-10 h-10 rounded-full cursor-pointer border-2 border-white hover:border-red-500 transition duration-300"
            src="https://i.pravatar.cc/150?img=56"
            alt="profile"
          />
          {dropdownOpen && (
            <div
              className="absolute right-0 mt-3 w-44 bg-gray-900 text-white rounded-xl shadow-2xl border border-gray-700 py-2 backdrop-blur-lg animate-fadeIn transition-all"
            >
              <button
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-700 transition"
              >
                Profile - (Hello {user?.displayName})

              </button>
              <button
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-700 transition"
              >
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
        </div>}
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900/40 to-transparent w-full z-0" />
    </header>
  );
};

export default Header;
