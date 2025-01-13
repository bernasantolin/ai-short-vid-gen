import React, { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"
import { Player } from "@remotion/player";
import RemotionVideo from "./RemotionVideo";
import { Button } from "@/components/ui/button";
import { db } from "@/configs/db";
import { VideoData } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { useRouter } from "next/navigation";
export const PlayerDialog = ({ playVideo, videoId }: { playVideo: boolean, videoId: number; }) => {
    
    const [openDialog, setOpenDialog] = useState(false);
    const [videoData, setVideoData] = useState<any>();
    const [durationInFrame, setDurationInFrame] = useState<number>(100);
    const router = useRouter();

    useEffect(() => {
        (playVideo && videoId !== 0) && setOpenDialog(playVideo);
        videoId !== 0 && handleGetVideoData();
    }, [playVideo, videoId]);
    
    useEffect(() => {
       handleGetVideoData();
    }, []);
    
    const handleGetVideoData = async () => {
        const result = await db.select()
        .from(VideoData)
        .where(eq(VideoData.id, videoId));

        setVideoData(result ? result[0] : {});
    }
 
    return (
        <Dialog open={openDialog}>
            <DialogContent className="bg-white flex flex-col items-center">
                <DialogHeader>
                    <DialogTitle className="text-3xl font-bold my-5">Your video</DialogTitle>
                    <Player
                        durationInFrames={Number(durationInFrame.toFixed(0))}
                        component={RemotionVideo}
                        compositionHeight={450}
                        compositionWidth={300}
                        controls={true}
                        fps={30}
                        inputProps={{
                            ...videoData,
                            setDurationInFrame: (frameValue: number) =>{
                                console.log("frameValue", frameValue)
                                setDurationInFrame(Number(frameValue.toFixed(0)))
                            }
                        }}
                    />
                </DialogHeader>
                <div className="flex gap-5">
                    <Button
                        variant="ghost"
                        onClick={()=>{
                            router.replace('/dashboard')
                            setOpenDialog(false)
                        }}
                    >
                        Cancel
                    </Button>
                    <Button>Export</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default PlayerDialog;