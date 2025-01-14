'use client'
import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import EmptyState from './_components/EmptyState'
import Link from 'next/link'
import { useUser } from '@clerk/nextjs'
import { db } from '@/configs/db'
import { eq } from 'drizzle-orm'
import { VideoData } from '@/configs/schema'
import VideoList from './_components/VideoList'

const Dashboard = () => {
    const [videoList, setVideoList] = useState([])
    const {user} = useUser()

    useEffect(() => {
      user && GetVideoList()
    },[user])

    const GetVideoList = async() => {
      const result = await db.select().from(VideoData)
      .where(eq(VideoData?.createdBy, user?.primaryEmailAddress?.emailAddress))
      console.log(result);

      setVideoList(result)
    }
  return (
    <div className='space-y-10'>
      <div className='flex justify-between items-center'>
        <h2 className='text-primary font-bold text-2xl'>Dashboard</h2>
        <Link href={'/dashboard/create-new'}>
            <Button>+ Create New</Button>
        </Link>
      </div>
     
        {videoList.length === 0 ?
        ( <div >
            <EmptyState/>
        </div>) : (
          <div>
            <VideoList videoList={videoList}/>
          </div>
        )
        
        }
    </div>
  )
}

export default Dashboard
