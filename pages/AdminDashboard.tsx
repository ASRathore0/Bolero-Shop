
import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Settings, Users, Scissors, DollarSign, TrendingUp, Download, Star, Plus, X, Zap, Droplets, Wind, User, Clock } from 'lucide-react';
import { ICON_MAP } from '../constants.tsx';

const REVENUE_DATA = [
  { month: 'Jan', revenue: 4500 },
  { month: 'Feb', revenue: 5200 },
  { month: 'Mar', revenue: 6100 },
  { month: 'Apr', revenue: 5800 },
  { month: 'May', revenue: 7200 },
  { month: 'Jun', revenue: 8500 },
];

const SERVICE_SHARE = [
  { name: 'Haircuts', value: 45 },
  { name: 'Beard Trims', value: 30 },
  { name: 'Shaves', value: 15 },
  { name: 'Facials', value: 10 },
];

const COLORS = ['#4f46e5', '#6366f1', '#818cf8', '#a5b4fc'];

const ICON_OPTIONS = [
  { name: 'Scissors', icon: Scissors },
  { name: 'Zap', icon: Zap },
  { name: 'Droplets', icon: Droplets },
  { name: 'Wind', icon: Wind },
  { name: 'User', icon: User },
];

export const AdminDashboard: React.FC = () => {
  const { barbers, services, bookings, theme, addService } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newService, setNewService] = useState({
    name: '',
    description: '',
    price: 30,
    durationMinutes: 45,
    icon: 'Scissors'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addService(newService);
    setIsModalOpen(false);
    setNewService({
      name: '',
      description: '',
      price: 30,
      durationMinutes: 45,
      icon: 'Scissors'
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 transition-colors duration-300">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 font-playfair">Salon Overview</h1>
          <p className="text-slate-500 dark:text-slate-400">Master control for BarberFlow Salon #1</p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-100 dark:shadow-none"
          >
            <Plus size={18} />
            <span>Add Service</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition">
            <Download size={18} />
            <span>Export</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm transition-all hover:shadow-md">
          <DollarSign className="text-indigo-600 dark:text-indigo-400 mb-4" size={24} />
          <div className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">Total Monthly Sales</div>
          <div className="text-3xl font-bold text-slate-900 dark:text-white">$24,450</div>
          <div className="mt-2 flex items-center text-xs text-green-500 dark:text-green-400 font-bold">
            <TrendingUp size={12} className="mr-1" /> +12% vs last month
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm transition-all hover:shadow-md">
          <Users className="text-blue-500 dark:text-blue-400 mb-4" size={24} />
          <div className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">Active Staff</div>
          <div className="text-3xl font-bold text-slate-900 dark:text-white">{barbers.length} Barbers</div>
          <div className="mt-2 text-xs text-slate-400 dark:text-slate-500 font-medium">All currently online</div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm transition-all hover:shadow-md">
          <Scissors className="text-amber-500 dark:text-amber-400 mb-4" size={24} />
          <div className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">Bookings Today</div>
          <div className="text-3xl font-bold text-slate-900 dark:text-white">{bookings.length} Bookings</div>
          <div className="mt-2 text-xs text-slate-400 dark:text-slate-500 font-medium">4 spots still available</div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm transition-all hover:shadow-md">
          <Settings className="text-slate-500 dark:text-slate-400 mb-4" size={24} />
          <div className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">Active Services</div>
          <div className="text-3xl font-bold text-slate-900 dark:text-white">{services.length} Items</div>
          <div className="mt-2 text-xs text-indigo-600 dark:text-indigo-400 font-bold hover:underline cursor-pointer">Manage Menu</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <section className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden min-w-0">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Revenue Growth</h2>
          <div className="h-80 w-full min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%" debounce={50}>
              <LineChart data={REVENUE_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme === 'dark' ? '#1e293b' : '#f1f5f9'} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: theme === 'dark' ? '#475569' : '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: theme === 'dark' ? '#475569' : '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{
                    borderRadius: '16px', 
                    border: 'none', 
                    backgroundColor: theme === 'dark' ? '#0f172a' : '#fff',
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                    color: theme === 'dark' ? '#f8fafc' : '#1e293b'
                  }} 
                />
                <Line type="monotone" dataKey="revenue" stroke="#4f46e5" strokeWidth={4} dot={{r: 6, fill: '#4f46e5', strokeWidth: 2, stroke: theme === 'dark' ? '#0f172a' : '#fff'}} activeDot={{r: 8}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden min-w-0">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Service Distribution</h2>
          <div className="h-80 w-full min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%" debounce={50}>
              <PieChart>
                <Pie
                  data={SERVICE_SHARE}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={8}
                  dataKey="value"
                  stroke="none"
                >
                  {SERVICE_SHARE.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    borderRadius: '16px', 
                    border: 'none', 
                    backgroundColor: theme === 'dark' ? '#0f172a' : '#fff',
                    color: theme === 'dark' ? '#f8fafc' : '#1e293b'
                  }}
                />
                <Legend iconType="circle" wrapperStyle={{paddingTop: '20px', color: theme === 'dark' ? '#94a3b8' : '#64748b'}} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      <section className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Active Service Menu</h2>
          <div className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest">{services.length} Total Services</div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div key={service.id} className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700 hover:border-indigo-500/50 transition-colors group">
               <div className="flex justify-between items-start mb-6">
                 <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
                   {/* Map icon string to component */}
                   {(() => {
                     const IconComp = ICON_MAP[service.icon] || Scissors;
                     return <IconComp size={22} className="text-indigo-600 dark:text-indigo-400" />;
                   })()}
                 </div>
                 <div className="text-right">
                   <div className="font-bold text-slate-900 dark:text-white text-xl tracking-tight">${service.price}</div>
                   <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{service.durationMinutes} min</div>
                 </div>
               </div>
               
               <div className="flex items-center gap-2 mb-2">
                 <h3 className="font-bold text-slate-900 dark:text-white text-lg group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">
                   {service.name}
                 </h3>
               </div>
               
               <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Add Service Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-white dark:bg-slate-900 w-full max-w-xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 fade-in duration-300">
            <div className="p-8 sm:p-10">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-playfair">New Service</h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Expand your salon's professional offerings.</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Service Name</label>
                    <input 
                      required
                      type="text"
                      placeholder="e.g. Skin Fade"
                      value={newService.name}
                      onChange={e => setNewService({...newService, name: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition dark:text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Price ($)</label>
                    <input 
                      required
                      type="number"
                      min="0"
                      value={newService.price}
                      onChange={e => setNewService({...newService, price: Number(e.target.value)})}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition dark:text-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Description</label>
                  <textarea 
                    required
                    placeholder="Briefly describe what this service includes..."
                    value={newService.description}
                    onChange={e => setNewService({...newService, description: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition dark:text-white min-h-[100px] resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <Clock size={12} /> Duration (mins)
                    </label>
                    <input 
                      required
                      type="number"
                      min="5"
                      step="5"
                      value={newService.durationMinutes}
                      onChange={e => setNewService({...newService, durationMinutes: Number(e.target.value)})}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition dark:text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Visual Icon</label>
                    <div className="flex gap-2">
                      {ICON_OPTIONS.map(opt => (
                        <button
                          key={opt.name}
                          type="button"
                          onClick={() => setNewService({...newService, icon: opt.name})}
                          className={`flex-1 flex items-center justify-center p-3 rounded-xl border transition ${newService.icon === opt.name ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600' : 'border-slate-200 dark:border-slate-700 text-slate-400'}`}
                        >
                          <opt.icon size={20} />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 transition shadow-xl shadow-indigo-100 dark:shadow-none mt-4 transform active:scale-[0.98]"
                >
                  Confirm & Launch Service
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
