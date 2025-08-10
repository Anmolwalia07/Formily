import {
  FaLock,
  FaEnvelope,
  FaEye,
  FaEyeSlash
} from "react-icons/fa";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formData,setFormData]=useState({
    email:'',
    password:''
  })

  const navigation=useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios.post(`${import.meta.env.VITE_API_Server}/api/user/login`,formData).then((res)=>{
      if(res.status===200){
        localStorage.setItem('token',res.data.token);
        setIsLoading(false);
        navigation('/dashboard');
      }
    }).catch(err=>{
      setIsLoading(false);
      console.log(err)
    })

  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow flex items-center justify-center bg-gray-900 py-8 px-4 sm:py-12 ">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex flex-col justify-center text-center lg:text-left px-2 sm:px-4">
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 mb-6">
                <div className="bg-white w-12 h-12 rounded-xl flex items-center justify-center">
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-500 w-8 h-8 rounded-lg flex items-center justify-center">
                    <FaLock className="text-white text-sm" />
                  </div>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white">Formily</h1>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-snug">
                Secure Access to Your Forms
              </h2>
              <p className="text-base sm:text-lg text-indigo-200 max-w-md mx-auto lg:mx-0">
                Manage your quizzes, analyze responses, and create beautiful forms in one place.
              </p>
            </div>

            <div className="mt-8 p-5 sm:p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-green-500/20 w-8 h-8 rounded-full flex items-center justify-center">
                  <FaEnvelope className="text-green-400 text-sm" />
                </div>
                <h3 className="font-medium text-white">100% Secure</h3>
              </div>
              <p className="text-indigo-200 text-sm sm:text-base">
                Your data is encrypted and protected with industry-standard security protocols.
              </p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-xl p-6 sm:p-8 border border-white/20 w-full max-w-lg mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-8">
              Welcome Back
            </h2>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-indigo-200 text-sm font-medium mb-2" htmlFor="email">
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
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-indigo-200 text-sm font-medium" htmlFor="password">
                    Password
                  </label>
                  <h1  className="text-sm text-indigo-300 hover:text-indigo-200 transition-colors">
                    Forgot password?
                  </h1>
                </div>
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
                    className="absolute right-3 top-3.5 text-indigo-300 hover:text-white transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-indigo-200">
                  Remember me
                </label>
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
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 
                          5.291A7.962 7.962 0 014 12H0c0 3.042 
                          1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Signing in...
                  </div>
                ) : (
                  "Log In"
                )}
              </button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/20"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  {/* <span className="px-2 bg-transparent text-indigo-300">Or continue with</span> */}
                </div>
              </div>
            </form>

            <p className="text-sm text-indigo-300 text-center mt-8">
              Don't have an account?{" "}
              <Link to="/signup" className="font-medium text-white hover:underline transition-all">
                Sign up now
              </Link>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
