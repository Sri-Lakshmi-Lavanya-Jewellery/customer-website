import React from 'react'
import { NavLink } from 'react-router-dom'
import MetalRates from '../MetalRates/MetalRates'

export default function Header() {
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

            <div className="container mx-auto p-4">
                {/* Top section with logo and search */}
                <div className="flex justify-between items-center mb-4">
                    <div className="logo">
                        <NavLink to="/" className="text-2xl font-bold hover:text-[#741B1B]">
                            Logo
                        </NavLink>
                    </div>
                    <input 
                        type='search' 
                        placeholder='Search' 
                        className='w-full max-w-md p-2 mx-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500' 
                    />
                </div>

                {/* Navigation menu */}
                <nav className="border-t pt-4">
                    <ul className='flex items-center justify-center gap-4 text-gray-600'>
                        <li>
                            <NavLink 
                                to="/" 
                                className={({ isActive }) => 
                                    isActive ? "text-blue-600" : "hover:text-blue-600"
                                }
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/about" 
                                className={({ isActive }) => 
                                    isActive ? "text-blue-600" : "hover:text-blue-600"
                                }
                            >
                                About
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/products" 
                                className={({ isActive }) => 
                                    isActive ? "text-blue-600" : "hover:text-blue-600"
                                }
                            >
                                Product Category
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/weight-range" 
                                className={({ isActive }) => 
                                    isActive ? "text-blue-600" : "hover:text-blue-600"
                                }
                            >
                                Weight range
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/enquiry" 
                                className={({ isActive }) => 
                                    isActive ? "text-blue-600" : "hover:text-blue-600"
                                }
                            >
                                Product enquiry
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/orders" 
                                className={({ isActive }) => 
                                    isActive ? "text-blue-600" : "hover:text-blue-600"
                                }
                            >
                                New Orders
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/calendar" 
                                className={({ isActive }) => 
                                    isActive ? "text-orange-600" : "hover:text-orange-600"
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
