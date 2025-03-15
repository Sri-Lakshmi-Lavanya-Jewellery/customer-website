import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* About Section */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">About Us</h3>
                        <p className="text-gray-400 mb-4">
                            We are dedicated to providing the finest quality jewelry pieces that celebrate life's special moments.
                        </p>
                        <div className="flex space-x-4">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                                <FaFacebook size={24} />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                                <FaInstagram size={24} />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                                <FaTwitter size={24} />
                            </a>
                            <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                                <FaWhatsapp size={24} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/products/gold" className="text-gray-400 hover:text-white">Gold Collection</Link>
                            </li>
                            <li>
                                <Link to="/products/silver" className="text-gray-400 hover:text-white">Silver Collection</Link>
                            </li>
                            <li>
                                <Link to="/products/diamond" className="text-gray-400 hover:text-white">Diamond Jewelry</Link>
                            </li>
                            <li>
                                <Link to="/enquiry" className="text-gray-400 hover:text-white">Make an Enquiry</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li>123 Jewelry Street</li>
                            <li>City, State 12345</li>
                            <li>Phone: +1 234 567 8900</li>
                            <li>Email: info@jewelry.com</li>
                        </ul>
                    </div>

                    {/* Business Hours */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Business Hours</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li>Monday - Friday: 10:00 AM - 8:00 PM</li>
                            <li>Saturday: 10:00 AM - 6:00 PM</li>
                            <li>Sunday: Closed</li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                    <p>&copy; {new Date().getFullYear()} Your Jewelry Store. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
} 