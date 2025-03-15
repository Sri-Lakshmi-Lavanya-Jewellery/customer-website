import React, { useState } from 'react';

interface EnquiryForm {
    name: string;
    email: string;
    phone: string;
    productType: string;
    budget: string;
    message: string;
}

export default function Enquiry() {
    const [formData, setFormData] = useState<EnquiryForm>({
        name: '',
        email: '',
        phone: '',
        productType: '',
        budget: '',
        message: ''
    });

    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically send the data to your backend
        console.log('Form submitted:', formData);
        setIsSubmitted(true);
        // Reset form after submission
        setFormData({
            name: '',
            email: '',
            phone: '',
            productType: '',
            budget: '',
            message: ''
        });
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">Make an Enquiry</h1>
                <p className="text-gray-600 mb-8 text-center">
                    Fill out the form below and we'll get back to you as soon as possible.
                </p>

                {isSubmitted && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                        Thank you for your enquiry! We will contact you soon.
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-lg">
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

                    <button
                        type="submit"
                        className="w-full bg-gold-500 text-white py-3 px-6 rounded-lg hover:bg-gold-600 transition-colors font-medium"
                    >
                        Submit Enquiry
                    </button>
                </form>
            </div>
        </div>
    );
} 