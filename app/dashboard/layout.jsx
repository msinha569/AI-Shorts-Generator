import React from 'react'
import Header from './_components/Header'
import SIdeNav from './_components/SIdeNav'

const DashboardLayout = ({children}) => {
  return (
    <div>    
        <div className='hidden md:block h-screen bg-white fixed mt-[66px] w-64'>
            <SIdeNav/>
        </div>
        <div>
            <Header/>
            <div className='md:ml-64 p-10'>
            {children}
            </div>
        </div>
    </div>
  )
}

export default DashboardLayout
