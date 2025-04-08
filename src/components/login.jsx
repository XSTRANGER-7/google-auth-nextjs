"use client";

import { useEffect, useState } from "react";
import { signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { auth, provider } from "../app/lib/firebase";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";

const Login = () => {
  const [user, setUser] = useState(null);
 
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);
 
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error("Error during sign in:", error);
    }
  };
 
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Error during sign out:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-purple-950 to-indigo-900 py-4 px-2">
      {!user ? (
        <motion.button
          onClick={handleGoogleSignIn}
          className="flex items-center gap-3 bg-white text-black px-6 py-3 rounded-full shadow-lg hover:scale-105 transform transition duration-300 ease-in-out font-semibold"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FcGoogle className="text-2xl" />
          Sign in with Google
        </motion.button>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white bg-opacity-10 backdrop-blur-md py-6 px-4 rounded-2xl shadow-2xl text-white w-[90%] max-w-md text-center"
        >
          <img
            src={user.photoURL}
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto border-4 border-white shadow-lg mb-4 text-gray-400"
          />
          <h2 className="text-2xl text-gray-800 font-bold">{user.displayName}</h2>
          <p className="text-sm text-gray-600 mt-1">{user.email}</p>

          <button
            onClick={handleLogout}
            className="mt-4 bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-full shadow-md transition"
          >
            Logout
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default Login;
