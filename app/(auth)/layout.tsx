
import {  CodeIcon } from "lucide-react"
import { FC, ReactNode } from "react"

interface AuthLayoutProps {
    children: ReactNode
}
const AuthLayout: FC<AuthLayoutProps> = ({children}) => {
  return (
    <>
    
    <div className="bg-slate-200 p-6 rounded-md">   
      <div className="text-white bg-red-400"> hi from signin layout
      </div> 
      {children}
    </div>
    </>
  )
}

export default AuthLayout
