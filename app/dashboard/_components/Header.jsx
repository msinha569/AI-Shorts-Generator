import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

const Header = () => {
  return (
    <div className='p-2 px-5 flex justify-between shadow-md'>
        <div className='flex gap-3 item-center '>
            <Image width={50} height={50} src='/icons8-krita.svg' alt='logo'/>    
            <h2 className='font-bold text-xl flex items-center'>AI Shorts</h2>
        </div>
        <div className='flex items-center gap-3'>
            <Button>Dashboard</Button>
           <UserButton  appearance={{
                    elements: {
                        userButtonAvatarBox: {
                            width: '2.5rem',
                            height: '2.5rem',
                          }}}}/>
        </div>
    </div>
  )
}

export default Header
