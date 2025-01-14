import React, { useEffect, useState } from 'react';
import { Player } from '@remotion/player';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from '@/components/ui/alert-dialog';
import RemotionVideo from './RemotionVideo';
import { Button } from '@/components/ui/button';
import { db } from '@/configs/db';
import { eq } from 'drizzle-orm';
import { VideoData } from '@/configs/schema';
import { useRouter } from 'next/navigation';

const PlayerDialog = ({ playVideo, videoId, setOpenPlayDialog }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [videoData, setVideoData] = useState(null);
  const [durationInFrame, setDurationInFrame] = useState(100);
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setOpenDialog(playVideo);
    if (videoId) {
      GetVideoData();
    }
  }, [playVideo, videoId]);

  const GetVideoData = async () => {
    try {
      const result = await db.select().from(VideoData).where(eq(VideoData.id, videoId));
      if (result.length > 0) {
        setVideoData(result[0]);
      } else {
        console.error('No video data found.');
      }
    } catch (error) {
      console.error('Error fetching video data:', error);
    }
  };

  const handleExport = () => {
    setAlertDialogOpen(true); // Show alert dialog
  };

  return (
    <>
      <Dialog open={openDialog}>
        <DialogContent className="bg-white flex flex-col items-center">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl">Your video is ready</DialogTitle>
            <DialogDescription>
              <div>
                {videoData && (
                  <Player
                    component={RemotionVideo}
                    durationInFrames={Number(durationInFrame.toFixed(0))}
                    compositionWidth={300}
                    compositionHeight={450}
                    controls
                    fps={30}
                    inputProps={{
                      ...videoData,
                      setDurationInFrame: (frameValue) => setDurationInFrame(frameValue),
                    }}
                  />
                )}
              </div>
              <div className="flex justify-between w-full mt-5">
                <Button variant="ghost" onClick={() =>{ router.replace('/dashboard');setOpenDialog(false);setOpenPlayDialog(!openDialog);}}>
                  Cancel
                </Button>
                <Button onClick={handleExport}>Export</Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <AlertDialog open={alertDialogOpen} onOpenChange={setAlertDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Under Development.</AlertDialogTitle>
            <AlertDialogDescription>
              This function is not yet implemented.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default PlayerDialog;
