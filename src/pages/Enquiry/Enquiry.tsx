import React from 'react';
import { useEnquiryForm } from '../../hooks/useEnquiryForm';

// Default options for different enquiry types
const ENQUIRY_TYPES = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'product', label: 'Product Information' },
    { value: 'order', label: 'Order Support' },
    { value: 'complaint', label: 'Complaint/Issue' },
    { value: 'suggestion', label: 'Suggestion/Feedback' },
    { value: 'other', label: 'Other' }
];

const PRIORITY_LEVELS = [
    { value: 'low', label: 'Low Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'high', label: 'High Priority' },
    { value: 'urgent', label: 'Urgent' }
];

const COMMON_SUBJECTS = [
    'Product availability inquiry',
    'Pricing and cost estimation',
    'Custom design request',
    'Delivery and shipping information',
    'Return and exchange policy',
    'Product care instructions',
    'Bulk order inquiry',
    'Corporate gifting options'
];

export default function Enquiry() {
    const {
        formData,
        isSubmitted,
        isSubmitting,
        error,
        handleChange,
        handleSubmit,
        resetForm
    } = useEnquiryForm();

    const handleSubjectSelect = (subject: string) => {
        const event = {
            target: { name: 'subject', value: subject }
        } as React.ChangeEvent<HTMLInputElement>;
        handleChange(event);
    };

    if (isSubmitted) {
        return (
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-2xl mx-auto text-center">
                    <div className="bg-white border border-gold-100 shadow-card px-6 py-12 rounded-2xl">
                        <div className="flex items-center justify-center mb-5">
                            <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                                <svg className="h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                        <h2 className="font-display text-3xl font-light text-charcoal mb-3">Thank You!</h2>
                        <p className="text-charcoal-muted font-modern mb-8 max-w-sm mx-auto">
                            Your enquiry has been submitted successfully. We'll get back to you soon —
                            for the quickest reply, message us on WhatsApp.
                        </p>
                        <button
                            onClick={resetForm}
                            className="bg-gold-600 text-white px-8 py-3 rounded-full hover:bg-gold-700 transition-colors font-modern text-xs font-semibold tracking-widest uppercase"
                        >
                            Submit Another Enquiry
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-10">
                    <p className="text-[10px] md:text-xs font-bold tracking-[0.35em] uppercase font-indian-serif text-gold-600 mb-3">
                        We're Here to Help
                    </p>
                    <h1 className="font-display text-3xl md:text-5xl font-light text-charcoal leading-tight">Make an Enquiry</h1>
                    <p className="mt-3 text-sm text-charcoal-muted font-modern max-w-md mx-auto">
                        Share what you're looking for and we'll respond personally — or message us
                        directly on WhatsApp for the quickest reply.
                    </p>
                    <div className="flex items-center gap-3 mt-4 justify-center">
                        <div className="h-px w-10 bg-gold-300" />
                        <span className="text-sm text-gold-500">✦</span>
                        <div className="h-px w-10 bg-gold-300" />
                    </div>
                </div>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-lg">
                    {/* Personal Information Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="customerName" className="block text-charcoal font-modern text-sm font-medium mb-2">
                                Full Name *
                            </label>
                            <input
                                type="text"
                                id="customerName"
                                name="customerName"
                                value={formData.customerName}
                                onChange={handleChange}
                                required
                                maxLength={100}
                                className="w-full px-4 py-2 border border-gold-200 rounded-lg font-modern text-charcoal focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                                placeholder="Your full name"
                            />
                        </div>

                        <div>
                            <label htmlFor="customerEmail" className="block text-charcoal font-modern text-sm font-medium mb-2">
                                Email Address *
                            </label>
                            <input
                                type="email"
                                id="customerEmail"
                                name="customerEmail"
                                value={formData.customerEmail}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gold-200 rounded-lg font-modern text-charcoal focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                                placeholder="your@email.com"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="customerPhone" className="block text-charcoal font-modern text-sm font-medium mb-2">
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            id="customerPhone"
                            name="customerPhone"
                            value={formData.customerPhone}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gold-200 rounded-lg font-modern text-charcoal focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                            placeholder="+91 XXXXX XXXXX"
                        />
                    </div>

                    {/* Enquiry Details Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="type" className="block text-charcoal font-modern text-sm font-medium mb-2">
                                Enquiry Type *
                            </label>
                            <select
                                id="type"
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gold-200 rounded-lg font-modern text-charcoal focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                            >
                                {ENQUIRY_TYPES.map(type => (
                                    <option key={type.value} value={type.value}>
                                        {type.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="priority" className="block text-charcoal font-modern text-sm font-medium mb-2">
                                Priority Level
                            </label>
                            <select
                                id="priority"
                                name="priority"
                                value={formData.priority}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gold-200 rounded-lg font-modern text-charcoal focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                            >
                                {PRIORITY_LEVELS.map(priority => (
                                    <option key={priority.value} value={priority.value}>
                                        {priority.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="subject" className="block text-charcoal font-modern text-sm font-medium mb-2">
                            Subject *
                        </label>
                        <input
                            type="text"
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                            maxLength={200}
                            className="w-full px-4 py-2 border border-gold-200 rounded-lg font-modern text-charcoal focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                            placeholder="Brief description of your inquiry"
                        />
                        
                        {/* Quick Subject Options */}
                        <div className="mt-3">
                            <p className="text-sm text-charcoal-muted font-modern mb-2">Quick options:</p>
                            <div className="flex flex-wrap gap-2">
                                {COMMON_SUBJECTS.map((subject, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        onClick={() => handleSubjectSelect(subject)}
                                        className="px-3 py-1 text-sm font-modern text-charcoal-light bg-gold-50 border border-gold-100 rounded-full hover:bg-gold-100 hover:text-gold-700 transition-colors"
                                    >
                                        {subject}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="message" className="block text-charcoal font-modern text-sm font-medium mb-2">
                            Message *
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            maxLength={2000}
                            rows={6}
                            className="w-full px-4 py-2 border border-gold-200 rounded-lg font-modern text-charcoal focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                            placeholder="Please provide detailed information about your inquiry..."
                        />
                        <div className="text-right text-sm text-gray-500 mt-1">
                            {formData.message.length}/2000 characters
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gold-600 text-white py-3.5 px-6 rounded-full hover:bg-gold-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-modern text-sm font-semibold tracking-widest uppercase flex items-center justify-center gap-2"
                    >
                        {isSubmitting ? (
                            <>
                                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Submitting...
                            </>
                        ) : (
                            'Submit Enquiry'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}