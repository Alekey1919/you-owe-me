import { ISVGProps } from "../types/propTypes";

const ClipboardIcon = ({ className, onClick }: ISVGProps) => {
  return (
    <svg
      className={className}
      onClick={onClick}
      viewBox="0 0 32 32"
      fill="none"
      id="icon"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="13.9999"
        y="23"
        width="8"
        height="2"
        stroke="var(--background)"
      />
      <rect x="9.9999" y="23" width="2" height="2" stroke="var(--background)" />
      <rect
        x="13.9999"
        y="18"
        width="8"
        height="2"
        stroke="var(--background)"
      />
      <rect x="9.9999" y="18" width="2" height="2" stroke="var(--background)" />
      <rect
        x="13.9999"
        y="13"
        width="8"
        height="2"
        stroke="var(--background)"
      />
      <rect x="9.9999" y="13" width="2" height="2" stroke="var(--background)" />
      <path
        d="M25,5H22V4a2,2,0,0,0-2-2H12a2,2,0,0,0-2,2V5H7A2,2,0,0,0,5,7V28a2,2,0,0,0,2,2H25a2,2,0,0,0,2-2V7A2,2,0,0,0,25,5ZM12,4h8V8H12ZM25,28H7V7h3v3H22V7h3Z"
        transform="translate(0 0)"
        stroke="var(--background)"
      />
    </svg>
  );
};

export default ClipboardIcon;
