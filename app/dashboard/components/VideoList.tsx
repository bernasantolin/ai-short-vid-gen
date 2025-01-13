import React, { useState } from 'react';
import { Thumbnail } from '@remotion/player';
import { RemotionVideo } from './RemotionVideo';
import PlayerDialog from './PlayerDialog';

type VideoItem = {
    audioFileUrl: string;
    script:  {
        contentText: string;
        imagePrompt: string;
    }[];
    imageList:string[] | null;
    captions: {
        end: number;
        text: string;
        start: number;
        speaker: string;
    }[];
    id: number;
    createdBy: string;
    setDurationInFrame?: (duration: number) => void;
}[]

export const VideoList: React.FC<{
    videoList: VideoItem;
    close: () => void;
}> = ({ videoList }) => {
    const [openPlayDialog, setOpenPlayDialog] = useState(false);
    const [videoId, setVideoId] = useState(0)

    return (
            <div className="grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] justy-items-center">
            {videoList?.map((video, index:number)=>{
               return (
                <div 
                    key={index}
                    onClick={()=>{
                        setOpenPlayDialog(true);
                        setVideoId(video?.id)
                    }}
                >
                    <Thumbnail
                        className="w-full h-auto"
                        component={ RemotionVideo }
                        compositionWidth={250}
                        compositionHeight={350}
                        frameToDisplay={30}
                        durationInFrames={120}
                        fps={30}
                        style={{
                            borderRadius:10,
                            position:'relative'
                        }}
                        inputProps={{
                            ...video,
                            setDurationInFrame: (v) => console.log(v)
                        }}
                    />
                </div>
               )
            })}
            <PlayerDialog playVideo={openPlayDialog} videoId={videoId}/>
        </div>
    )
}

export default VideoList;