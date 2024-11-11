import { ReactNode } from "react";

export const metadata = {
  title: "New ticket",
};

const layout = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

export default layout;
