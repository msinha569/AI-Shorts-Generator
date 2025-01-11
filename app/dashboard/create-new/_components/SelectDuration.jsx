'use client'
import React, { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"


const SelectDuration = ({onUserSelect}) => {
  return (
    <div>
      <h2 className='text-2xl font-bold text-primary'>Duration</h2>
      <p className='text-gray-500'>Select the duration of your video</p>
        <Select onValueChange={(value) => {
            onUserSelect('duration',value)
            }}>
        <SelectTrigger className="w-full p-6 mt-2 text-lg">
            <SelectValue placeholder="Select Duration" />
        </SelectTrigger>
        <SelectContent>
           
            <SelectItem value={'30 seconds'}>30 Seconds</SelectItem>
            <SelectItem value={'60 seconds'}>60 Seconds</SelectItem>
      
        </SelectContent>
        </Select>
           
    </div>
  )
}

export default SelectDuration
