import { ButtonHTMLAttributes } from "react";


interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className?: string;
}

export function Button({children,className = "",...Props}: ButtonProps){
    return(
        <button
        className={`bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition cursor-pointer ${className}`}
        {...Props}
        >
            {children}
        </button>
    );
}