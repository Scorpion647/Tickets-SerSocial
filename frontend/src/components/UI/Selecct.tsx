import { SelectHTMLAttributes } from "react";

interface SelecctProps extends SelectHTMLAttributes<HTMLSelectElement> {
    children: React.ReactNode;
    className?: string;
}

export default function Selecct({children,className = "", ...props} : SelecctProps){
    return(
        <select className={`w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        {...props}
        >
        {children}
        </select>
    );
}