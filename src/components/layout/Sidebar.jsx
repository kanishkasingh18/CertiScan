import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { STUDENT_NAV_ITEMS, ADMIN_NAV_ITEMS } from '../../constants/navigationLinks';
import {
  LayoutDashboard,
  UploadCloud,
  History,
  User,
  Settings,
  HelpCircle,
  ShieldCheck,
  FileText,
  X,
  Lock
} from 'lucide-react';
import { cn } from '../../utils/cn';

const iconMap = {
  LayoutDashboard,
  UploadCloud,
  History,
  User,
  Settings,
  HelpCircle,
  ShieldCheck,
  FileText,
};

export const Sidebar = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const navItems = user?.role === 'ADMIN' ? ADMIN_NAV_ITEMS : STUDENT_NAV_ITEMS;

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      {/* Dark Luxury Gradient Sidebar Panel */}
      <aside
        className={cn(
          'fixed lg:sticky top-16 z-40 h-[calc(100vh-4rem)] bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950 text-slate-300 border-r border-slate-800/90 transition-all duration-300 flex flex-col justify-between overflow-y-auto select-none',
          'w-64',
          isOpen ? 'left-0' : '-left-64 lg:left-0'
        )}
      >
        {/* Navigation Items Group */}
        <div className="p-4 space-y-6">
          {/* Mobile Header Close */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 lg:hidden">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-heading">
              Menu Navigation
            </span>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div>
            <p className="px-3 text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2.5 font-heading">
              Main Navigation
            </p>
            <nav className="space-y-1.5">
              {navItems.map((item) => {
                const IconComponent = iconMap[item.icon] || FileText;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={onClose}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 group',
                        isActive
                          ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white font-semibold shadow-lg shadow-blue-900/40'
                          : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                      )
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <div
                          className={cn(
                            'w-7.5 h-7.5 rounded-lg flex items-center justify-center shrink-0 transition-colors',
                            isActive
                              ? 'bg-blue-700/60 text-white'
                              : 'bg-slate-800/90 text-slate-400 group-hover:text-slate-200 group-hover:bg-slate-700'
                          )}
                        >
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <span className="font-heading">{item.label}</span>
                      </>
                    )}
                  </NavLink>
                );
              })}
            </nav>
          </div>

          {/* Floating Glass Help Card */}
          <div className="p-4 rounded-2xl bg-slate-800/60 backdrop-blur-md border border-slate-700/60 text-slate-300 space-y-2">
            <h4 className="text-xs font-bold text-white flex items-center gap-1.5 font-heading">
              <Lock className="w-3.5 h-3.5 text-blue-400" />
              Document Protection
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Every uploaded file is protected using 256-bit isolation protocols.
            </p>
            <NavLink
              to="/help"
              onClick={onClose}
              className="inline-flex text-[11px] font-semibold text-blue-400 hover:text-blue-300 underline pt-1"
            >
              View Security Guidelines →
            </NavLink>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-950/40">
          <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium">
            <span>CertiScan Portal</span>
            <span className="flex items-center gap-1 text-emerald-400 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Operational
            </span>
          </div>
        </div>
      </aside>
    </>
  );
};
