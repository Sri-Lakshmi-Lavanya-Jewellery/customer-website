import React from 'react';
import { EnquiryRequestDetailsProps } from '../../types/enquiry.types'; // Centralized props type
// EnquiryForm type itself is not directly needed here if props are correctly typed

export default function EnquiryRequestDetails({ formData, handleChange }: EnquiryRequestDetailsProps) {
    return (
        <>
            <div>
                <label htmlFor="productType" className="block text-gray-700 font-medium mb-2">Product Type</label>
                <select
                    id="productType"
                    name="productType"
                    value={formData.productType}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                >
                    <option value="">Select a product type</option>
                    <option value="gold">Gold Jewelry</option>
                    <option value="silver">Silver Jewelry</option>
                    <option value="diamond">Diamond Jewelry</option>
                    <option value="bridal">Bridal Collection</option>
                    <option value="other">Other</option>
                </select>
            </div>

            <div>
                <label htmlFor="budget" className="block text-gray-700 font-medium mb-2">Budget Range</label>
                <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                >
                    <option value="">Select your budget range</option>
                    <option value="0-50000">Under ₹50,000</option>
                    <option value="50000-100000">₹50,000 - ₹1,00,000</option>
                    <option value="100000-200000">₹1,00,000 - ₹2,00,000</option>
                    <option value="200000+">Above ₹2,00,000</option>
                </select>
            </div>

            <div>
                <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Message</label>
                <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                    placeholder="Tell us more about what you're looking for..."
                ></textarea>
            </div>
        </>
    );
}
