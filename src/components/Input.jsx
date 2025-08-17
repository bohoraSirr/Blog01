import React, { useId, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react'; // install lucide-react or use any icon library

const Input = React.forwardRef(function Input({
  label,
  type = "text",
  className = "",
  ...props
}, ref) {
  const id = useId();
  const [showPassword, setShowPassword] = useState(false);

  // Determine final input type
  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="w-full relative">
      {label && (
        <label className="inline-block mb-1 pl-1" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        type={inputType}
        className={`px-3 py-2 pr-10 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        ref={ref}
        id={id}
        {...props}
      />
      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute inset-y-0 right-3 flex items-center text-gray-600"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      )}
    </div>
  );
});

export default Input;
