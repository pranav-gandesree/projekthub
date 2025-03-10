'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'

const AuthNavbar = () => {
    const router = useRouter()

    return (
        <div className='cursor-pointer'>
            <Button onClick={() => router.push("/")}>Go to Home</Button>
        </div>
    )
}

export default AuthNavbar
