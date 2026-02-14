
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User, UserRole, Booking, BookingStatus, Service } from '../types';
import { BARBERS, SERVICES } from '../constants';

export interface Notification {
  id: string;
  userId: string;
  message: string;
  type: 'info' | 'success' | 'warning';
  timestamp: string;
  read: boolean;
}

interface AppContextType {
  currentUser: User | null;
  bookings: Booking[];
  barbers: User[];
  services: Service[];
  notifications: Notification[];
  theme: 'light' | 'dark';
  login: (role: UserRole) => void;
  logout: () => void;
  addBooking: (booking: Omit<Booking, 'id' | 'createdAt' | 'status'>) => boolean;
  updateBookingStatus: (id: string, status: BookingStatus) => void;
  addNotification: (userId: string, message: string, type: Notification['type']) => void;
  markNotificationsAsRead: () => void;
  toggleTheme: () => void;
  toggleBarberDayOff: (barberId: string, date: string) => void;
  addService: (service: Omit<Service, 'id'>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'bk-1',
    customerId: 'u1',
    barberId: 'b1',
    serviceId: 's1',
    date: new Date().toISOString().split('T')[0],
    timeSlot: '11:00 AM',
    status: BookingStatus.CONFIRMED,
    totalPrice: 35,
    createdAt: new Date().toISOString()
  }
];

const STORAGE_KEY_BARBERS = 'barberflow_barbers_v1';
const STORAGE_KEY_SERVICES = 'barberflow_services_v1';

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [barbers, setBarbers] = useState<User[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY_BARBERS);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error("Failed to parse barbers from storage", e);
        }
      }
    }
    // Default fallback: ensures offDays is initialized for all barbers
    return BARBERS.map(b => ({ ...b, offDays: b.offDays || [] }));
  });
  
  const [services, setServices] = useState<Service[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY_SERVICES);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error("Failed to parse services from storage", e);
        }
      }
    }
    return SERVICES;
  });
  
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') as 'light' | 'dark' || 
             (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    }
    return 'light';
  });

  // Effect: Handle Document Theme and LocalStorage
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Effect: Persist Barbers Database
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_BARBERS, JSON.stringify(barbers));
  }, [barbers]);

  // Effect: Persist Services Database
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_SERVICES, JSON.stringify(services));
  }, [services]);

  // Effect: Sync Active Session with Barbers Database
  // This ensures that when a barber updates their profile/offDays, 
  // the 'currentUser' state (the logged in session) is updated immediately.
  useEffect(() => {
    if (currentUser && currentUser.role === UserRole.BARBER) {
      const updatedBarberData = barbers.find(b => b.id === currentUser.id);
      if (updatedBarberData) {
        // Only update if data has actually changed to prevent infinite loops
        const currentOffDays = JSON.stringify(currentUser.offDays || []);
        const newOffDays = JSON.stringify(updatedBarberData.offDays || []);
        
        if (currentOffDays !== newOffDays) {
          setCurrentUser({ ...currentUser, ...updatedBarberData });
        }
      }
    }
  }, [barbers, currentUser]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const login = (role: UserRole) => {
    // For demo: automatically log in as the first barber 'b1' if BARBER role is selected
    const barberSource = barbers.find(b => b.id === 'b1');
    
    const mockUser: User = {
      id: role === UserRole.BARBER ? 'b1' : (role === UserRole.ADMIN ? 'admin-1' : 'u1'),
      name: role === UserRole.BARBER ? barberSource?.name || 'Marco Rossi' : (role === UserRole.ADMIN ? 'Salon Manager' : 'Alex Customer'),
      email: `${role.toLowerCase()}@example.com`,
      role,
      avatar: role === UserRole.BARBER ? barberSource?.avatar || '' : `https://picsum.photos/seed/${role}/200`,
      specialties: role === UserRole.BARBER ? barberSource?.specialties : undefined,
      rating: role === UserRole.BARBER ? barberSource?.rating : undefined,
      earnings: role === UserRole.BARBER ? barberSource?.earnings : undefined,
      offDays: role === UserRole.BARBER ? barberSource?.offDays || [] : [],
    };
    setCurrentUser(mockUser);
  };

  const logout = () => setCurrentUser(null);

  const addNotification = (userId: string, message: string, type: Notification['type'] = 'info') => {
    const newNote: Notification = {
      id: Math.random().toString(36).substr(2, 9),
      userId,
      message,
      type,
      timestamp: new Date().toISOString(),
      read: false
    };
    setNotifications(prev => [newNote, ...prev]);
  };

  const markNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const toggleBarberDayOff = (barberId: string, date: string) => {
    setBarbers(prev => prev.map(b => {
      if (b.id === barberId) {
        const offDays = b.offDays || [];
        const newOffDays = offDays.includes(date) 
          ? offDays.filter(d => d !== date)
          : [...offDays, date];
        
        return { ...b, offDays: newOffDays };
      }
      return b;
    }));
  };

  const addBooking = (newBooking: Omit<Booking, 'id' | 'createdAt' | 'status'>): boolean => {
    const barber = barbers.find(b => b.id === newBooking.barberId);
    
    // Strict check: Prevent double booking or booking on off-days
    if (barber?.offDays?.includes(newBooking.date)) {
      return false;
    }

    const isTaken = bookings.some(b => 
      b.barberId === newBooking.barberId && 
      b.date === newBooking.date && 
      b.timeSlot === newBooking.timeSlot &&
      b.status !== BookingStatus.CANCELLED
    );

    if (isTaken) return false;

    const booking: Booking = {
      ...newBooking,
      id: `bk-${Math.random().toString(36).substr(2, 9)}`,
      status: BookingStatus.PENDING,
      createdAt: new Date().toISOString()
    };

    setBookings(prev => [...prev, booking]);
    addNotification('admin-1', `New booking for ${newBooking.date} at ${newBooking.timeSlot}`, 'info');
    return true;
  };

  const updateBookingStatus = (id: string, status: BookingStatus) => {
    const booking = bookings.find(b => b.id === id);
    if (!booking) return;

    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
    
    if (status === BookingStatus.CONFIRMED) {
      addNotification(booking.customerId, `BarberFlow: Your booking for ${booking.timeSlot} on ${booking.date} is CONFIRMED! See you then.`, 'success');
    } else if (status === BookingStatus.CANCELLED) {
      addNotification(booking.customerId, `BarberFlow Alert: Your booking for ${booking.timeSlot} on ${booking.date} was cancelled.`, 'warning');
    }
  };

  const addService = (newService: Omit<Service, 'id'>) => {
    const service: Service = {
      ...newService,
      id: `s-${Math.random().toString(36).substr(2, 9)}`,
    };
    setServices(prev => [...prev, service]);
    addNotification('admin-1', `New service "${newService.name}" added to the salon menu.`, 'success');
  };

  return (
    <AppContext.Provider value={{
      currentUser,
      bookings,
      barbers,
      services,
      notifications,
      theme,
      login,
      logout,
      addBooking,
      updateBookingStatus,
      addNotification,
      markNotificationsAsRead,
      toggleTheme,
      toggleBarberDayOff,
      addService
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
