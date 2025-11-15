import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  id: string;
}

const Textarea: React.FC<TextareaProps> = ({ label, id, ...props }) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-stone-600 mb-1">
        {label}
      </label>
      <textarea
        id={id}
        {...props}
        rows={3}
        className="w-full px-3 py-2 text-stone-800 bg-stone-50 border border-stone-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-800 focus:border-amber-800 transition"
      />
    </div>
  );
};

export default Textarea;