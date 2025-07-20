import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, X, Search, Crown, Sparkles } from 'lucide-react'
import MetalRates from '../MetalRates/MetalRates'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className="relative">
        <header className="bg-gradient-to-r from-gold-50 to-amber-50 shadow-lg border-b border-gold-200">
            {/* Metal rates ticker */}
            <div className="bg-gradient-to-r from-gold-500 to-amber-500 py-2 text-white">
                <div className="container mx-auto">
                    <MetalRates />
                </div>
            </div>

            <div className="container mx-auto px-4 py-4">
                {/* Top section with logo, search, and mobile menu button */}
                <div className="flex justify-between items-center">
                    <div className="logo flex items-center gap-3">
                        <div className="relative">
                            <Crown className="w-8 h-8 text-gold-600 animate-pulse" />
                            <Sparkles className="w-4 h-4 text-orange-500 absolute -top-1 -right-1 animate-bounce" />
                        </div>
                        <NavLink to="/" className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 hover:text-gold-600 transition-colors duration-300 leading-tight">
                            Sri Lakshmi Lavanya Jewellery
                        </NavLink>
                    </div>
                    
                    {/* Desktop Search */}
                    <div className="hidden md:flex flex-1 max-w-md mx-6">
                        <div className="relative w-full">
                            <input 
                                type='search' 
                                placeholder='Search for jewelry...' 
                                className='w-full p-3 pl-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-gold-400 bg-white transition-all duration-300' 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        </div>
                    </div>

                    {/* Mobile buttons */}
                    <div className="md:hidden flex items-center gap-3">
                        <button 
                            onClick={toggleSearch}
                            className="p-3 hover:bg-gold-100 rounded-full transition-colors duration-300 group"
                            aria-label="Toggle search"
                        >
                            <Search size={20} className="text-gold-600 group-hover:text-gold-700" />
                        </button>
                        <button 
                            onClick={toggleMenu}
                            className="p-3 hover:bg-gold-100 rounded-full transition-colors duration-300 group"
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? 
                                <X size={20} className="text-indian-crimson group-hover:text-red-700" /> : 
                                <Menu size={20} className="text-gold-600 group-hover:text-gold-700" />
                            }
                        </button>
                    </div>
                </div>

                {/* Mobile Search Bar */}
                {isSearchOpen && (
                    <div className="md:hidden mt-4 pb-4">
                        <div className="relative">
                            <input 
                                type='search' 
                                placeholder='Search jewelry...' 
                                className='w-full p-3 pl-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold-400 bg-white transition-all duration-300' 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        </div>
                    </div>
                )}

                {/* Navigation menu */}
                <nav className={`border-t border-gray-200 pt-4 mt-4 ${isMenuOpen ? 'block' : 'hidden md:block'}`}>
                    <ul className='flex flex-col md:flex-row items-start md:items-center justify-start md:justify-center gap-4 md:gap-8 text-gray-700 font-medium'>
                        <li>
                            <NavLink 
                                to="/" 
                                onClick={closeMenu}
                                className={({ isActive }) => 
                                    `px-3 py-2 rounded-lg transition-all duration-300 ${
                                        isActive 
                                            ? "text-gold-700 bg-gold-100" 
                                            : "hover:text-gold-600 hover:bg-gold-50"
                                    }`
                                }
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/about" 
                                onClick={closeMenu}
                                className={({ isActive }) => 
                                    `px-3 py-2 rounded-lg transition-all duration-300 ${
                                        isActive 
                                            ? "text-gold-700 bg-gold-100" 
                                            : "hover:text-gold-600 hover:bg-gold-50"
                                    }`
                                }
                            >
                                About
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/categories" 
                                onClick={closeMenu}
                                className={({ isActive }) => 
                                    `px-3 py-2 rounded-lg transition-all duration-300 ${
                                        isActive 
                                            ? "text-gold-700 bg-gold-100" 
                                            : "hover:text-gold-600 hover:bg-gold-50"
                                    }`
                                }
                            >
                                Categories
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/weight-range" 
                                onClick={closeMenu}
                                className={({ isActive }) => 
                                    `px-3 py-2 rounded-lg transition-all duration-300 ${
                                        isActive 
                                            ? "text-gold-700 bg-gold-100" 
                                            : "hover:text-gold-600 hover:bg-gold-50"
                                    }`
                                }
                            >
                                Weight Range
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/enquiry" 
                                onClick={closeMenu}
                                className={({ isActive }) => 
                                    `px-3 py-2 rounded-lg transition-all duration-300 ${
                                        isActive 
                                            ? "text-blue-700 bg-blue-100" 
                                            : "hover:text-blue-600 hover:bg-blue-50"
                                    }`
                                }
                            >
                                Enquiry
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/orders" 
                                onClick={closeMenu}
                                className={({ isActive }) => 
                                    `px-3 py-2 rounded-lg transition-all duration-300 ${
                                        isActive 
                                            ? "text-green-700 bg-green-100" 
                                            : "hover:text-green-600 hover:bg-green-50"
                                    }`
                                }
                            >
                                New Orders
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/calendar" 
                                onClick={closeMenu}
                                className={({ isActive }) => 
                                    `px-3 py-2 rounded-lg transition-all duration-300 ${
                                        isActive 
                                            ? "text-orange-700 bg-orange-100" 
                                            : "hover:text-orange-600 hover:bg-orange-50"
                                    }`
                                }
                            >
                                Auspicious Calendar
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    </div>
  )
}
