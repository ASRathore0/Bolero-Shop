
import React from 'react';
import { Scissors, Star, Users, MapPin, ArrowRight, Settings, Image as ImageIcon, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ICON_MAP } from '../constants';
import { UserRole } from '../types';

export const LandingPage: React.FC<{ onBookNow: () => void }> = ({ onBookNow }) => {
  const { barbers, services, currentUser, gallery } = useApp();

  return (
    <div className="bg-white dark:bg-slate-950 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative min-h-[75vh] sm:h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=2074" 
            className="w-full h-full object-cover brightness-[0.3]"
            alt="Barbershop Atmosphere" 
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white py-12">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-playfair font-bold mb-4 sm:mb-6 leading-[1.1] animate-in fade-in slide-in-from-left-8 duration-700 tracking-tighter">
              Sharpen <br />Your Image.
            </h1>
            <p className="text-base sm:text-xl md:text-2xl text-slate-300 mb-8 sm:mb-10 leading-relaxed animate-in fade-in slide-in-from-left-12 duration-1000 font-medium">
              Premium grooming services from the city's most talented barbers. 
              Modern precision, classic comfort.
            </p>
            <div className="flex flex-col xs:flex-row space-y-4 xs:space-y-0 xs:space-x-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500">
              <button 
                onClick={onBookNow}
                className="px-6 py-4 sm:px-10 sm:py-5 bg-indigo-600 text-white rounded-2xl font-black text-sm sm:text-lg uppercase tracking-widest hover:bg-indigo-700 transition shadow-2xl shadow-indigo-600/30 flex items-center justify-center group active:scale-95"
              >
                Book Your Cut
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition" size={18} />
              </button>
              <button className="px-6 py-4 sm:px-10 sm:py-5 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-2xl font-black text-sm sm:text-lg uppercase tracking-widest hover:bg-white/20 transition active:scale-95">
                Our Gallery
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 sm:py-24 bg-slate-50 dark:bg-slate-900 transition-colors duration-300" id="services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">Professional Services</h2>
            <div className="w-16 h-1 bg-indigo-600 mx-auto rounded-full mb-6"></div>
            <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base max-w-2xl mx-auto font-medium">
              We offer a curated selection of grooming treatments performed by industry masters.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {services.map((service) => {
              const ServiceIcon = ICON_MAP[service.icon] || Scissors;
              return (
                <div key={service.id} className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all hover:-translate-y-2 group">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-indigo-50 dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <ServiceIcon size={24} />
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">{service.name}</h3>
                  <p className="text-slate-500 dark:text-slate-400 mb-6 text-xs sm:text-sm leading-relaxed font-medium line-clamp-3">{service.description}</p>
                  <div className="flex justify-between items-center pt-4 border-t border-slate-50 dark:border-slate-700">
                    <span className="text-indigo-600 dark:text-indigo-400 font-black text-lg">${service.price}</span>
                    <span className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-widest">{service.durationMinutes} min</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Luxury Gallery Section */}
      <section className="py-16 sm:py-24 bg-white dark:bg-slate-950 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
             <div className="flex items-center justify-center gap-2 mb-4">
               <Sparkles size={24} className="text-amber-500" />
               <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">The Studio Experience</h2>
             </div>
            <div className="w-16 h-1 bg-amber-500 mx-auto rounded-full mb-6"></div>
            <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base max-w-2xl mx-auto font-medium leading-relaxed">
              Step into a realm of luxury. Our studio features premium marble finishes, gold detailing, and signature halo-lit mirrors designed for the ultimate grooming experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gallery.map((img, idx) => (
              <div key={idx} className={`relative group overflow-hidden rounded-[2rem] border-4 border-slate-50 dark:border-slate-900 shadow-2xl transition-all hover:scale-[1.02] active:scale-95 ${idx === 0 ? 'lg:col-span-2 lg:row-span-2' : ''}`}>
                <img src={img} className="w-full h-full object-cover aspect-video sm:aspect-auto sm:h-full min-h-[300px]" alt={`Studio view ${idx + 1}`} />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                  <div className="text-white">
                    <p className="text-[10px] font-black uppercase tracking-widest text-amber-500 mb-1">Our Studio</p>
                    <h4 className="text-xl font-bold">Premium Workspace</h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Barbers Section - Updated with smaller image sizes and aspect ratio */}
      <section className="py-16 sm:py-24 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 sm:mb-16 text-center md:text-left">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">Master Barbers</h2>
              <div className="w-16 h-1 bg-indigo-600 mx-auto md:mx-0 rounded-full mb-6"></div>
              <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base max-w-xl font-medium">
                Our team represents the pinnacle of craftsmanship in the grooming industry.
              </p>
            </div>
            {currentUser?.role === UserRole.ADMIN && (
              <div className="mt-6 md:mt-0 flex items-center gap-2 px-6 py-3 bg-indigo-50 dark:bg-indigo-950 border border-indigo-100 dark:border-indigo-900 rounded-2xl text-indigo-600 dark:text-indigo-400 text-xs font-black uppercase tracking-widest animate-pulse">
                <Settings size={16} />
                Manage In Owner Panel
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {barbers.map((barber) => (
              <div key={barber.id} className="group cursor-pointer">
                {/* Image container changed from aspect-[3/4] to aspect-video (16:9) to reduce vertical size */}
                <div className="relative mb-3 rounded-2xl sm:rounded-[2rem] overflow-hidden aspect-video shadow-lg border-2 border-white dark:border-slate-800 transition-all group-hover:border-indigo-600/40">
                  <img src={barber.avatar} className="w-full h-full object-cover transition duration-700 group-hover:scale-105" alt={barber.name} />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="text-[8px] sm:text-[10px] uppercase tracking-[0.2em] font-black mb-0.5 opacity-80">Resident Expert</p>
                    <h3 className="text-base sm:text-lg font-black tracking-tight">{barber.name}</h3>
                  </div>
                </div>
                <div className="flex items-center justify-between px-1">
                  <div className="flex space-x-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} className={i < Math.floor(barber.rating || 0) ? 'fill-amber-400 text-amber-400' : 'text-slate-200 dark:text-slate-700'} />
                    ))}
                  </div>
                  <div className="flex gap-2">
                    {barber.specialties?.slice(0, 1).map(spec => (
                      <span key={spec} className="text-[9px] font-black uppercase tracking-widest text-slate-400 group-hover:text-indigo-600 transition-colors">{spec}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
