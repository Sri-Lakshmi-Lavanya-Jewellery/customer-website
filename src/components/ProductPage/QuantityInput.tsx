import React from 'react';

interface QuantityInputProps {
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
}

const QuantityInput: React.FC<QuantityInputProps> = ({ quantity, onQuantityChange }) => {
  const MIN_QUANTITY = 1;
  const MAX_QUANTITY = 10; // Assuming a max quantity, as in the original component

  const handleDecrement = () => {
    if (quantity > MIN_QUANTITY) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrement = () => {
    if (quantity < MAX_QUANTITY) {
      onQuantityChange(quantity + 1);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(e.target.value, 10);
    if (isNaN(value)) {
      value = MIN_QUANTITY;
    } else if (value < MIN_QUANTITY) {
      value = MIN_QUANTITY;
    } else if (value > MAX_QUANTITY) {
      value = MAX_QUANTITY;
    }
    onQuantityChange(value);
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">Quantity</h3>
      <div className="flex items-center">
        <button
          onClick={handleDecrement}
          className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-l-lg disabled:opacity-50 hover:bg-blue-50 transition-colors"
          disabled={quantity <= MIN_QUANTITY}
        >
          <span className="text-xl text-blue-600">-</span>
        </button>
        <input
          type="number"
          min={MIN_QUANTITY}
          max={MAX_QUANTITY}
          value={quantity}
          onChange={handleChange}
          className="w-16 h-10 border-y border-gray-300 text-center focus:border-blue-500 focus:ring-1 focus:ring-blue-500 [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
        />
        <button
          onClick={handleIncrement}
          className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-r-lg disabled:opacity-50 hover:bg-blue-50 transition-colors"
          disabled={quantity >= MAX_QUANTITY}
        >
          <span className="text-xl text-blue-600">+</span>
        </button>
      </div>
    </div>
  );
};

export default QuantityInput;
