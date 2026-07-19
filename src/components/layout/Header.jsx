import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, ShieldCheck, Bell } from 'lucide-react';
import { ProfileDropdown } from './ProfileDropdown';
import { SearchBar } from '../common/SearchBar';

export const Header = ({ onToggleSidebar }) => {
  return (
    <header className="sticky top-0 z-30 h-16 bg-white/85 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 flex items-center justify-between gap-4">
      {/* Left: Mobile Toggle & Portal Branding */}
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors lg:hidden"
          aria-label="Toggle navigation sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <Link to="/dashboard" className="flex items-center gap-3 group">
          <div className="w-9.5 h-9.5 rounded-xl bg-gradient-to-br from-blue-900 via-indigo-900 to-blue-800 text-white flex items-center justify-center font-bold shadow-md shadow-blue-900/20 group-hover:scale-105 transition-all">
            <ShieldCheck className="w-5.5 h-5.5 text-blue-400" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold text-slate-900 tracking-tight font-heading flex items-center gap-1.5">
              CertiScan
              <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded-full bg-blue-50 text-blue-700 border border-blue-200/80 shadow-2xs">
                Portal
              </span>
            </span>
            <span className="text-[10px] text-slate-400 font-medium hidden sm:inline-block">
              Secure Document Verification Gateway
            </span>
          </div>
        </Link>
      </div>

      {/* Middle: Search Bar */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
        <SearchBar placeholder="Search reference ID, document name..." onChange={() => {}} />
      </div>

      {/* Right: Notifications & Profile */}
      <div className="flex items-center gap-3">
        <button
          className="relative p-2 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors"
          aria-label="View notifications"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-600 ring-2 ring-white animate-pulse" />
        </button>

        <div className="h-6 w-px bg-slate-200/90 hidden sm:block" />

        <ProfileDropdown />
      </div>
    </header>
  );
};
