// 'use client'


// import { Button } from "./ui/button"
// import { signOut } from "next-auth/react"


// const UserLogout = () => {

//   return (
//     <div>
//       <Button className="text-purple-400" onClick={()=>signOut({
//             redirect: true,
//             callbackUrl: `${window.location.origin}/signin`
//       })}>
//         Sign Out
//       </Button>
//     </div>
//   )
// }

// export default UserLogout

'use client'

import React from 'react';
import { Button } from './ui/button';
import { signOut } from 'next-auth/react';

interface UserLogoutProps {
  className?: string;
  children?: React.ReactNode;
}

const UserLogout: React.FC<UserLogoutProps> = ({ className, children }) => {
  return (
      <Button className="text-purple-400" onClick={()=>signOut({
            redirect: true,
            callbackUrl: `${window.location.origin}/signin`
      })}>
      {children}
    </Button>
  );
};

export default UserLogout;

