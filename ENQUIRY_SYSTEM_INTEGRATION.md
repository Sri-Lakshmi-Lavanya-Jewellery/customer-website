# Enquiry System Integration

## Overview
The enquiry system has been fully integrated with the API endpoint `/api/v1/customer/enquiry` to allow customers to submit detailed enquiries about products or general questions.

## Features

### 1. **General Enquiry Page** (`/enquiry`)
- Complete form with all required and optional fields
- Enquiry type selection (general, product, order, complaint, suggestion, other)
- Priority levels (low, medium, high, urgent)
- Quick subject options for common inquiries
- Character count for message field
- Real-time API integration with error handling

### 2. **Product-Specific Enquiry**
- Pre-filled form with product details
- Available as modal from product page
- Auto-populated message with product information
- Direct integration with product data

### 3. **Multiple Contact Options**
Product pages now offer three ways to connect:
1. **WhatsApp** - Instant messaging with pre-filled product details
2. **Enquiry Form** - Structured form submission to backend
3. **Wishlist** - Save for later (future feature)

## Form Fields

### Required Fields
- `customerName` (max 100 characters)
- `customerEmail` (valid email format)
- `subject` (max 200 characters)
- `message` (max 2000 characters)

### Optional Fields
- `customerPhone` (phone number validation)
- `type` (dropdown with predefined options)
- `priority` (default: medium)
- `productId` (auto-filled for product enquiries)
- `tags` (auto-generated based on enquiry type)

## Default Options

### Enquiry Types
- General Inquiry
- Product Information
- Order Support
- Complaint/Issue
- Suggestion/Feedback
- Other

### Priority Levels
- Low Priority
- Medium Priority (default)
- High Priority
- Urgent

### Quick Subject Options
- "Product availability inquiry"
- "Pricing and cost estimation"
- "Custom design request"
- "Delivery and shipping information"
- "Return and exchange policy"
- "Product care instructions"
- "Bulk order inquiry"
- "Corporate gifting options"

## API Integration

### Request Format
```json
{
  "customerName": "John Doe",
  "customerEmail": "john@example.com",
  "customerPhone": "+1234567890",
  "subject": "Product Query",
  "message": "I need more information about the Silver Kamakshi Deepam",
  "type": "product",
  "priority": "medium",
  "productId": "6698c8f8e5f8c7e4a1234567",
  "tags": ["product-inquiry"]
}
```

### Success Response
Returns enquiry ID, status, timestamps, and confirmation message.

## Error Handling
- Network error handling with user-friendly messages
- Form validation for required fields
- Loading states during submission
- Success confirmation with option to submit another enquiry

## Usage Examples

### From Product Page
```typescript
// Product-specific enquiry modal
<ProductEnquiry 
  product={product} 
  isModal={true} 
  onClose={() => setModalOpen(false)} 
/>
```

### General Enquiry Hook
```typescript
const {
  formData,
  isSubmitting,
  error,
  handleSubmit
} = useEnquiryForm();
```

## Configuration
WhatsApp number can be configured in:
- `src/utils/whatsapp-new.ts` - Update `businessNumber`
- Environment variable: `VITE_WHATSAPP_NUMBER`

The enquiry system provides a comprehensive solution for customer communication with both instant messaging (WhatsApp) and formal enquiry submission options.
