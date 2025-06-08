export interface EnquiryForm {
    name: string;
    email: string;
    phone: string;
    productType: string;
    budget: string;
    message: string;
}

export interface EnquiryUserDetailsProps {
    formData: Pick<EnquiryForm, 'name' | 'email' | 'phone'>;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

export interface EnquiryRequestDetailsProps {
    formData: Pick<EnquiryForm, 'productType' | 'budget' | 'message'>;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}
