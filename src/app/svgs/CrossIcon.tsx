import { ISVGProps } from "../types/propTypes";

const CrossIcon = ({ className, onClick }: ISVGProps) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <path
        d="M4 4L20 20M4 20L20 4"
        stroke="var(--background)"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CrossIcon;
