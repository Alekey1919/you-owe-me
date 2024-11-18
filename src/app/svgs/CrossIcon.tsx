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
        stroke-width="1.7"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default CrossIcon;
