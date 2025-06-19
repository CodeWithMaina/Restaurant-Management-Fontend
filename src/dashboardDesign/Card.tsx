import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
}
const Card: React.FC<CardProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default Card;
