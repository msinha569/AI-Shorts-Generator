import React from 'react'
import RemotionVideo from './RemotionVideo'
import { Thumbnail } from "@remotion/player";
import PlayerDialog from './PlayerDialog';


const VideoList = ({videoList}) => {
    const [openPlayDialog, setOpenPlayDialog] = React.useState(false)
    const [videoId, setVideoId] = React.useState(null)
  return (
    <div className='m-10  gap-3 '>
      {
        videoList.map((video,index) => (
            <div onClick={() => {setOpenPlayDialog(true);setVideoId(video?.id)}} >
                 <Thumbnail
                    component={RemotionVideo}
                    compositionWidth={250}
                    compositionHeight={300}
                    frameToDisplay={30}
                    durationInFrames={120}
                    fps={30}
                    style={{borderRadius: '10px', cursor: 'pointer'}}
                    inputProps={{
                        ...video,
                       setDurationInFrame: (frameValue) => console.log(frameValue),
                    }}
                    />
            </div>
        ))
      }
      <PlayerDialog setOpenPlayDialog={setOpenPlayDialog} playVideo={openPlayDialog} videoId={videoId}/>
    </div>
  )
}

export default VideoList
