
import React, { useRef, useState } from 'react'

import Header from './Header'

import { checkValidateData } from '../utils/validate'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase';

import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';


const Login = () => {
    const [isSignIn, setIsSignIn] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null);
    const dispatch = useDispatch()

    const firstName = useRef(null);
    const lastName = useRef(null);
    const confirmPassword = useRef(null);

    const email = useRef(null)
    const password = useRef(null)

   

    const toggleSingInForm = () => {
        setIsSignIn(!isSignIn);
    };

    const handleButtonClick = () => {
        const message = checkValidateData(
            email.current.value,
            password.current.value,
            isSignIn ? null : confirmPassword.current.value,
            isSignIn ? null : firstName.current.value,
            isSignIn ? null : lastName.current.value
        );

        setErrorMessage(message);
        if (message) return;

        if (!isSignIn) {
            //Signup logic
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {

                    const user = userCredential.user;
                    updateProfile(user, {
                        displayName: `${firstName.current.value} ${lastName.current.value}`

                    }).then(() => {
                        const { uid, email, displayName } = auth.currentUser;
                        dispatch(
                            addUser({
                                uid: uid,
                                email: email,
                                displayName: displayName
                            })
                            
                        )
                       
                       
                    }).catch((error) => {
                        setErrorMessage(error.message)
                    });
                    console.log(user)

                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + "-" + error.message)
                });
        } else {
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {

                    const user = userCredential.user;
                    console.log(user)
                    
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + "-" + errorMessage)
                });

        }
    };



    return (
        <div>
            <Header />
            <div className='absolute inset-0 bg-cover bg-black bg-center filter blur-xs scale-100'>
                <img src="https://assets.nflxext.com/ffe/siteui/vlv3/af2fac72-d956-4952-8686-4d45d359d78c/web/IN-en-20250526-TRIFECTA-perspective_5db3e163-56f7-47c7-9a65-b79b9d76bf24_large.jpg" alt="logo" />
            </div>
            <div className="relative z-10 flex items-center justify-center h-full pt-16">
                <div className='opacity-85'>
                    <form
                        onSubmit={(e) => e.preventDefault()}
                        className="bg-black bg-opacity-75 p-8 rounded-lg text-white h-full max-h-lg w-full max-w-lg space-y-4 shadow-xl mt-20 ">
                        <h1 className="text-2xl font-bold text-center mb-4">{isSignIn ? "Sign In" : "Sign Up"}</h1>
                        {!isSignIn &&
                            <input
                                ref={firstName}
                                type="text"
                                placeholder="First Name"
                                className="w-full px-4 py-2 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                            />}
                        {!isSignIn &&
                            <input
                                ref={lastName}
                                type="text"
                                placeholder="Last Name"
                                className="w-full px-4 py-2 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                            />}

                        <input
                            ref={email}
                            type="email"
                            placeholder="Email"
                            className="w-full px-4 py-2 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                        <input
                            ref={password}
                            type="password"
                            placeholder="Password"
                            className="w-full px-4 py-2 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                        {!isSignIn &&

                            <input
                                ref={confirmPassword}
                                type="password"
                                placeholder="Confirm Password"
                                className="w-full px-4 py-2 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                            />}
                        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}


                        <button
                            type="submit"
                            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded font-semibold" onClick={handleButtonClick}
                        >
                            {isSignIn ? "Sign In" : "Sign Up"}
                        </button>

                        {/* Remember me and Forgot password */}
                        <div className="flex items-center justify-between text-sm text-gray-300">
                            <label className="flex items-center">
                                <input type="checkbox" className="mr-2" />
                                Remember me
                            </label>
                            <a href="#" className="hover:underline text-blue-400">
                                Forgot password?
                            </a>
                        </div>

                        {/* Sign up link */}
                        <p className="text-sm text-gray-400 text-center pt-4 underline cursor-pointer " onClick={toggleSingInForm}>

                            {isSignIn ? "New to the site?Sign Up" : "Already a member? Sign In"}

                        </p>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default Login