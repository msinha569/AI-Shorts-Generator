'use client'
import React, { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { contentOptions } from '@/constants/constants'
import { Textarea } from '@/components/ui/textarea'
  

const SelectTopic = ({onUserSelect}) => {
    const [selectedOption, setSelectedOption] = useState()
  return (
    <div>
      <h2 className='text-2xl font-bold text-primary'>Content</h2>
      <p className='text-gray-500'>What is the topic of your video</p>
        <Select onValueChange={(value) => {
            setSelectedOption(value)
            value !== 'Custom Prompt' && onUserSelect('topic',value)
            }}>
        <SelectTrigger className="w-full p-6 mt-2 text-lg">
            <SelectValue placeholder="Content Type" />
        </SelectTrigger>
        <SelectContent>
           {contentOptions.map((Item, index) => (
            <SelectItem key={index} value={Item}>
                {Item}
            </SelectItem>
           ))}
        </SelectContent>
        </Select>
           {selectedOption === 'Custom Prompt' && (
            <Textarea 
            className='mt-3' 
            placeholder='Write Your Prompt'
            onChange={(e) => onUserSelect('topic', e.target.value)}/>
           )}
    </div>
  )
}

export default SelectTopic
