
import React from 'react';
import { useApp } from '../context/AppContext.tsx';
import { Calendar, Clock, History, Scissors, AlertCircle, Bell, Smartphone, XCircle } from 'lucide-react';
import { BookingStatus, Booking } from '../types.ts';

interface CustomerDashboardProps {
  onBookNew: () => void;
}

export const CustomerDashboard: React.FC<CustomerDashboardProps> = ({ onBookNew }) => {
  const { bookings, barbers, services, currentUser, notifications, updateBookingStatus } = useApp();
  
  const customerBookings = bookings.filter(b => b.customerId === currentUser?.id);
  const myNotifications = notifications.filter(n => n.userId === currentUser?.id);
  const upcomingBookings = customerBookings.filter(b => b.status === BookingStatus.CONFIRMED || b.status === BookingStatus.PENDING);
  const pastBookings = customerBookings.filter(b => b.status === BookingStatus.COMPLETED || b.status === BookingStatus.CANCELLED);

  const getService = (id: string) => services.find(s => s.id === id);
  const getBarber = (id: string) => barbers.find(b => b.id === id);

  const handleCancelBooking = (bookingId: string) => {
    if (window.confirm("Are you sure you want to cancel this appointment? This action cannot be undone.")) {
      updateBookingStatus(bookingId, BookingStatus.CANCELLED);
    }
  };

  const BookingCard: React.FC<{ booking: Booking; isPast?: boolean }> = ({ booking, isPast }) => {
    const service = getService(booking.serviceId);
    const barber = getBarber(booking.barberId);

    return (
      <div className={`p-6 rounded-2xl border transition-all ${
        isPast 
          ? 'bg-slate-50 dark:bg-slate-900/50 border-slate-100 dark:border-slate-800 opacity-60' 
          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm'
      } flex flex-col md:flex-row md:items-center justify-between gap-6`}>
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl">
            <Scissors size={24} />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white text-lg">{service?.name}</h4>
            <p className="text-slate-500 dark:text-slate-400 text-sm">with <span className="text-slate-900 dark:text-slate-200 font-semibold">{barber?.name}</span></p>
            <div className="flex items-center mt-2 space-x-4 text-xs text-slate-400 dark:text-slate-500 font-medium">
              <span className="flex items-center"><Calendar size={14} className="mr-1" /> {booking.date}</span>
              <span className="flex items-center"><Clock size={14} className="mr-1" /> {booking.timeSlot}</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col items-end gap-3">
          <div className="flex items-center gap-2">
            {!isPast && (
              <button 
                onClick={() => handleCancelBooking(booking.id)}
                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors group"
                title="Cancel Appointment"
              >
                <XCircle size={18} />
              </button>
            )}
            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
              booking.status === BookingStatus.CONFIRMED ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
              booking.status === BookingStatus.PENDING ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400' :
              booking.status === BookingStatus.CANCELLED ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400' :
              'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
            }`}>
              {booking.status}
            </span>
          </div>
          <span className="text-xl font-bold text-slate-900 dark:text-white">${booking.totalPrice}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 transition-colors duration-300">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">My Dashboard</h1>
          <p className="text-slate-500 dark:text-slate-400">Manage your bookings and view your notifications.</p>
        </div>
        <button 
          onClick={onBookNew}
          className="flex items-center space-x-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 cursor-pointer shadow-lg shadow-indigo-100 dark:shadow-none transition-all active:scale-95 outline-none focus:ring-4 focus:ring-indigo-500/30"
        >
          <Calendar size={18} />
          <span>Book New Appointment</span>
        </button>
      </div>

      <div className="space-y-12">
        {/* Notifications / SMS Alerts Section */}
        {myNotifications.length > 0 && (
          <section className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-2 mb-6 text-indigo-600 dark:text-indigo-400">
              <Smartphone size={20} />
              <h2 className="text-xl font-bold">Recent Updates (SMS/App)</h2>
            </div>
            <div className="space-y-4">
              {myNotifications.slice(0, 3).map(note => (
                <div key={note.id} className={`p-4 rounded-2xl flex items-start gap-4 transition-all ${
                  note.type === 'success' ? 'bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800' :
                  'bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700'
                }`}>
                  <div className={`p-2 rounded-full ${
                    note.type === 'success' ? 'bg-green-500 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                  }`}>
                    <Bell size={14} />
                  </div>
                  <div className="flex-grow">
                    <p className={`text-sm font-medium ${note.type === 'success' ? 'text-green-800 dark:text-green-200' : 'text-slate-700 dark:text-slate-300'}`}>
                      {note.message}
                    </p>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-bold tracking-wider">
                      {new Date(note.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <section>
          <div className="flex items-center space-x-2 mb-6 text-slate-900 dark:text-white">
            <Calendar className="text-indigo-600 dark:text-indigo-400" size={20} />
            <h2 className="text-xl font-bold">Upcoming Sessions</h2>
          </div>
          {upcomingBookings.length > 0 ? (
            <div className="grid gap-4">
              {upcomingBookings.map(b => <BookingCard key={b.id} booking={b} />)}
            </div>
          ) : (
            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-12 text-center border-2 border-dashed border-slate-200 dark:border-slate-800">
              <AlertCircle className="mx-auto text-slate-300 dark:text-slate-700 mb-3" size={32} />
              <p className="text-slate-500 dark:text-slate-400 font-medium">No upcoming appointments scheduled.</p>
            </div>
          )}
        </section>

        <section>
          <div className="flex items-center space-x-2 mb-6 text-slate-900 dark:text-white">
            <History className="text-slate-400 dark:text-slate-600" size={20} />
            <h2 className="text-xl font-bold">Past Grooming</h2>
          </div>
          <div className="grid gap-4">
            {pastBookings.length > 0 ? (
              pastBookings.map(b => <BookingCard key={b.id} booking={b} isPast />)
            ) : (
              <p className="text-slate-500 dark:text-slate-400 text-sm">Your booking history will appear here after your first visit.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};
