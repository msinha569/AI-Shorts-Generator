'use client'
import { MenuOptions } from '@/constants/constants'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const SIdeNav = () => {
    const path = usePathname()
    const isActiveClass = (pathName) =>  path === pathName ? 'bg-primary text-white' : ''

    
  return (
    <div className='w-64 h-screen p-5 shadow-md'>
        <div className='grid gap-3 '>
            {MenuOptions.map((item,index) => (
            <Link href={item.path} key={index}>
            <div className={`flex gap-3 items-center p-3 hover:bg-primary hover:text-white cursor-pointer rounded-md ${isActiveClass(item.path)}`}>
                <item.icon/>
                <h2>{item.name}</h2>
            </div>
            </Link>
            ))}
        </div>
      
    </div>
  )
}

export default SIdeNav
