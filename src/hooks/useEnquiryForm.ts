import { useState } from 'react';

export interface EnquiryForm {
    name: string;
    email: string;
    phone: string;
    productType: string;
    budget: string;
    message: string;
}

const initialFormData: EnquiryForm = {
    name: '',
    email: '',
    phone: '',
    productType: '',
    budget: '',
    message: ''
};

interface UseEnquiryFormReturn {
    formData: EnquiryForm;
    isSubmitted: boolean;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    handleSubmit: (e: React.FormEvent) => void;
}

export const useEnquiryForm = (): UseEnquiryFormReturn => {
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
        // In a real application, you would send formData to a backend here.
        console.log('Form submitted:', formData);
        setIsSubmitted(true);
        setFormData(initialFormData); // Reset form

        // Optional: Hide the success message after a few seconds
        // setTimeout(() => setIsSubmitted(false), 5000);
    };

    return {
        formData,
        isSubmitted,
        handleChange,
        handleSubmit
    };
};
