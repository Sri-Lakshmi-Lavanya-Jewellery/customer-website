import React from 'react';

interface CategoryHeaderProps {
  title: string;
  description: string | undefined;
}

const CategoryHeader: React.FC<CategoryHeaderProps> = ({ title, description }) => {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">{title}</h1>
      {description && <p className="text-gray-600">{description}</p>}
    </div>
  );
};

export default CategoryHeader;
