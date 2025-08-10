import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router";

export function Header() {
  const navigation=useNavigate();
  const [isVisible,setIsVisible]=useState(false);
  return (
    <>
    <header className="sticky top-0 left-0 w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow-lg z-50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-10">
            <div className="text-2xl font-extrabold tracking-wide hover:cursor-pointer" onClick={()=>{
              navigation('/')
            }}>
              <span className="text-indigo-400">Form</span>ily
            </div>
            <nav className="hidden md:flex gap-6 text-sm opacity-90">
              {["Features", "Examples"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="relative group"
                >
                  <span className="hover:text-indigo-400 transition-colors">
                    {item}
                  </span>
                  <span className="absolute left-0 -bottom-1 w-0 group-hover:w-full h-0.5 bg-indigo-400 transition-all duration-300"></span>
                </a>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="text-sm px-3 py-1 rounded-md hover:bg-gray-700 transition-colors"
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className="hidden sm:inline-block bg-indigo-500 hover:bg-indigo-600 text-white text-sm px-4 py-2 rounded-md font-medium shadow-md transition-colors"
            >
              Get started
            </Link>

            <button
              className="md:hidden ml-2 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Open menu"
              onClick={()=>{
                setIsVisible(prev=>!prev)
              }}
            >
              {isVisible ? <FaTimes className="h-5 w-5" /> : <FaBars className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>
    </header>
     {isVisible && (
        <div className="md:hidden bg-gray-900 text-white shadow-lg ">
          <nav className="flex flex-col space-y-4 px-6 py-4">
            <a className="hover:text-indigo-400 transition-colors" href="#features">Features</a>
            <a className="hover:text-indigo-400 transition-colors" href="#examples">Examples</a>
            <Link className="bg-gray-600 text-white px-4 py-2 rounded-md text-center" to="/login">
              Login
            </Link>
            <Link className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md text-center" to="/signup">
              Get started
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
