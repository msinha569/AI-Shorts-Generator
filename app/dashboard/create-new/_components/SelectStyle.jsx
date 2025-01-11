'use client'
import { StyleOptions } from '@/constants/constants'
import Image from 'next/image'
import React, { useState } from 'react'

const SelectStyle = ({onUserSelect}) => {
    const [selectedOption, setSelectedOption] = useState()
    const isActiveClass = (name) => selectedOption === name ? 'border border-4 border-primary rounded-xl' : ''
   
    
  return (
    <div className='space-y-1'>
      <h2 className='font-bold text-2xl text-primary'>Style</h2>
      <p className='text-gray-500'>What is the topic of your video</p>
      <div className='flex flex-wrap gap-4'>
      {
        StyleOptions.map((item, index) => (
            <div key={index} className={`relative hover:scale-105 transition-all cursor-pointer ${isActiveClass(item.name)}`}>
                <Image 
                src={item.image} width={500} height={500} alt={item.name}
                onClick={() => {
                    setSelectedOption(item.name)
                    onUserSelect('imageStyle', item.name)
                }}
                className='h-80 object-cover rounded-lg w-40 min-w-24' />
                <h2 className='text-center absolute bottom-0 p-1 bg-black font-bold w-full text-white rounded-b-lg'>{item.name}</h2>
            </div>
        ))
      }
      </div>
    </div>
   
  )
}

export default SelectStyle
