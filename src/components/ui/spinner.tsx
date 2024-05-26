import React from "react";

interface SpinnerPros {
    className?: string;
}

const Spinner: React.FC<SpinnerPros> = ({ className }) => {
    return (
        <div
            className={`flex items-center justify-center space-x-2 ${className}`}
        >
            <div className="w-8 h-8 border-2 border-t-4 border-t-red-400 border-gray-200 rounded-ful animate-spin"></div>
        </div>
    );
};

export default Spinner;
