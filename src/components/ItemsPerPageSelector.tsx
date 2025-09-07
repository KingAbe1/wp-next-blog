'use client';

interface ItemsPerPageSelectorProps {
  value: number;
  onChange: (value: number) => void;
  options?: number[];
  className?: string;
}

export default function ItemsPerPageSelector({
  value,
  onChange,
  options = [1, 12, 24, 48],
  className = ''
}: ItemsPerPageSelectorProps) {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <label htmlFor="itemsPerPage" className="text-sm text-gray-600">
        Show:
      </label>
      <select
        id="itemsPerPage"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="px-3 py-1 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
