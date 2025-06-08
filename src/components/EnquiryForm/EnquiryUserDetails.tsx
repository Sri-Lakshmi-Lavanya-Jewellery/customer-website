import React from 'react';
import { EnquiryUserDetailsProps } from '../../types/enquiry.types'; // Centralized props type
// EnquiryForm type itself is not directly needed here if props are correctly typed via EnquiryUserDetailsProps

export default function EnquiryUserDetails({ formData, handleChange }: EnquiryUserDetailsProps) {
    return (
        <>
            <div>
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name *</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                    placeholder="Your full name"
                />
            </div>

            <div>
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email *</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                    placeholder="your@email.com"
                />
            </div>

            <div>
                <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Phone Number *</label>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                    placeholder="Your phone number"
                />
            </div>
        </>
    );
}
