import React from "react";
import { AbsoluteFill, Img, Audio, Sequence, useVideoConfig, useCurrentFrame, interpolate } from "remotion";

type RemoteVideo = { 
    script: { [key:string]: any };
    imageList:string[] | null;
    audioFileUrl: string;
    captions:{ [key:string]: any };
    setDurationInFrame: (duration: number) => void;
} 

export const RemotionVideo: React.FC<RemoteVideo> =  (props: RemoteVideo ) => {
    const { script, imageList, audioFileUrl, captions, setDurationInFrame } = props;
    const { fps } = useVideoConfig();
    const frame = useCurrentFrame();

    const handleGetDurationFrame = () => {
        const compute = Math.ceil(captions[captions?.length - 1]?.end / 1000 * fps);
        setDurationInFrame(compute);
        return compute;
    }

    const handleGetCurrentCaption = () => {
        const currentTime = frame / 30 * 1000 // convert frame number to mili seconds
        const currentCaption = captions.find((word:{ [key:string] : any })=>currentTime >= word.start && currentTime <= word.end)
        return currentCaption?.text
    }

    return script && (
        <AbsoluteFill style={{ backgroundColor: 'black' }}>
            {imageList?.map((item, index)=>{
                let startTime = (index * handleGetDurationFrame())/imageList?.length;
                const duration = handleGetDurationFrame();
                const inputRange = [startTime, startTime + duration / 2, startTime + duration] // zoom in

                const scale = (index:number) => interpolate(
                    frame, 
                    inputRange,
                    index ? [1, 1.8, 1] : [1.8, 1, 1.8], // scale 1 (original), 1.8 (zoom in)
                    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                );

                return (
                    <>
                        <Sequence 
                            key={index}
                            from={startTime}
                            durationInFrames={handleGetDurationFrame()}
                        >   
                            <AbsoluteFill style={{ justifyContent:'center', alignItems: 'center' }}>
                                <Img src={item} style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit:"cover",
                                        transform:`scale(${scale(index)})`
                                    }} 
                                />
                                <AbsoluteFill style={{
                                    color:'white', 
                                    justifyContent:'center',
                                    top:undefined,
                                    bottom:50,
                                    height:150,
                                    textAlign:'center',
                                    width:'100%'
                                }}>
                                    <h2 className="text-2xl">{handleGetCurrentCaption()}</h2>
                                </AbsoluteFill>
                            </AbsoluteFill>
                            
                        </Sequence>
                        <Audio src={audioFileUrl}/>
                    </>
                )
            }
        )}
        </AbsoluteFill>
    );
}

export default RemotionVideo;