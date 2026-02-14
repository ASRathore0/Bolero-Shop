
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  DollarSign, 
  Users, 
  Star, 
  Calendar as CalendarIcon, 
  Send, 
  Sparkles, 
  ToggleLeft, 
  ToggleRight, 
  Coffee, 
  Award, 
  ShieldCheck, 
  ExternalLink,
  MapPin,
  Briefcase,
  ChevronRight,
  BellRing,
  Lock,
  CalendarX
} from 'lucide-react';
import { BookingStatus } from '../types.ts';
import { TIME_SLOTS } from '../constants.tsx';

const MOCK_DATA = [
  { name: 'Mon', revenue: 240 },
  { name: 'Tue', revenue: 380 },
  { name: 'Wed', revenue: 320 },
  { name: 'Thu', revenue: 450 },
  { name: 'Fri', revenue: 590 },
  { name: 'Sat', revenue: 840 },
  { name: 'Sun', revenue: 150 },
];

export const BarberDashboard: React.FC = () => {
  const { bookings, services, currentUser, updateBookingStatus, theme, toggleBarberDayOff } = useApp();
  const [viewDate, setViewDate] = useState(new Date().toISOString().split('T')[0]);
  const [toast, setToast] = useState<{ message: string; show: boolean; sub?: string }>({ message: '', show: false });
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [justConfirmedId, setJustConfirmedId] = useState<string | null>(null);
  
  const agendaRef = useRef<HTMLElement>(null);
  const myBookings = bookings.filter(b => b.barberId === currentUser?.id);
  const getService = (id: string) => services.find(s => s.id === id);

  const isDayOff = currentUser?.offDays?.includes(viewDate);

  // Auto-hide toast
  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => setToast({ ...toast, show: false }), 5000);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  const handleDateClick = (date: string) => {
    setViewDate(date);
    agendaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleConfirm = async (id: string, clientName: string) => {
    setProcessingId(id);
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    updateBookingStatus(id, BookingStatus.CONFIRMED);
    setJustConfirmedId(id);
    
    setToast({ 
      message: "Booking Approved!", 
      sub: `Confirmation SMS & notification dispatched.`,
      show: true 
    });
    
    setProcessingId(null);
    setTimeout(() => setJustConfirmedId(null), 3000);
  };

  const handleToggleDayOff = () => {
    if (!currentUser) return;
    const hasBookings = myBookings.some(b => b.date === viewDate && b.status !== BookingStatus.CANCELLED);
    if (!isDayOff && hasBookings) {
      if (!confirm("Confirm rest day? Existing bookings will remain but no new ones can be made.")) return;
    }
    toggleBarberDayOff(currentUser.id, viewDate);
    setToast({
      message: isDayOff ? "Schedule Opened" : "Schedule Paused",
      sub: isDayOff ? "New slots are bookable." : "Public calendar blocked.",
      show: true
    });
  };

  const calendarDays = useMemo(() => {
    const days = [];
    const today = new Date();
    for (let i = 0; i < 30; i++) {
      const d = new Date();
      d.setDate(today.getDate() + i);
      days.push(d.toISOString().split('T')[0]);
    }
    return days;
  }, []);

  const dayBookings = myBookings.filter(b => b.date === viewDate);

  const StatCard = ({ title, value, sub, icon: Icon, color }: any) => (
    <div className="bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2.5 sm:p-3 rounded-2xl ${color}`}>
          <Icon size={20} className="text-white sm:w-[24px] sm:h-[24px]" />
        </div>
        <span className="text-[8px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest">{title}</span>
      </div>
      <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-1">{value}</div>
      <div className="text-[10px] text-slate-500 font-bold">{sub}</div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 transition-colors duration-300 relative">
      {/* Toast - Optimized for Mobile */}
      {toast.show && (
        <div className="fixed bottom-4 sm:bottom-8 left-4 right-4 sm:left-auto sm:right-8 z-[100] animate-in slide-in-from-bottom-8 fade-in duration-500">
          <div className="bg-slate-900/95 dark:bg-white/95 backdrop-blur-md text-white dark:text-slate-900 px-5 py-4 rounded-2xl sm:rounded-[2rem] shadow-2xl flex items-center space-x-4 border border-slate-800 dark:border-slate-200 min-w-0 sm:min-w-[320px] overflow-hidden">
            <div className="bg-indigo-600 p-2.5 rounded-full flex-shrink-0">
              <BellRing size={16} className="text-white animate-bounce" />
            </div>
            <div className="flex-grow overflow-hidden">
              <p className="font-black text-xs sm:text-sm tracking-tight truncate">{toast.message}</p>
              <p className="text-[8px] sm:text-[10px] opacity-70 font-bold uppercase tracking-widest truncate mt-0.5">{toast.sub}</p>
            </div>
            <button onClick={() => setToast({ ...toast, show: false })} className="opacity-50">
              <XCircle size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Profile Card - Mobile Optimized (Stacks Vertical) */}
      <div className="mb-8 sm:mb-12 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 blur-3xl -z-10 rounded-[3rem]"></div>
        <div className="bg-white dark:bg-slate-900 rounded-3xl sm:rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-80 bg-slate-50/50 dark:bg-slate-800/30 p-6 sm:p-8 border-r border-slate-100 dark:border-slate-800 flex flex-col items-center text-center">
              <div className="relative mb-6">
                <img 
                  src={currentUser?.avatar} 
                  alt={currentUser?.name} 
                  className="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl sm:rounded-[2.5rem] object-cover ring-4 sm:ring-8 ring-white dark:ring-slate-900 shadow-2xl"
                />
                <div className="absolute -bottom-2 -right-2 bg-green-500 px-3 py-1 rounded-full border-2 sm:border-4 border-white dark:border-slate-900 flex items-center gap-1.5 shadow-lg">
                  <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                  <span className="text-[8px] font-black text-white uppercase tracking-tighter">Active</span>
                </div>
              </div>
              <div className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 rounded-2xl text-base sm:text-lg font-black border border-amber-100 dark:border-amber-900/30">
                <Star size={16} className="fill-amber-600" />
                {currentUser?.rating || "4.9"}
              </div>
            </div>

            <div className="flex-grow p-6 sm:p-10">
              <div className="flex flex-col h-full justify-between">
                <div className="mb-8">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div>
                      <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                        {currentUser?.name}
                        <ShieldCheck size={24} className="text-indigo-500 shrink-0" />
                      </h1>
                      <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mt-1">Master Artisan</p>
                    </div>
                    <button className="w-full sm:w-auto px-6 py-3 bg-indigo-600 text-white rounded-2xl text-xs font-bold shadow-lg hover:bg-indigo-700 active:scale-95 transition">
                      Edit Profile
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {currentUser?.specialties?.map((spec) => (
                      <span key={spec} className="px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-[10px] font-black uppercase tracking-widest rounded-xl">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 border-t border-slate-100 dark:border-slate-800 pt-6">
                  {[
                    { l: 'Cuts', v: '1.2k+' },
                    { l: 'Retention', v: '98%' },
                    { l: 'Avg Time', v: '45m' },
                    { l: 'Rank', v: '#1' }
                  ].map(stat => (
                    <div key={stat.l}>
                      <div className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">{stat.v}</div>
                      <div className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{stat.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
        <StatCard title="Today" value={myBookings.filter(b => b.date === new Date().toISOString().split('T')[0]).length} sub="Scheduled sessions" icon={Clock} color="bg-indigo-600" />
        <StatCard title="Sales" value={`$${currentUser?.earnings || 0}`} sub="Total revenue" icon={DollarSign} color="bg-green-500" />
        <StatCard title="Clients" value="142" sub="Unique visitors" icon={Users} color="bg-blue-500" />
        <StatCard title="Score" value={currentUser?.rating || "4.9"} sub="Client satisfaction" icon={Star} color="bg-amber-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Calendar - Tightened for Mobile */}
          <section className="bg-white dark:bg-slate-900 p-4 sm:p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center">
              <CalendarIcon className="mr-2 text-indigo-600" size={18} />
              Schedule Management
            </h2>
            <div className="grid grid-cols-7 gap-1 sm:gap-2">
              {calendarDays.map((date) => {
                const dateObj = new Date(date);
                const isSelected = date === viewDate;
                const dateOff = currentUser?.offDays?.includes(date);
                return (
                  <button
                    key={date}
                    onClick={() => handleDateClick(date)}
                    className={`flex flex-col items-center p-2 sm:p-3 rounded-xl sm:rounded-2xl border transition-all ${
                      isSelected 
                        ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20' 
                        : 'border-slate-50 dark:border-slate-800 bg-white dark:bg-slate-900'
                    } ${dateOff ? 'opacity-50' : ''}`}
                  >
                    <span className={`text-[8px] uppercase font-black ${isSelected ? 'text-indigo-600' : 'text-slate-400'}`}>
                      {dateObj.toLocaleDateString('en-US', { weekday: 'short' })}
                    </span>
                    <span className={`text-base sm:text-xl font-black ${isSelected ? 'text-indigo-600' : (dateOff ? 'text-rose-500' : 'text-slate-900 dark:text-slate-100')}`}>
                      {dateObj.getDate()}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Agenda */}
          <section id="daily-agenda" ref={agendaRef} className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm scroll-mt-24">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-xl text-white ${isDayOff ? 'bg-rose-500' : 'bg-indigo-600'}`}>
                  {isDayOff ? <CalendarX size={20} /> : <CalendarIcon size={20} />}
                </div>
                <div>
                  <h2 className="text-xl font-black text-slate-900 dark:text-white">Daily Agenda</h2>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{new Date(viewDate).toLocaleDateString('en-US', { dateStyle: 'medium' })}</p>
                </div>
              </div>
              <button 
                onClick={handleToggleDayOff}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors ${isDayOff ? 'bg-rose-50 dark:bg-rose-900/20 text-rose-600' : 'bg-slate-50 dark:bg-slate-800 text-slate-400'}`}
              >
                {isDayOff ? 'Rest Day Active' : 'Set Rest Day'}
                {isDayOff ? <ToggleRight size={24} className="text-rose-500" /> : <ToggleLeft size={24} />}
              </button>
            </div>

            <div className="space-y-3">
              {TIME_SLOTS.map((slot) => {
                const booking = dayBookings.find(b => b.timeSlot === slot && b.status !== BookingStatus.CANCELLED);
                const service = booking ? getService(booking.serviceId) : null;
                return (
                  <div key={slot} className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${booking ? 'bg-indigo-50/30 dark:bg-indigo-900/10 border-indigo-100 dark:border-indigo-900' : 'bg-slate-50/50 dark:bg-slate-900/50 border-slate-100 dark:border-slate-800 opacity-60'}`}>
                    <div className="flex items-center gap-4">
                      <span className="text-[10px] sm:text-xs font-black text-slate-500 w-16 sm:w-20">{slot}</span>
                      {booking ? (
                        <div>
                          <p className="text-xs sm:text-sm font-black text-slate-900 dark:text-white tracking-tight">{service?.name}</p>
                          <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Conf. Required</p>
                        </div>
                      ) : (
                        <span className="text-[9px] font-black text-slate-300 uppercase italic">Vacant</span>
                      )}
                    </div>
                    {booking && booking.status === BookingStatus.PENDING && (
                      <button 
                        onClick={() => handleConfirm(booking.id, 'Client')}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest active:scale-95 transition"
                      >
                        Approve
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* Desktop Sidebar (Optional/Secondary on Mobile) */}
        <div className="space-y-8">
          <section className="bg-slate-900 p-8 rounded-[2rem] text-white">
            <h3 className="text-lg font-black mb-6 flex items-center gap-2">
              <Sparkles size={20} className="text-indigo-400" />
              Barber Insights
            </h3>
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <p className="text-[9px] font-black text-indigo-400 uppercase mb-2">Trend Report</p>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">Friday slots are 90% full. Expect a busy shift with high referral potential.</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
