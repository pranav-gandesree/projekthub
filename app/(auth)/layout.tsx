import AuthNavbar from "@/components/canvas/AuthNavbar";
import { FC, ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}
const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <>
      <div className=" p-6 rounded-md">
        <AuthNavbar />
        {children}
      </div>
    </>
  );
};

export default AuthLayout;
