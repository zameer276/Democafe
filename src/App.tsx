/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Menu as MenuIcon, 
  X, 
  Instagram, 
  Facebook, 
  Twitter, 
  MapPin, 
  Phone, 
  Clock, 
  ArrowRight,
  ChevronDown,
  ArrowUpRight
} from 'lucide-react';

// --- Data ---
const MENU_ITEMS = [
  { id: 1, name: "Signature Espresso", price: "$4.50", description: "Rich, full-bodied double shot of our house blend.", category: 'Coffee' },
  { id: 2, name: "Caramel Macchiato", price: "$5.75", description: "Freshly steamed milk with vanilla-flavored syrup marked with espresso.", category: 'Coffee' },
  { id: 3, name: "Vanilla Bean Latte", price: "$5.50", description: "Smooth espresso with steamed milk and Madagascar vanilla.", category: 'Coffee' },
  { id: 4, name: "Matcha Green Tea Latte", price: "$6.00", description: "Premium ceremonial grade matcha with creamy milk.", category: 'Beverages' },
  { id: 5, name: "Hibiscus Iced Tea", price: "$4.25", description: "Refreshing herbal tea with notes of citrus and berries.", category: 'Beverages' },
  { id: 6, name: "Artisan Avocado Toast", price: "$12.50", description: "Sourdough bread, mashed avocado, chili flakes, and poached egg.", category: 'Snacks' },
  { id: 7, name: "Truffle Grilled Cheese", price: "$14.00", description: "Three-cheese blend with truffle oil on brioche.", category: 'Snacks' },
  { id: 8, name: "Dark Chocolate Fondant", price: "$9.50", description: "Warm chocolate cake with a molten center and vanilla bean ice cream.", category: 'Desserts' },
  { id: 9, name: "Classic Tiramisu", price: "$8.75", description: "Layers of coffee-soaked ladyfingers and mascarpone cream.", category: 'Desserts' },
];

const TESTIMONIALS = [
  { id: 1, name: "Sarah Jenkins", text: "The ambiance here is unmatched. It's my favorite spot for morning meetings and quiet reading.", role: "Creative Director" },
  { id: 2, name: "Michael Chen", text: "Best espresso in the city. The baristas really know their craft. Highly recommended!", role: "Food Critic" },
];

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Menu', href: '#menu' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${isScrolled ? 'bg-paper/90 backdrop-blur-md border-b border-ink/5 py-4' : 'bg-transparent py-8'}`}>
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex justify-between items-center">
        <div className="flex items-center gap-12">
          <a href="#home" className="group">
            <span className={`text-xl font-serif font-medium tracking-tighter ${isScrolled ? 'text-ink' : 'text-paper'}`}>
              URBAN <span className="italic text-gold">BREW</span>
            </span>
          </a>
          
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className={`text-[10px] uppercase tracking-[0.25em] font-sans font-semibold transition-all hover:text-gold ${isScrolled ? 'text-ink/60' : 'text-paper/60'}`}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-8">
          <a 
            href="#reservation" 
            className={`hidden md:block text-[10px] uppercase tracking-[0.25em] font-bold transition-all border-b pb-1 ${isScrolled ? 'text-ink border-ink/20 hover:border-gold hover:text-gold' : 'text-paper border-paper/20 hover:border-gold hover:text-gold'}`}
          >
            Reservations
          </a>
          
          <button 
            className={`p-2 transition-colors ${isScrolled ? 'text-ink' : 'text-paper'}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-charcoal z-[60] flex flex-col justify-center items-center text-center"
          >
            <button 
              className="absolute top-8 right-8 text-paper p-4 hover:rotate-90 transition-transform"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X size={32} />
            </button>
            
            <div className="flex flex-col gap-8">
              {navLinks.map((link, i) => (
                <motion.a 
                  key={link.name} 
                  href={link.href} 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-5xl md:text-7xl font-serif text-paper hover:text-gold transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.a 
                href="#reservation" 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-8 text-gold text-sm uppercase tracking-[0.4em] font-bold"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Book a Table
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section id="home" className="relative h-screen flex flex-col lg:flex-row overflow-hidden bg-charcoal">
      {/* Left Pane - Text Content */}
      <div className="relative z-10 w-full lg:w-1/2 h-full flex items-center px-6 md:px-12 lg:px-24 pt-20">
        <div className="max-w-xl">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-gold uppercase tracking-[0.5em] text-[10px] font-bold mb-12 block">
              Est. 2012 — Artisanal Roastery
            </span>
            <h1 className="text-display text-paper mb-12">
              The Art of <br />
              <span className="italic text-gold">Prestige</span>
            </h1>
            <p className="text-paper/50 text-lg font-body font-light leading-relaxed mb-16 max-w-md">
              A sanctuary for the discerning palate. We blend tradition with modern 
              craft to bring you an unparalleled coffee experience.
            </p>
            <div className="flex items-center gap-12">
              <a href="#menu" className="btn-gold">Explore Menu</a>
              <a href="#about" className="group flex items-center gap-3 text-paper text-[11px] uppercase tracking-[0.3em] font-bold">
                Our Story <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
              </a>
            </div>
          </motion.div>
        </div>
        
        {/* Vertical Rail Text */}
        <div className="absolute left-8 bottom-12 hidden lg:block">
          <span className="vertical-text text-[9px] uppercase tracking-[0.6em] text-paper/20 font-bold">
            SCROLL TO EXPLORE — URBAN BREW CAFE
          </span>
        </div>
      </div>

      {/* Right Pane - Image Content */}
      <div className="relative w-full lg:w-1/2 h-full overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=2000" 
            alt="Café Interior" 
            className="w-full h-full object-cover opacity-80"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-transparent to-transparent"></div>
        </motion.div>
        
        {/* Floating Feature Bubble */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: -6 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="absolute bottom-24 right-24 hidden xl:flex flex-col items-center justify-center w-48 h-48 rounded-full bg-paper outline outline-1 outline-ink/10 p-8 text-center shadow-2xl"
        >
          <span className="text-gold text-3xl font-serif mb-2">100%</span>
          <span className="text-[10px] uppercase tracking-widest font-bold text-ink/40">Organic Arabica</span>
        </motion.div>
      </div>

      <motion.div 
        style={{ opacity }}
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-paper/20 lg:hidden"
      >
        <ChevronDown size={24} />
      </motion.div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="section-padding bg-paper">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div className="relative">
            <div className="grid grid-cols-2 gap-6">
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="pt-24"
              >
                <img 
                  src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=800" 
                  alt="Barista Craft" 
                  className="oval-mask"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: -40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=80&w=800" 
                  alt="Coffee Beans" 
                  className="oval-mask"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            </div>
            
            {/* Decorative Element */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-ink/5 rounded-full"></div>
          </div>

          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-gold uppercase tracking-[0.4em] text-[10px] font-bold mb-8 block">Our Philosophy</span>
              <h2 className="text-5xl md:text-7xl mb-12 leading-[1.1]">
                Crafting <span className="italic">Moments</span> <br />
                of Pure Refinement.
              </h2>
              <div className="space-y-8 max-w-xl">
                <p className="text-ink/60 font-body leading-relaxed text-lg">
                  Urban Brew isn't just a café; it's a labor of love. We source our beans 
                  directly from sustainable farms in Ethiopia and Colombia, ensuring 
                  every sip supports the community that grew it.
                </p>
                <p className="text-ink/60 font-body leading-relaxed">
                  Our space is designed to be your third home—a place between work and 
                  life where you can find inspiration, connection, or simply a 
                  perfectly balanced espresso.
                </p>
                <div className="pt-8 flex items-center gap-12">
                  <div className="flex flex-col">
                    <span className="text-4xl font-serif text-ink">12+</span>
                    <span className="text-[9px] uppercase tracking-widest font-bold text-ink/40">Years of Craft</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-4xl font-serif text-ink">24k</span>
                    <span className="text-[9px] uppercase tracking-widest font-bold text-ink/40">Happy Guests</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('Coffee');
  const categories = ['Coffee', 'Beverages', 'Snacks', 'Desserts'];

  return (
    <section id="menu" className="section-padding bg-charcoal text-paper">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 mb-32">
          <div className="max-w-2xl">
            <span className="text-gold uppercase tracking-[0.4em] text-[10px] font-bold mb-8 block">The Selection</span>
            <h2 className="text-6xl md:text-8xl italic font-light mb-0">Curated Menu</h2>
          </div>
          
          <div className="flex flex-wrap gap-8 border-b border-paper/10 pb-4 w-full lg:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-[10px] uppercase tracking-[0.3em] font-bold transition-all relative pb-4 ${
                  activeCategory === cat 
                    ? 'text-gold' 
                    : 'text-paper/40 hover:text-paper'
                }`}
              >
                {cat}
                {activeCategory === cat && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 w-full h-[1px] bg-gold"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-x-32 gap-y-16">
          <AnimatePresence mode="wait">
            {MENU_ITEMS.filter(i => i.category === activeCategory).map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: idx * 0.05 }}
                className="group flex flex-col gap-4"
              >
                <div className="flex justify-between items-end border-b border-paper/5 pb-4 group-hover:border-gold/30 transition-colors">
                  <h3 className="text-2xl md:text-3xl font-serif group-hover:text-gold transition-colors">{item.name}</h3>
                  <span className="text-lg font-serif text-gold">{item.price}</span>
                </div>
                <p className="text-paper/30 font-body text-sm font-light max-w-md">{item.description}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        <div className="mt-32 text-center">
          <a href="#reservation" className="btn-luxury border-paper/20 text-paper hover:bg-paper hover:text-charcoal">
            Book a Table to Experience
          </a>
        </div>
      </div>
    </section>
  );
};

const Gallery = () => {
  const images = [
    "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=80&w=800",
  ];

  return (
    <section id="gallery" className="section-padding bg-paper overflow-hidden">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex flex-col items-center text-center mb-24">
          <span className="text-gold uppercase tracking-[0.5em] text-[10px] font-bold mb-8 block">Visual Journey</span>
          <h2 className="text-5xl md:text-7xl mb-0">The Atmosphere</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {images.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`relative overflow-hidden group aspect-[4/5] ${idx % 2 === 1 ? 'lg:mt-24' : ''}`}
            >
              <img 
                src={img} 
                alt="Gallery" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-charcoal/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Instagram className="text-paper" size={32} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Reservation = () => {
  return (
    <section id="reservation" className="section-padding bg-charcoal text-paper relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] border border-gold rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] border border-gold rounded-full"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <span className="text-gold uppercase tracking-[0.5em] text-[10px] font-bold mb-8 block">Reservations</span>
          <h2 className="text-6xl md:text-8xl italic mb-8">Secure a Table</h2>
          <p className="text-paper/40 font-body font-light max-w-md mx-auto">
            Join us for an unforgettable experience. We recommend booking at least 24 hours in advance.
          </p>
        </div>

        <form className="grid md:grid-cols-2 gap-12">
          <div className="space-y-4">
            <label className="text-[9px] uppercase tracking-[0.3em] font-bold text-paper/30 ml-2">Full Name</label>
            <input 
              type="text" 
              className="w-full bg-transparent border-b border-paper/10 px-2 py-4 focus:border-gold outline-none transition-colors font-serif text-xl"
              placeholder="Your name"
            />
          </div>
          <div className="space-y-4">
            <label className="text-[9px] uppercase tracking-[0.3em] font-bold text-paper/30 ml-2">Phone Number</label>
            <input 
              type="tel" 
              className="w-full bg-transparent border-b border-paper/10 px-2 py-4 focus:border-gold outline-none transition-colors font-serif text-xl"
              placeholder="+1 (555) 000-0000"
            />
          </div>
          <div className="space-y-4">
            <label className="text-[9px] uppercase tracking-[0.3em] font-bold text-paper/30 ml-2">Date</label>
            <input 
              type="date" 
              className="w-full bg-transparent border-b border-paper/10 px-2 py-4 focus:border-gold outline-none transition-colors font-serif text-xl appearance-none"
            />
          </div>
          <div className="space-y-4">
            <label className="text-[9px] uppercase tracking-[0.3em] font-bold text-paper/30 ml-2">Guests</label>
            <select className="w-full bg-transparent border-b border-paper/10 px-2 py-4 focus:border-gold outline-none transition-colors font-serif text-xl appearance-none">
              <option className="bg-charcoal">2 Guests</option>
              <option className="bg-charcoal">4 Guests</option>
              <option className="bg-charcoal">6+ Guests</option>
            </select>
          </div>
          <div className="md:col-span-2 pt-12">
            <button type="button" className="w-full btn-gold py-6 text-sm tracking-[0.5em]">
              Request Reservation
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="section-padding bg-paper">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-32 items-center">
          <div>
            <span className="text-gold uppercase tracking-[0.5em] text-[10px] font-bold mb-8 block">Contact</span>
            <h2 className="text-6xl md:text-8xl mb-20">Find <span className="italic">Us</span></h2>
            
            <div className="space-y-16">
              <div className="flex gap-12">
                <div className="w-12 h-12 rounded-full border border-ink/10 flex items-center justify-center shrink-0">
                  <MapPin size={20} className="text-gold" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-[10px] uppercase tracking-[0.3em] mb-4 text-ink/40">Location</h4>
                  <p className="text-2xl font-serif">123 Espresso Lane, <br />Brew City, BC 54321</p>
                </div>
              </div>
              
              <div className="flex gap-12">
                <div className="w-12 h-12 rounded-full border border-ink/10 flex items-center justify-center shrink-0">
                  <Clock size={20} className="text-gold" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-[10px] uppercase tracking-[0.3em] mb-4 text-ink/40">Hours</h4>
                  <div className="space-y-2">
                    <p className="text-xl font-serif">Mon - Fri: 07:00 — 20:00</p>
                    <p className="text-xl font-serif">Sat - Sun: 08:00 — 21:00</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-24 flex gap-8">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="text-ink/40 hover:text-gold transition-colors">
                  <Icon size={24} />
                </a>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-square rounded-full overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 shadow-2xl border-[20px] border-paper">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1422937611493!2d-73.98731968459391!3d40.75889497932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1625565000000!5m2!1sen!2sus" 
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            {/* Decorative Label */}
            <div className="absolute -bottom-8 -right-8 bg-gold text-paper px-8 py-8 rounded-full flex flex-col items-center justify-center shadow-2xl rotate-12">
              <span className="text-[10px] uppercase tracking-widest font-bold">Visit</span>
              <ArrowUpRight size={24} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-24 bg-charcoal text-paper">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 border-b border-paper/5 pb-24 mb-12">
          <div className="space-y-6">
            <span className="text-2xl font-serif font-medium tracking-tighter">
              URBAN <span className="italic text-gold">BREW</span>
            </span>
            <p className="text-paper/30 max-w-xs text-sm font-body font-light">
              Elevating the coffee experience through artisanal craft and refined ambiance.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-16">
            <div className="space-y-4">
              <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-gold">Explore</h4>
              <div className="flex flex-col gap-2 text-sm text-paper/50">
                <a href="#about" className="hover:text-paper transition-colors">Our Story</a>
                <a href="#menu" className="hover:text-paper transition-colors">Menu</a>
                <a href="#gallery" className="hover:text-paper transition-colors">Gallery</a>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-gold">Connect</h4>
              <div className="flex flex-col gap-2 text-sm text-paper/50">
                <a href="#" className="hover:text-paper transition-colors">Instagram</a>
                <a href="#" className="hover:text-paper transition-colors">Facebook</a>
                <a href="#" className="hover:text-paper transition-colors">Twitter</a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[9px] uppercase tracking-[0.4em] text-paper/20 font-bold">
            © 2026 Crafted with Passion — All Rights Reserved
          </p>
          <div className="flex gap-12 text-[9px] uppercase tracking-[0.4em] font-bold text-paper/20">
            <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gold transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const Testimonials = () => {
  return (
    <section className="py-32 bg-paper border-y border-ink/5">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <span className="text-gold uppercase tracking-[0.5em] text-[10px] font-bold mb-12 block">Voices</span>
        <div className="space-y-12">
          {TESTIMONIALS.map((t, i) => (
            <motion.div 
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className={i === 0 ? "block" : "hidden md:block"}
            >
              <p className="text-3xl md:text-5xl font-serif italic leading-tight mb-8 text-ink/80">
                "{t.text}"
              </p>
              <div className="flex flex-col items-center">
                <span className="text-sm font-sans font-bold uppercase tracking-widest">{t.name}</span>
                <span className="text-[10px] uppercase tracking-widest text-ink/30 mt-1">{t.role}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function App() {
  return (
    <div className="bg-paper selection:bg-gold selection:text-paper overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Menu />
      <Gallery />
      <Testimonials />
      <Reservation />
      <Contact />
      <Footer />
    </div>
  );
}
