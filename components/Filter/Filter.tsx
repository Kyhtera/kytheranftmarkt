import React from "react";
import { ReactNode } from "react";

interface FilterProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

const Filter: React.FC<FilterProps> = ({ label, options, value, onChange }) => {
  return (
    <div>
      <label htmlFor={`${label}`}>{label}</label>
      <select
        id={`${label}Filter`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">All</option>
        {options.map((opt) => (
          <option value={opt} key={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
