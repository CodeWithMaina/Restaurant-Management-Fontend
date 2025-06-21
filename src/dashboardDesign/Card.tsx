import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
}
const Card: React.FC<CardProps> = ({ children }) => {
  return (
    <div className="bg-black rounded-lg shadow-md h-full">
      {children}
    </div>
  );
};

export default Card;