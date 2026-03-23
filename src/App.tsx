/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Coffee, 
  Menu as MenuIcon, 
  X, 
  Instagram, 
  Facebook, 
  Twitter, 
  MapPin, 
  Phone, 
  Clock, 
  Star, 
  ChevronRight,
  MessageCircle
} from 'lucide-react';

// --- Types ---
interface MenuItem {
  id: number;
  name: string;
  price: string;
  description: string;
  category: 'Coffee' | 'Beverages' | 'Snacks' | 'Desserts';
}

interface Testimonial {
  id: number;
  name: string;
  text: string;
  rating: number;
  image: string;
}

// --- Data ---
const MENU_ITEMS: MenuItem[] = [
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

const TESTIMONIALS: Testimonial[] = [
  { id: 1, name: "Sarah Jenkins", text: "The ambiance here is unmatched. It's my favorite spot for morning meetings and quiet reading.", rating: 5, image: "https://picsum.photos/seed/sarah/100/100" },
  { id: 2, name: "Michael Chen", text: "Best espresso in the city. The baristas really know their craft. Highly recommended!", rating: 5, image: "https://picsum.photos/seed/michael/100/100" },
  { id: 3, name: "Elena Rodriguez", text: "The truffle grilled cheese is a game changer. And the coffee? Pure perfection.", rating: 4, image: "https://picsum.photos/seed/elena/100/100" },
];

const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1559925393-8be0ec41b50b?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&q=80&w=800",
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
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Menu', href: '#menu' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Book Table', href: '#reservation' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'glass-nav py-3 shadow-sm' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#home" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-coffee-dark rounded-full flex items-center justify-center text-cream group-hover:bg-coffee-light transition-colors">
            <Coffee size={20} />
          </div>
          <span className={`text-xl font-serif font-bold tracking-tight ${isScrolled ? 'text-coffee-dark' : 'text-white'}`}>
            Urban Brew <span className="text-coffee-accent">Café</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className={`text-sm font-medium tracking-wide transition-colors hover:text-coffee-accent ${isScrolled ? 'text-coffee-dark' : 'text-white'}`}
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#reservation" 
            className="bg-coffee-dark text-cream px-6 py-2 rounded-full text-sm font-semibold hover:bg-coffee-light transition-all shadow-lg hover:shadow-coffee-dark/20"
          >
            Reserve Now
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className={`md:hidden p-2 ${isScrolled ? 'text-coffee-dark' : 'text-white'}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-cream border-b border-coffee-dark/10 p-6 md:hidden shadow-xl"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="text-lg font-serif text-coffee-dark hover:text-coffee-accent"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="#reservation" 
                className="bg-coffee-dark text-cream text-center py-3 rounded-lg font-semibold"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Book a Table
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=2000" 
          alt="Café Interior" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-coffee-accent uppercase tracking-[0.3em] text-sm font-bold mb-4 block">
            Crafted with Passion
          </span>
          <h1 className="text-5xl md:text-8xl text-white font-serif mb-6 leading-tight">
            Experience the <br />
            <span className="italic text-coffee-accent">Perfect Brew</span>
          </h1>
          <p className="text-cream/80 text-lg md:text-xl mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            Welcome to Urban Brew, where every cup tells a story of artisanal roasting, 
            premium beans, and a cozy ambiance designed for your comfort.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="#menu" 
              className="w-full sm:w-auto bg-coffee-accent text-coffee-dark px-10 py-4 rounded-full font-bold text-lg hover:bg-cream transition-all hover:scale-105 shadow-xl"
            >
              View Menu
            </a>
            <a 
              href="#reservation" 
              className="w-full sm:w-auto border-2 border-white text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-coffee-dark transition-all hover:scale-105"
            >
              Book a Table
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-white/50 rounded-full"></div>
        </div>
      </motion.div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=1000" 
              alt="Barista working" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-coffee-dark rounded-2xl p-8 text-cream hidden lg:flex flex-col justify-center shadow-2xl">
            <span className="text-4xl font-serif mb-2">12+</span>
            <p className="text-sm uppercase tracking-widest font-bold opacity-70">Years of Brewing Excellence</p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-coffee-light font-bold uppercase tracking-widest text-sm mb-4 block">Our Story</span>
          <h2 className="text-4xl md:text-5xl font-serif text-coffee-dark mb-8 leading-tight">
            Where Luxury Meets <br />
            <span className="italic">Artisanal Coffee</span>
          </h2>
          <p className="text-soft-black/70 text-lg mb-6 leading-relaxed">
            Founded in 2012, Urban Brew Café started with a simple vision: to create a sanctuary 
            for coffee lovers. We believe that coffee is more than just a beverage; it's an 
            experience that engages all the senses.
          </p>
          <p className="text-soft-black/70 text-lg mb-10 leading-relaxed">
            From our hand-picked single-origin beans to our locally sourced organic ingredients, 
            every detail is meticulously curated to provide you with the premium quality you deserve 
            in an atmosphere that feels like home.
          </p>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="font-serif text-xl text-coffee-dark mb-2">Premium Quality</h4>
              <p className="text-sm text-soft-black/60">Sourced from the finest high-altitude plantations.</p>
            </div>
            <div>
              <h4 className="font-serif text-xl text-coffee-dark mb-2">Cozy Ambiance</h4>
              <p className="text-sm text-soft-black/60">Designed for relaxation and meaningful connections.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState<'Coffee' | 'Beverages' | 'Snacks' | 'Desserts'>('Coffee');
  const categories: ('Coffee' | 'Beverages' | 'Snacks' | 'Desserts')[] = ['Coffee', 'Beverages', 'Snacks', 'Desserts'];

  const filteredItems = MENU_ITEMS.filter(item => item.category === activeCategory);

  return (
    <section id="menu" className="py-24 bg-beige/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-coffee-light font-bold uppercase tracking-widest text-sm mb-4 block">Our Menu</span>
          <h2 className="text-4xl md:text-5xl font-serif text-coffee-dark mb-6">Curated Selection</h2>
          <div className="w-24 h-1 bg-coffee-accent mx-auto"></div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-3 rounded-full text-sm font-bold transition-all ${
                activeCategory === cat 
                  ? 'bg-coffee-dark text-cream shadow-lg' 
                  : 'bg-white text-coffee-dark hover:bg-coffee-accent/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <motion.div 
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-coffee-dark/5 group"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-serif text-coffee-dark group-hover:text-coffee-accent transition-colors">{item.name}</h3>
                  <span className="text-coffee-light font-bold">{item.price}</span>
                </div>
                <p className="text-soft-black/60 text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

const Gallery = () => {
  return (
    <section id="gallery" className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-coffee-light font-bold uppercase tracking-widest text-sm mb-4 block">Visual Journey</span>
          <h2 className="text-4xl md:text-5xl font-serif text-coffee-dark mb-6">Our Sanctuary</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY_IMAGES.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative aspect-square overflow-hidden rounded-2xl shadow-lg cursor-pointer"
            >
              <img 
                src={img} 
                alt={`Gallery ${idx}`} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-coffee-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-cream/20 backdrop-blur-md flex items-center justify-center text-cream">
                  <ChevronRight size={24} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Reservation = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    time: '',
    guests: '2'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Reservation request sent for ${formData.name} on ${formData.date} at ${formData.time}. We will contact you shortly!`);
  };

  return (
    <section id="reservation" className="py-24 bg-coffee-dark relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 border border-cream rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 border border-cream rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-coffee-accent font-bold uppercase tracking-widest text-sm mb-4 block">Reservations</span>
          <h2 className="text-4xl md:text-5xl font-serif text-cream mb-8 leading-tight">
            Book Your <br />
            <span className="italic text-coffee-accent">Private Table</span>
          </h2>
          <p className="text-cream/70 text-lg mb-10 leading-relaxed">
            Planning a special morning or a quiet afternoon? Reserve your spot 
            to ensure the best experience. For groups larger than 8, please contact 
            us directly.
          </p>
          <div className="flex items-center gap-6">
            <a 
              href="https://wa.me/1234567890" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-green-600 text-white px-8 py-4 rounded-full font-bold hover:bg-green-700 transition-all shadow-xl"
            >
              <MessageCircle size={20} />
              WhatsApp Us
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-cream p-10 rounded-3xl shadow-2xl"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-coffee-dark/60">Full Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="John Doe"
                  className="w-full bg-beige/30 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-coffee-accent outline-none"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-coffee-dark/60">Phone Number</label>
                <input 
                  type="tel" 
                  required
                  placeholder="+1 (555) 000-0000"
                  className="w-full bg-beige/30 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-coffee-accent outline-none"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-coffee-dark/60">Date</label>
                <input 
                  type="date" 
                  required
                  className="w-full bg-beige/30 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-coffee-accent outline-none"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-coffee-dark/60">Time</label>
                <input 
                  type="time" 
                  required
                  className="w-full bg-beige/30 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-coffee-accent outline-none"
                  value={formData.time}
                  onChange={(e) => setFormData({...formData, time: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-coffee-dark/60">Guests</label>
                <select 
                  className="w-full bg-beige/30 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-coffee-accent outline-none"
                  value={formData.guests}
                  onChange={(e) => setFormData({...formData, guests: e.target.value})}
                >
                  {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} {n === 1 ? 'Person' : 'People'}</option>)}
                </select>
              </div>
            </div>
            <button 
              type="submit" 
              className="w-full bg-coffee-dark text-cream py-4 rounded-xl font-bold text-lg hover:bg-coffee-light transition-all shadow-lg"
            >
              Confirm Booking
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  return (
    <section className="py-24 bg-beige/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-coffee-light font-bold uppercase tracking-widest text-sm mb-4 block">Testimonials</span>
          <h2 className="text-4xl md:text-5xl font-serif text-coffee-dark mb-6">What Our Guests Say</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-10 rounded-3xl shadow-sm border border-coffee-dark/5 relative"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className={i < t.rating ? "fill-coffee-accent text-coffee-accent" : "text-gray-300"} />
                ))}
              </div>
              <p className="text-soft-black/70 italic mb-8 leading-relaxed">"{t.text}"</p>
              <div className="flex items-center gap-4">
                <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                <span className="font-serif text-lg text-coffee-dark">{t.name}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Info */}
          <div className="lg:col-span-1 space-y-12">
            <div>
              <h2 className="text-4xl font-serif text-coffee-dark mb-8">Visit Us</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-coffee-accent/20 rounded-full flex items-center justify-center text-coffee-dark shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-coffee-dark">Location</h4>
                    <p className="text-soft-black/60">123 Espresso Lane, Brew City, BC 54321</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-coffee-accent/20 rounded-full flex items-center justify-center text-coffee-dark shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-coffee-dark">Phone</h4>
                    <p className="text-soft-black/60">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-coffee-accent/20 rounded-full flex items-center justify-center text-coffee-dark shrink-0">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-coffee-dark">Hours</h4>
                    <p className="text-soft-black/60">Mon - Fri: 7am - 8pm</p>
                    <p className="text-soft-black/60">Sat - Sun: 8am - 9pm</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex gap-4">
              <a href="#" className="w-12 h-12 bg-coffee-dark text-cream rounded-full flex items-center justify-center hover:bg-coffee-accent transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-12 h-12 bg-coffee-dark text-cream rounded-full flex items-center justify-center hover:bg-coffee-accent transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-12 h-12 bg-coffee-dark text-cream rounded-full flex items-center justify-center hover:bg-coffee-accent transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Map */}
          <div className="lg:col-span-2 h-[500px] rounded-3xl overflow-hidden shadow-xl border-8 border-white">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1422937611493!2d-73.98731968459391!3d40.75889497932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1625565000000!5m2!1sen!2sus" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-soft-black text-cream py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-coffee-accent rounded-full flex items-center justify-center text-coffee-dark">
                <Coffee size={16} />
              </div>
              <span className="text-2xl font-serif font-bold tracking-tight">
                Urban Brew <span className="text-coffee-accent">Café</span>
              </span>
            </div>
            <p className="text-cream/50 max-w-sm leading-relaxed">
              Crafting premium coffee experiences since 2012. Join us for your daily 
              dose of inspiration and the perfect artisanal brew.
            </p>
          </div>
          
          <div>
            <h4 className="font-serif text-xl mb-6">Quick Links</h4>
            <ul className="space-y-4 text-cream/60">
              <li><a href="#home" className="hover:text-coffee-accent transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-coffee-accent transition-colors">About Us</a></li>
              <li><a href="#menu" className="hover:text-coffee-accent transition-colors">Menu</a></li>
              <li><a href="#reservation" className="hover:text-coffee-accent transition-colors">Reservations</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-xl mb-6">Newsletter</h4>
            <p className="text-sm text-cream/50 mb-4">Get updates on new blends and events.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-white/10 border-none rounded-lg px-4 py-2 flex-grow outline-none focus:ring-1 focus:ring-coffee-accent"
              />
              <button className="bg-coffee-accent text-coffee-dark px-4 py-2 rounded-lg font-bold hover:bg-cream transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-cream/40">
          <p>© 2026 Urban Brew Café. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-cream transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-cream transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Menu />
      <Gallery />
      <Reservation />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}
