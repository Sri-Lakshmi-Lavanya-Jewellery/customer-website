import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import { Crown, Gem, Star, Phone, Mail, MapPin, Clock, Heart } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-gradient-to-br from-gray-800 to-gray-900 text-white">
            <div className="border-t border-gold-300"></div>
            
            <div className="container mx-auto px-4 py-12">
                {/* Top section */}
                <div className="text-center mb-12">
                    <div className="flex justify-center items-center gap-4 mb-4">
                        <Crown className="w-8 h-8 text-gold-500" />
                        <h2 className="text-3xl font-bold text-white">
                            Sri Lakshmi Lavanya Jewellery
                        </h2>
                        <Crown className="w-8 h-8 text-gold-500" />
                    </div>
                    <p className="text-gray-300">
                        Your Trusted Home for Sacred Jewelry
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {/* About Section */}
                    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                        <div className="flex items-center gap-3 mb-4">
                            <Heart className="w-6 h-6 text-red-400" />
                            <h3 className="text-xl font-semibold text-gold-400">About Us</h3>
                        </div>
                        <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                            We celebrate life's precious moments with authentic Indian craftsmanship and quality jewelry.
                        </p>
                        <div className="flex space-x-4">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                               className="text-gray-400 hover:text-blue-400 transition-colors">
                                <FaFacebook size={20} />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" 
                               className="text-gray-400 hover:text-pink-400 transition-colors">
                                <FaInstagram size={20} />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" 
                               className="text-gray-400 hover:text-blue-300 transition-colors">
                                <FaTwitter size={20} />
                            </a>
                            <a href="https://wa.me/917288865969" target="_blank" rel="noopener noreferrer" 
                               className="text-gray-400 hover:text-green-400 transition-colors">
                                <FaWhatsapp size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                        <div className="flex items-center gap-2 mb-4">
                            <Star className="w-6 h-6 text-blue-400" />
                            <h3 className="text-xl font-semibold text-gold-400">Quick Links</h3>
                        </div>
                        <ul className="space-y-2 text-gray-300 text-sm">
                            <li>
                                <Link to="/" className="hover:text-gold-400 transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/categories" className="hover:text-gold-400 transition-colors">
                                    Categories
                                </Link>
                            </li>
                            <li>
                                <Link to="/weight-range" className="hover:text-gold-400 transition-colors">
                                    Weight Range
                                </Link>
                            </li>
                            <li>
                                <Link to="/enquiry" className="hover:text-gold-400 transition-colors">
                                    Enquiry
                                </Link>
                            </li>
                            <li>
                                <Link to="/calendar" className="hover:text-gold-400 transition-colors">
                                    Auspicious Calendar
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                        <div className="flex items-center gap-2 mb-4">
                            <Phone className="w-6 h-6 text-green-400" />
                            <h3 className="text-xl font-semibold text-gold-400">Contact Us</h3>
                        </div>
                        <ul className="space-y-3 text-gray-300 text-sm">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                                <div>
                                    <div>123 Jewelry Street</div>
                                    <div>City, State 12345</div>
                                </div>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-4 h-4 text-green-400 flex-shrink-0" />
                                <div>
                                    <div>+91 72888 65969</div>
                                    <div className="text-xs text-gray-400">Call for precious moments</div>
                                </div>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                                <div>
                                    <div>info@silvergold.com</div>
                                    <div className="text-xs text-gray-400">Sacred jewelry inquiries</div>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Business Hours */}
                    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                        <div className="flex items-center gap-2 mb-4">
                            <Clock className="w-6 h-6 text-yellow-400" />
                            <h3 className="text-xl font-semibold text-gold-400">Business Hours</h3>
                        </div>
                        <ul className="space-y-2 text-gray-300 text-sm">
                            <li className="flex justify-between items-center">
                                <span>Monday - Friday</span>
                                <span className="text-gold-400">10:00 AM - 8:00 PM</span>
                            </li>
                            <li className="flex justify-between items-center">
                                <span>Saturday</span>
                                <span className="text-gold-400">10:00 AM - 6:00 PM</span>
                            </li>
                            <li className="flex justify-between items-center">
                                <span>Sunday</span>
                                <span className="text-red-400">Closed</span>
                            </li>
                            <li className="pt-2 border-t border-gray-600">
                                <div className="text-xs text-gray-400">
                                    Call for auspicious timings
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-700 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="text-center md:text-left">
                            <p className="text-gray-300 text-sm">
                                &copy; {new Date().getFullYear()} Silver & Gold Collection. All rights reserved.
                            </p>
                            <p className="text-gray-400 text-xs mt-1">
                                Crafted with love for precious moments.
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 text-xs text-gray-400">
                                <Crown className="w-4 h-4 text-gold-500" />
                                <span>Authentic</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-400">
                                <Gem className="w-4 h-4 text-gray-400" />
                                <span>Pure</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-400">
                                <Heart className="w-4 h-4 text-red-400" />
                                <span>Sacred</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
} 