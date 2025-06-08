import React from 'react';
import { Gift, ShieldCheck, Sun, Droplets } from 'lucide-react';

export default function ProductCareInstructions() {
  const carePoints = [
    {
      icon: <Gift className="h-6 w-6 text-gold-500" />,
      text: "Store your jewelry in a soft pouch or a fabric-lined box to prevent scratches."
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-gold-500" />,
      text: "Remove jewelry before showering, swimming, or engaging in activities that expose it to moisture or chemicals."
    },
    {
      icon: <Sun className="h-6 w-6 text-gold-500" />,
      text: "Avoid direct contact with perfumes, lotions, and hairsprays, as they can tarnish the metal over time."
    },
    {
      icon: <Droplets className="h-6 w-6 text-gold-500" />,
      text: "Clean your jewelry gently with a soft, lint-free cloth. For deeper cleaning, consult a professional jeweler."
    }
  ];

  return (
    <div className="mb-8 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
        Care Instructions
      </h2>
      <ul className="space-y-3 text-gray-700">
        {carePoints.map((point, index) => (
          <li key={index} className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-1">{point.icon}</div>
            <span>{point.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
