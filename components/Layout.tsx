
import React from 'react';
import { useApp } from '../context/AppContext';
import { Scissors, LogOut, Moon, Sun, User, UserCheck, Shield } from 'lucide-react';
import { UserRole } from '../types';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser, logout, login, theme, toggleTheme } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <nav className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-indigo-600 rounded-lg text-white">
                <Scissors size={20} className="sm:w-6 sm:h-6" />
              </div>
              <span className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">BarberFlow</span>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4">
              <button 
                onClick={toggleTheme}
                className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
                title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              >
                {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
              </button>

              {!currentUser ? (
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <button 
                    onClick={() => login(UserRole.CUSTOMER)}
                    className="flex items-center gap-1.5 px-2 py-1.5 sm:px-3 sm:py-2 text-slate-600 dark:text-slate-400 hover:text-indigo-600 transition font-bold text-[10px] sm:text-xs"
                  >
                    <User size={14} className="sm:hidden" />
                    <span className="hidden sm:inline">Customer</span>
                    <span className="sm:hidden">User</span>
                  </button>
                  <button 
                    onClick={() => login(UserRole.BARBER)}
                    className="flex items-center gap-1.5 px-2 py-1.5 sm:px-3 sm:py-2 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-lg font-bold text-[10px] sm:text-xs hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                  >
                    <UserCheck size={14} />
                    <span className="hidden sm:inline">Barber</span>
                    <span className="sm:hidden">Staff</span>
                  </button>
                  <button 
                    onClick={() => login(UserRole.ADMIN)}
                    className="flex items-center gap-1.5 px-2 py-1.5 sm:px-3 sm:py-2 bg-slate-900 dark:bg-white dark:text-slate-900 text-white rounded-lg font-bold text-[10px] sm:text-xs hover:bg-slate-800 transition shadow-sm"
                  >
                    <Shield size={14} />
                    <span className="hidden sm:inline">Owner</span>
                    <span className="sm:hidden">Admin</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-2 sm:space-x-6">
                  <div className="flex items-center space-x-2">
                    <span className="hidden sm:inline text-sm text-slate-500 dark:text-slate-400 font-medium">
                      Hi, <span className="font-bold text-slate-900 dark:text-white">{currentUser.name.split(' ')[0]}</span>
                    </span>
                    <span className="px-2 py-0.5 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 text-[8px] sm:text-[10px] font-black uppercase rounded border border-indigo-100 dark:border-indigo-900/50 tracking-tighter sm:tracking-normal">
                      {currentUser.role}
                    </span>
                  </div>
                  <button 
                    onClick={logout}
                    className="p-2 text-slate-400 hover:text-red-500 transition"
                    title="Logout"
                  >
                    <LogOut size={18} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-8 sm:py-12 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="sm:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Scissors className="text-indigo-600" size={20} />
                <span className="text-lg font-bold dark:text-white">BarberFlow</span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm max-w-sm leading-relaxed">
                Elevate your grooming experience with the city's finest barbers. 
                Modern style meets traditional craftsmanship.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-slate-900 dark:text-white text-sm uppercase tracking-widest">Salon</h4>
              <ul className="space-y-2 text-slate-500 dark:text-slate-400 text-sm font-medium">
                <li><a href="#" className="hover:text-indigo-600 transition">Our Services</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition">Master Barbers</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition">User Reviews</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-slate-900 dark:text-white text-sm uppercase tracking-widest">Connect</h4>
              <ul className="space-y-2 text-slate-500 dark:text-slate-400 text-sm font-medium">
                <li><a href="#" className="hover:text-indigo-600 transition">Instagram</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition">Facebook</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition">Contact Us</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 sm:mt-12 pt-8 border-t border-slate-100 dark:border-slate-800 text-center text-slate-400 text-[10px] font-bold uppercase tracking-widest">
            © 2024 BarberFlow. Designed for Excellence.
          </div>
        </div>
      </footer>
    </div>
  );
};
