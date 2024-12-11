'use client'

import React from 'react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'

const AuthNavbar = () => {
    const router = useRouter()

    return (
        <div className='cursor-pointer'>
            <Button onClick={() => router.push("/")}>Go to Home</Button>
        </div>
    )
}

export default AuthNavbar
