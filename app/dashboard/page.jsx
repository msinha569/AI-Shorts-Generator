'use client'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import EmptyState from './_components/EmptyState'
import Link from 'next/link'

const Dashboard = () => {
    const [videoList, setVideoList] = useState([])
  return (
    <div className='space-y-10'>
      <div className='flex justify-between items-center'>
        <h2 className='text-primary font-bold text-2xl'>Dashboard</h2>
        <Link href={'/dashboard/create-new'}>
            <Button>+ Create New</Button>
        </Link>
      </div>
     
        {videoList.length === 0 &&
         <div >
            <EmptyState/>
        </div>}
    </div>
  )
}

export default Dashboard
