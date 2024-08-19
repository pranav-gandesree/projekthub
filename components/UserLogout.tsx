'use client'


import { Button } from "./ui/button"
import { signOut } from "next-auth/react"


const UserLogout = () => {

  return (
    <div>
      <Button onClick={()=>signOut({
            redirect: true,
            callbackUrl: `${window.location.origin}/signin`
      })}>
        Sign Out
      </Button>
    </div>
  )
}

export default UserLogout
