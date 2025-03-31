import React, { ReactNode } from "react";

interface NMContainerProps {
  children: ReactNode;
  className?: string;
}

const CustomContainer = ({ children, className = "" }: NMContainerProps) => {
  return (
    <div className={`container mx-auto px-5 ${className}`}>{children}</div>
  );
};

export default CustomContainer;
