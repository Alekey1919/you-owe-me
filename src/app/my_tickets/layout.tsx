import { ReactNode } from "react";

export const metadata = {
  title: "My tickets",
};

const layout = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

export default layout;
