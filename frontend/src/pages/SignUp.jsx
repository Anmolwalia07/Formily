import { FaLock, FaEnvelope, FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios"
export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
      name:'',
      email:'',
      password:''
    });

  const navigation=useNavigate();
  const Api=import.meta.env.VITE_API_Server;
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
     axios.post(`${Api}/api/user/register`,formData).then((res)=>{
      if(res.status===200){
        setIsLoading(false);
        navigation('/login');
      }
    }).catch(err=>{
      console.log(err);
      setIsLoading(false);
    })
  };

  return (
   <>
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex items-center justify-center bg-gray-900 py-8 sm:py-12 px-4">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          <div className="flex flex-col justify-center text-center lg:text-left space-y-4">
            <div className="flex flex-col items-center lg:items-start">
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                <div className="bg-white w-12 h-12 rounded-xl flex items-center justify-center">
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-500 w-8 h-8 rounded-lg flex items-center justify-center">
                    <FaUser className="text-white text-sm" />
                  </div>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white">
                  Join Formily
                </h1>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
                Create Your Free Account
              </h2>
              <p className="text-base sm:text-lg text-indigo-200 max-w-md">
                Build, customize, and manage your forms effortlessly — all in one place.
              </p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-xl p-6 sm:p-8 border border-white/20">
            <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-6">
              Sign Up
            </h2>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-indigo-200 text-sm font-medium mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <FaUser className="absolute left-3 top-3.5 text-indigo-300" />
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e)=>{
                      setFormData({...formData,name:e.target.value})
                    }}
                    placeholder="John Doe"
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/10 text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-white/20"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-indigo-200 text-sm font-medium mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-3.5 text-indigo-300" />
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e)=>{
                      setFormData({...formData,email:e.target.value})
                    }}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/10 text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-white/20"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-indigo-200 text-sm font-medium mb-2">
                  Password
                </label>
                <div className="relative">
                  <FaLock className="absolute left-3 top-3.5 text-indigo-300" />
                  <input
                    id="password"
                    value={formData.password}
                    onChange={(e)=>{
                      setFormData({...formData,password:e.target.value})
                    }}
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-3 rounded-lg bg-white/10 text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-white/20"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-indigo-300 hover:text-white transition-colors"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 px-4 rounded-lg font-medium shadow-lg transition-all ${
                  isLoading
                    ? "bg-indigo-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 hover:shadow-xl text-white"
                }`}
              >
                {isLoading ? "Creating account..." : "Create Account"}
              </button>
            </form>

            <p className="text-sm text-indigo-300 text-center mt-6">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-white hover:underline transition-all">
                Log in here
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
    </>
  );
}
