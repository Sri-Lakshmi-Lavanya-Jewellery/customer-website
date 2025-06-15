import React from 'react';

const NoProductsMessage: React.FC = () => {
  return (
    <div className="text-center py-12"> {/* Matches original wrapper class and structure */}
      <h3 className="text-xl font-semibold text-gray-800 mb-2">No products found</h3>
      <p className="text-gray-600">Try adjusting your filters or selecting a different subcategory.</p>
    </div>
  );
};

export default NoProductsMessage;
