import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, X, Search } from 'lucide-react'
import MetalRates from '../MetalRates/MetalRates'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
  const closeMenu = () => setIsMenuOpen(false);
  console.log("Hello, for force deployment");

  return (
    <div>
        <header className="bg-white shadow-sm">
            {/* Metal rates ticker */}
            <div className="bg-gray-100 py-1 border-b">
                <div className="container mx-auto">
                    <div className="overflow-x-auto whitespace-nowrap scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                        <MetalRates />
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-4">
                {/* Top section with logo, search, and mobile menu button */}
                <div className="flex justify-between items-center">
                    <div className="logo">
                        <NavLink to="/" className="text-xl md:text-2xl font-bold hover:text-[#741B1B]">
                            Logo
                        </NavLink>
                    </div>
                    
                    {/* Desktop Search */}
                    <div className="hidden md:flex flex-1 max-w-md mx-4">
                        <input 
                            type='search' 
                            placeholder='Search' 
                            className='w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500' 
                        />
                    </div>

                    {/* Mobile buttons */}
                    <div className="md:hidden flex items-center gap-2">
                        <button 
                            onClick={toggleSearch}
                            className="p-2 hover:bg-gray-100 rounded-md"
                            aria-label="Toggle search"
                        >
                            <Search size={20} />
                        </button>
                        <button 
                            onClick={toggleMenu}
                            className="p-2 hover:bg-gray-100 rounded-md"
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Search Bar */}
                {isSearchOpen && (
                    <div className="md:hidden mt-4 pb-4 border-b">
                        <input 
                            type='search' 
                            placeholder='Search' 
                            className='w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500' 
                        />
                    </div>
                )}

                {/* Navigation menu */}
                <nav className={`border-t pt-4 ${isMenuOpen ? 'block' : 'hidden md:block'}`}>
                    <ul className='flex flex-col md:flex-row items-start md:items-center justify-start md:justify-center gap-4 md:gap-6 text-gray-600'>
                        <li>
                            <NavLink 
                                to="/" 
                                onClick={closeMenu}
                                className={({ isActive }) => 
                                    isActive ? "text-blue-600 font-medium" : "hover:text-blue-600 transition-colors"
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
                                    isActive ? "text-blue-600 font-medium" : "hover:text-blue-600 transition-colors"
                                }
                            >
                                About
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/products" 
                                onClick={closeMenu}
                                className={({ isActive }) => 
                                    isActive ? "text-blue-600 font-medium" : "hover:text-blue-600 transition-colors"
                                }
                            >
                                Product Category
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/weight-range" 
                                onClick={closeMenu}
                                className={({ isActive }) => 
                                    isActive ? "text-blue-600 font-medium" : "hover:text-blue-600 transition-colors"
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
                                    isActive ? "text-blue-600 font-medium" : "hover:text-blue-600 transition-colors"
                                }
                            >
                                Product Enquiry
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/orders" 
                                onClick={closeMenu}
                                className={({ isActive }) => 
                                    isActive ? "text-blue-600 font-medium" : "hover:text-blue-600 transition-colors"
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
                                    isActive ? "text-orange-600 font-medium" : "hover:text-orange-600 transition-colors"
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
