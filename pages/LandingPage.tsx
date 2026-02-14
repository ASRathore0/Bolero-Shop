
import React from 'react';
import { Scissors, Star, Users, MapPin, ArrowRight } from 'lucide-react';
import { SERVICES, BARBERS, ICON_MAP } from '../constants';

export const LandingPage: React.FC<{ onBookNow: () => void }> = ({ onBookNow }) => {
  return (
    <div className="bg-white dark:bg-slate-950 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] sm:h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/barbershop-hero/1920/1080" 
            className="w-full h-full object-cover brightness-[0.3]"
            alt="Barbershop Atmosphere" 
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white py-12">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-playfair font-bold mb-4 sm:mb-6 leading-[1.1] animate-in fade-in slide-in-from-left-8 duration-700">
              Sharpen <br />Your Image.
            </h1>
            <p className="text-base sm:text-xl md:text-2xl text-slate-300 mb-8 sm:mb-10 leading-relaxed animate-in fade-in slide-in-from-left-12 duration-1000">
              Premium grooming services from the city's most talented barbers. 
              Modern precision, classic comfort.
            </p>
            <div className="flex flex-col xs:flex-row space-y-4 xs:space-y-0 xs:space-x-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500">
              <button 
                onClick={onBookNow}
                className="px-6 py-4 sm:px-10 sm:py-5 bg-indigo-600 text-white rounded-2xl font-bold text-lg sm:text-xl hover:bg-indigo-700 transition shadow-2xl shadow-indigo-600/30 flex items-center justify-center group"
              >
                Book Your Cut
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition" />
              </button>
              <button className="px-6 py-4 sm:px-10 sm:py-5 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-2xl font-bold text-lg sm:text-xl hover:bg-white/20 transition">
                Our Gallery
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-slate-900 dark:bg-slate-950 py-8 sm:py-12 border-y border-slate-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
            <div>
              <div className="text-2xl sm:text-4xl font-bold text-white mb-1 sm:mb-2">12k+</div>
              <div className="text-slate-500 text-[10px] sm:text-xs uppercase tracking-widest font-black">Happy Clients</div>
            </div>
            <div>
              <div className="text-2xl sm:text-4xl font-bold text-white mb-1 sm:mb-2">15</div>
              <div className="text-slate-500 text-[10px] sm:text-xs uppercase tracking-widest font-black">Expert Barbers</div>
            </div>
            <div>
              <div className="text-2xl sm:text-4xl font-bold text-white mb-1 sm:mb-2">4.9/5</div>
              <div className="text-slate-500 text-[10px] sm:text-xs uppercase tracking-widest font-black">Avg Rating</div>
            </div>
            <div>
              <div className="text-2xl sm:text-4xl font-bold text-white mb-1 sm:mb-2">10+</div>
              <div className="text-slate-500 text-[10px] sm:text-xs uppercase tracking-widest font-black">Years Exp.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 sm:py-24 bg-slate-50 dark:bg-slate-900 transition-colors duration-300" id="services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">Our Services</h2>
            <div className="w-16 h-1 bg-indigo-600 mx-auto rounded-full mb-6"></div>
            <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
              We offer a wide range of premium grooming services designed to make you look and feel your absolute best.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {SERVICES.map((service) => {
              const ServiceIcon = ICON_MAP[service.icon] || Scissors;
              return (
                <div key={service.id} className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all hover:-translate-y-2 group">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-indigo-50 dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <ServiceIcon size={24} className="sm:w-[28px] sm:h-[28px]" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">{service.name}</h3>
                  <p className="text-slate-500 dark:text-slate-400 mb-6 text-sm leading-relaxed">{service.description}</p>
                  <div className="flex justify-between items-center pt-4 border-t border-slate-50 dark:border-slate-700">
                    <span className="text-indigo-600 dark:text-indigo-400 font-bold">${service.price}</span>
                    <span className="text-slate-400 dark:text-slate-500 text-xs font-bold uppercase">{service.durationMinutes} min</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Barbers Section */}
      <section className="py-16 sm:py-24 bg-white dark:bg-slate-950 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">Master Barbers</h2>
            <div className="w-16 h-1 bg-indigo-600 mx-auto rounded-full mb-6"></div>
            <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
              Meet our team of artisans. Each master barber brings years of experience and a unique artistic vision.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
            {BARBERS.map((barber) => (
              <div key={barber.id} className="group cursor-pointer">
                <div className="relative mb-4 sm:mb-6 rounded-3xl overflow-hidden aspect-[3/4]">
                  <img src={barber.avatar} className="w-full h-full object-cover transition duration-700 group-hover:scale-110" alt={barber.name} />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                  <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 text-white">
                    <p className="text-[10px] uppercase tracking-widest font-black mb-1 opacity-80">Master Barber</p>
                    <h3 className="text-xl sm:text-2xl font-bold">{barber.name}</h3>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className={i < Math.floor(barber.rating || 0) ? 'fill-amber-400 text-amber-400' : 'text-slate-200 dark:text-slate-700'} />
                    ))}
                  </div>
                  <span className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-widest hover:text-indigo-600 dark:hover:text-indigo-400 transition">Profile</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
