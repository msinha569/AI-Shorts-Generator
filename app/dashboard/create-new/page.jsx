'use client'
import React, { useState } from 'react'
import SelectTopic from './_components/SelectTopic'
import SelectStyle from './_components/SelectStyle'
import SelectDuration from './_components/SelectDuration'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import CustomLoading from './_components/CustomLoading'

const CreateNew = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [videoScript, setVideoScript] = useState([])
    const [formData, setFormData] = useState([])
    const onHandleInputChange = (fieldName, fieldValue) => {
        setFormData({
            ...formData,
            [fieldName]: fieldValue
        })
    }

    const onCreateHandler = async () => {
      const rawData = await getVideoScript();
      const filepath = await getVoiceover(rawData)
      console.log("filepathh",filepath);
      
  };
  

    const getVideoScript = async() => {
      setIsLoading(true)
      const prompt = 'write a script to generate '+formData.duration+' video on topic: '+formData.topic+' along with ai image prompt in '+formData.imageStyle+' format for each scene and give me result in json format with ImagePrompt and ContentText as field'
      const result = await axios.post('/api/get-video-script', {prompt:prompt})
      setVideoScript(result.data.result)
      console.log(result.data)
      console.log(result.data.result)
      setIsLoading(false)
      return result.data.result
    }

    const getVoiceover = async(rawData) => {
      let scriptData = ''
      rawData.forEach((scene) => {
        scriptData = scriptData + scene.ContentText
      } )
      console.log(scriptData);
      try {
        const res = await axios.post('/api/generate-audio', {scriptText:scriptData})
      console.log(res.data);
        
      } catch (error) {
        console.log(error)
      }
    }
  return (
    <div className='md:px-20'>
      <div className='font-bold text-4xl text-primary text-center'>Create New</div>
      <div className='shadow-md p-5 space-y-8'>
        <SelectTopic onUserSelect={onHandleInputChange}/>
        <SelectStyle onUserSelect={onHandleInputChange}/>
        <SelectDuration onUserSelect={onHandleInputChange}/>
        <Button className='w-full mt-10' onClick={onCreateHandler}>Create Shorts Video</Button>
        <CustomLoading isLoading={isLoading}/>
      </div>
    </div>
  )
}

export default CreateNew
