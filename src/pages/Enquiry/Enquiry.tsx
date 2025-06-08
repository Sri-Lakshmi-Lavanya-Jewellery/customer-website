import React, { useState } from 'react';
import EnquiryUserDetails from '../../components/EnquiryForm/EnquiryUserDetails';
import EnquiryRequestDetails from '../../components/EnquiryForm/EnquiryRequestDetails';
import { EnquiryForm } from '../../types/enquiry.types'; // Centralized type

const initialFormData: EnquiryForm = {
    name: '',
    email: '',
    phone: '',
    productType: '',
    budget: '',
    message: ''
};

export default function Enquiry() {
    const [formData, setFormData] = useState<EnquiryForm>(initialFormData);
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
        // console.log('Form submitted:', formData); // Removed for cleanup
        setIsSubmitted(true);
        // Reset form after submission
        setFormData(initialFormData);
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
                    <EnquiryUserDetails formData={formData} handleChange={handleChange} />
                    <EnquiryRequestDetails formData={formData} handleChange={handleChange} />
                    
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