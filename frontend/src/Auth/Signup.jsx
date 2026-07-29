import React, { useState } from 'react';
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

import { User, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';



const SignUp=({ onSuccess })=> {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({

    username: '',
    email: '',
    password: '',
    emailUpdates: false,

  });



  const handleChange = (e) => {

    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({

      ...prev,

      [name]: type === 'checkbox' ? checked : value,

    }));

  };



  const handleSubmit = async(e) => {

    e.preventDefault();
    try {

      const response= await axios.post('http://localhost:5000/api/save-user', formData);
      
      if (response.data.success) {
      toast.success("User registered successfully!");
      navigate('/user_dashboard'); // Standardized route path
    }

    } catch (error) {
    const errorMsg = error.response?.data?.message || "Error occurred while registering user";
    toast.error(errorMsg);    }
    
  };



  return (

<div className="min-h-screen w-full flex items-center justify-center p-0 md:p-3 bg-white md:bg-slate-100/80 dark:bg-slate-900 md:dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors">

  <div className="w-full h-full min-h-screen md:min-h-0 md:max-w-3xl md:max-h-[88vh] bg-white dark:bg-slate-900 rounded-none md:rounded-2xl shadow-none md:shadow-xl border-none md:border md:border-slate-200/80 md:dark:border-slate-800 flex flex-col md:flex-row overflow-y-auto md:overflow-hidden">        

        {/* Left Section: Compact Banner */}

        <div className="w-full md:w-5/12 bg-gradient-to-br from-teal-600 via-teal-500 to-emerald-600 text-white p-5 md:p-6 flex flex-col justify-between relative overflow-hidden shrink-0">

          <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />

          <div className="absolute -bottom-12 -right-12 w-44 h-44 bg-emerald-400/20 rounded-full blur-2xl pointer-events-none" />



          <div className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left">

            <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-md p-2 flex items-center justify-center shadow-sm border border-white/20 mb-2">

              <img

                src="/sticky-notes.png"

                alt="StackNotes Logo"

                className="w-full h-full object-contain drop-shadow-md"

              />

            </div>

            <h1 className="text-xl font-extrabold tracking-tight">StackNotes</h1>

            <p className="text-teal-100/90 text-[11px] mt-0.5 font-medium leading-snug">

              Start building your personal knowledge memory stack.

            </p>

          </div>



          <div className="relative z-10 text-center md:text-left text-[11px] text-teal-100/80 pt-3 border-t border-white/15 mt-4 md:mt-0">

            <p>Join StackNotes today.</p>

          </div>

        </div>



        {/* Right Section: Compact Form */}

        <div className="w-full md:w-7/12 p-4 sm:p-6 flex flex-col justify-center bg-white dark:bg-slate-900 overflow-y-auto">

          <div className="mb-2">

            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">

              Sign Up

            </h2>

            <p className="text-[11px] text-slate-500 dark:text-slate-400">

              Enter your details to create your account

            </p>

          </div>



          <div className="mb-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-teal-50 dark:bg-teal-950/40 border border-teal-200/60 dark:border-teal-800/60 text-teal-700 dark:text-teal-300 text-[11px] font-medium">

            <Lock size={12} className="shrink-0 text-teal-600 dark:text-teal-400" />

            <span>Your information is safe with us</span>

          </div>



          <form onSubmit={handleSubmit} className="space-y-2.5">

            <div>

              <label htmlFor='username' className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-0.5 uppercase tracking-wider">

                Username

              </label>

              <div className="relative">

                <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400">

                  <User size={14} />

                </div>

                <input

                  type="text"

                  name="username"

                  value={formData.username}

                  onChange={handleChange}

                  required

                  placeholder="Enter your username"

                  className="w-full pl-8 pr-2.5 py-1.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg text-xs outline-none text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:border-teal-500 focus:ring-1 focus:ring-teal-500/20"

                />

              </div>

            </div>



            <div>

              <label htmlFor="email" className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-0.5 uppercase tracking-wider">

                Email Address

              </label>

              <div className="relative">

                <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400">

                  <Mail size={14} />

                </div>

                <input

                  type="email"

                  name="email"

                  value={formData.email}

                  onChange={handleChange}

                  required

                  placeholder="name@example.com"

                  className="w-full pl-8 pr-2.5 py-1.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg text-xs outline-none text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:border-teal-500 focus:ring-1 focus:ring-teal-500/20"

                />

              </div>

            </div>



            <div>

              <label htmlFor="password" className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-0.5 uppercase tracking-wider">

                Password

              </label>

              <div className="relative">

                <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400">

                  <Lock size={14} />

                </div>

                <input

                  type={showPassword ? 'text' : 'password'}

                  name="password"

                  value={formData.password}

                  onChange={handleChange}

                  required

                  placeholder="Enter your password"

                  className="w-full pl-8 pr-8 py-1.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg text-xs outline-none text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:border-teal-500 focus:ring-1 focus:ring-teal-500/20"

                />

                <button

                  type="button"

                  onClick={() => setShowPassword(!showPassword)}

                  className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400 hover:text-slate-600"

                >

                  {showPassword ? <Eye size={14} /> : <EyeOff size={14} />}

                </button>

              </div>

            </div>



            <div className="flex items-center gap-2 pt-0.5">

              <input

                type="checkbox"

                id="emailUpdates"

                name="emailUpdates"

                value="emailUpdates"

                checked={formData.emailUpdates}

                onChange={handleChange}

                className="w-3 h-3 rounded border-slate-300 dark:border-slate-700 text-teal-600 focus:ring-teal-500 accent-teal-600 cursor-pointer"

              />

              <label

                htmlFor="emailUpdates"

                className="text-[11px] text-slate-600 dark:text-slate-300 cursor-pointer select-none font-medium"

              >

                Get free email updates?

              </label>

            </div>



            <button

              type="submit"

              className="w-full mt-1 py-2 px-3 bg-gradient-to-r from-teal-600 to-emerald-500 hover:from-teal-500 hover:to-emerald-400 text-white font-semibold rounded-lg text-xs shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-1.5 group cursor-pointer"

            >

              <span>Sign Up</span>

              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />

            </button>

          </form>



          {/* Footer Link: Using standard React Router Link */}

          <div className="mt-3 text-center text-[11px] text-slate-500 dark:text-slate-400">

            Already have an account?{' '}

            <Link

              to="/signin"

              className="text-teal-600 dark:text-teal-400 font-semibold hover:underline cursor-pointer"

            >

              Sign in Now

            </Link>

          </div>

        </div>



      </div>

    </div>

  );

} 

export default SignUp