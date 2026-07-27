import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import axios from "axios";
import { User, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';

const SignIn=({ onSuccess })=> {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    usernameOrEmail: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response=await axios.post('http://localhost:5000/api/login-user', formData,
        {withCredentials: true}
      );
      if (response.data.success) {
        toast.success('Logged in successfully!');
        navigate('/user_dashboard'); 
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Login failed!');
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-0 md:p-3 bg-white md:bg-slate-100/80 dark:bg-slate-900 md:dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors">
  <div className="w-full h-full min-h-screen md:min-h-0 md:max-w-3xl md:max-h-[88vh] bg-white dark:bg-slate-900 rounded-none md:rounded-2xl shadow-none md:shadow-xl border-none md:border md:border-slate-200/80 md:dark:border-slate-800 flex flex-col md:flex-row overflow-y-auto md:overflow-hidden">    
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
              Welcome back to your workspace.
            </p>
          </div>

          <div className="relative z-10 text-center md:text-left text-[11px] text-teal-100/80 pt-3 border-t border-white/15 mt-4 md:mt-0">
            <p>Access all your synchronized notes.</p>
          </div>
        </div>

        <div className="w-full md:w-7/12 p-4 sm:p-6 flex flex-col justify-center bg-white dark:bg-slate-900 overflow-y-auto">
          <div className="mb-4">
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              Sign In
            </h2>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Enter your details to sign in to your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-0.5 uppercase tracking-wider">
                Username / Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400">
                  <User size={14} />
                </div>
                <input
                  type="text"
                  name="usernameOrEmail"
                  value={formData.usernameOrEmail}
                  onChange={handleChange}
                  required
                  placeholder="Enter your username/email"
                  className="w-full pl-8 pr-2.5 py-1.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg text-xs outline-none text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:border-teal-500 focus:ring-1 focus:ring-teal-500/20"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-0.5">
                <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Password
                </label>
                <button
                  type="button"
                  className="text-[10px] font-medium text-teal-600 dark:text-teal-400 hover:underline"
                >
                  Having trouble in sign in?
                </button>
              </div>
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

            <button
              type="submit"
              className="w-full cursor-pointer mt-2 py-2 px-3 bg-gradient-to-r from-teal-600 to-emerald-500 hover:from-teal-500 hover:to-emerald-400 text-white font-semibold rounded-lg text-xs shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-1.5 group"
            >
              <span>Log In</span>
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </form>

          <div className="mt-4 text-center text-[11px] text-slate-500 dark:text-slate-400">
            Don't have an account?{' '}
            <button
              onClick={() => navigate('/signup')}
              className="text-teal-600 dark:text-teal-400 font-semibold hover:underline"
            >
              Signup Now
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
export default SignIn