'use client'
import React, { useContext, useEffect, useState } from 'react'
import SelectTopic from './_components/SelectTopic'
import SelectStyle from './_components/SelectStyle'
import SelectDuration from './_components/SelectDuration'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import CustomLoading from './_components/CustomLoading'
import { VideoDataContext } from '@/app/_context/VideoDataContext'
import { db } from '@/configs/db'
import { VideoData } from '@/configs/schema'
import { useUser } from '@clerk/nextjs'
import PlayerDialog from '../_components/PlayerDialog'

const CreateNew = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState([])
    const {videoData, setVideoData} = useContext(VideoDataContext)
    const [playVideo, setPlayVideo] = useState(false)
    const [videoId, setVideoId] = useState(1)
    const {user}  = useUser()
   
    const onHandleInputChange = (fieldName, fieldValue) => {
        setFormData({
            ...formData,
            [fieldName]: fieldValue
        })
    }

    const onCreateHandler = async () => {
      setIsLoading(true);
    
      try {
        const rawData = await getVideoScript();
    
        // Run the functions concurrently
        const [voiceover, photoURL] = await Promise.all([
          getVoiceover(rawData),
          getPhotoes(rawData),
        ]);
        const transcription = await getCaptions(voiceover);
    
        // Handle the results as needed
        // console.log({ voiceover, transcription, photoURL });
      } catch (error) {
        console.error("Error occurred:", error);
      } finally {
        setIsLoading(false);
        setPlayVideo(true);
      }
    };
    
  

    const getVideoScript = async() => {
      const prompt = 'write a script to generate '+formData.duration+' video on topic: '+formData.topic+' along with ai image prompt in '+formData.imageStyle+' format for each scene and give me result in json format with ImagePrompt and ContentText as field'
      try {
        const result = await axios.post('/api/get-video-script', {prompt:prompt})
        setVideoData((prevData) => ({...prevData, 'script' : result.data.result}))
        return result.data.result
      } catch (error) {
        console.log(error);
      }}

    const getVoiceover = async(rawData) => {
      let scriptData = ''
      rawData.forEach((scene) => {
        scriptData = scriptData + scene.ContentText
      } )      
      try {
        const res = await axios.post('/api/generate-audio', {scriptText:scriptData})
      // console.log(res.data);
      setVideoData((prevData) => ({...prevData, 'voiceover' : res.data.downloadURL}))
      return res.data.downloadURL        
      } catch (error) {
        console.log(error)
      }
      
    }

    const getCaptions = async(voiceover) => {
    try {
        const response = await axios.post('/api/generate-captions', {audioFilePath:voiceover})
        // console.log(response.data);
        setVideoData((prevData) => ({...prevData, 'transcription' : response.data.transcript}))
        return response.data.transcript
      } catch (error) {
      console.log(error);
      
    }}

    const getPhotoes = async(rawData) => {
      let query = []
      rawData.forEach((scene) => {
        query.push(scene.ImagePrompt)
      })
      try {
        const response = await axios.post('/api/get-photos', {query:query})
        console.log(response.data.photo);
        setVideoData((prevData) => ({...prevData, 'photoURL' : response.data.photo}))
        return response.data.photo
      } catch (error) {
        console.log(error);
      }
    }

    useEffect(() => {
      if (Object.keys(videoData).length === 4) {
        SaveVideoData(videoData)
        }
    },[videoData])

    const SaveVideoData = async(videoData) => {
      setIsLoading(true)
      const result = await db.insert(VideoData).values({
        script: videoData?.script,
        audioFileUrl: videoData?.voiceover,
        captions: videoData?.transcription,
        imageList: videoData?.photoURL,
        createdBy: user?.primaryEmailAddress?.emailAddress
      }).returning({id: VideoData.id})

      setVideoId(result[0].id)
      setPlayVideo(true)
      setIsLoading(false)
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
        <PlayerDialog playVideo={playVideo} videoId={videoId}/>
      </div>
    </div>
  )
}

export default CreateNew
