import { useState } from 'react';
import { submitEnquiry, type EnquiryRequest } from '../services/api';

export interface EnquiryForm {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    subject: string;
    message: string;
    type: 'general' | 'product' | 'order' | 'complaint' | 'suggestion' | 'other';
    priority: 'low' | 'medium' | 'high' | 'urgent';
    productId?: string;
}

const initialFormData: EnquiryForm = {
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    subject: '',
    message: '',
    type: 'general',
    priority: 'medium'
};

interface UseEnquiryFormReturn {
    formData: EnquiryForm;
    isSubmitted: boolean;
    isSubmitting: boolean;
    error: string | null;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    handleSubmit: (e: React.FormEvent) => void;
    resetForm: () => void;
}

export const useEnquiryForm = (initialData?: Partial<EnquiryForm>): UseEnquiryFormReturn => {
    const [formData, setFormData] = useState<EnquiryForm>({
        ...initialFormData,
        ...initialData
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (error) setError(null);
    };

    const resetForm = () => {
        setFormData({ ...initialFormData, ...initialData });
        setIsSubmitted(false);
        setError(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            // Prepare the data for API submission
            const enquiryData: EnquiryRequest = {
                customerName: formData.customerName,
                customerEmail: formData.customerEmail,
                customerPhone: formData.customerPhone || undefined,
                subject: formData.subject,
                message: formData.message,
                type: formData.type,
                priority: formData.priority,
                productId: formData.productId || undefined,
                tags: formData.type === 'product' && formData.productId ? ['product-inquiry'] : undefined
            };

            const response = await submitEnquiry(enquiryData);
            console.log('Enquiry submitted successfully:', response);
            
            setIsSubmitted(true);
            // Don't reset form immediately to show success state
            
        } catch (error) {
            console.error('Error submitting enquiry:', error);
            setError(error instanceof Error ? error.message : 'Failed to submit enquiry. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        formData,
        isSubmitted,
        isSubmitting,
        error,
        handleChange,
        handleSubmit,
        resetForm
    };
};
