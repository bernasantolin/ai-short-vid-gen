"use client"
import SelectDuration from './component/SelectDuration';
import SelectTopic from './component/SelectTopic';
import SelectStyle from './component/SelectStyle';
import CustomLoading from './component/CustomLoading';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { v4 as uuidv4 } from 'uuid';

import { db } from '@/configs/db';
import { VideoData } from '@/configs/schema';
import { useUser } from '@clerk/nextjs';
import PlayerDialog from '@/app/dashboard/components/PlayerDialog';

interface InputChange {
    (fieldName: string, fieldValue:any): void;
}

interface FormDataTypes {
    duration: string;
    topic: string;
    imageStyle: string;
}

type VideoScript = {
    contextText: string;
    imagePrompt: string;
}

const CreateNew = () => {
    const [formData, setFormData] = useState<FormDataTypes>({
        duration: '',
        topic: '',
        imageStyle: '',
    }); 
    const [loading, setLoading] = useState<boolean>(false);
    const [videoId, setVideoId] = useState<number>(1);
    const [playVideo, setPlayVideo] = useState<boolean>(false);

    const { user } = useUser();
    
    const onHandleInputChange: InputChange = (fieldName, fieldValue) => {
        setFormData(prev=>({
            ...prev,
            [fieldName]: fieldValue
        }));
    }

    const GetVideoScript = async (e: any) => {
        const prompt = `Write a script to generate ${formData.duration} video on topic: ${formData.topic} along with AI image prompt in ${formData.imageStyle} format for each scene and give me result in JSON format with imagePrompt and ContentText as field`
      
        try {
            const response: AxiosResponse = await axios.post('/api/get-video-script', { 
                prompt:prompt
            })
            
            return response?.data?.result;
        } catch(e) {
            console.log(e)
        }
    }

    const GeneateAudioFile = async (videoScriptData: any) => {
        const id = uuidv4();
        let audioFileUrl = "";
        let script = "";

        videoScriptData?.forEach((item: any)=>{
            script = script + item.contentText + " ";
        });

        try {
            const response: AxiosResponse = await axios.post("/api/get-audio", {
                text:script,
                id:id
            })
            const data = response?.data?.data;
            console.log("audioFileUrl data", data?.audioFileUrl?.downloadURL)

            audioFileUrl = data?.downloadURL
        } catch(e){
            console.error(e);
        }
        return audioFileUrl;
    }

    const GenerateCaption = async (fileUrl: string) =>{ 
        let captions = {}

        try {
            const response: AxiosResponse = await axios.post("/api/get-caption", {
                audioFileUrl: fileUrl
            });
            captions = response?.data?.data;
        } catch(e) {
            console.log(e)
        }

        return captions;
    }

    const GenerateImage = async (videoScript: VideoScript[]) => {
        const images = []
        for(const element of videoScript) {
            try {
                setLoading(true)
                const response: AxiosResponse = await axios.post("/api/get-image", {
                    prompt: element?.imagePrompt
                });
                images.push(response?.data?.result)
            } catch(e) {
                console.log(e)
            }
        }
        setLoading(false);

        return images;
    }

    const onCreateClickHandler = async(e:any) => {
        setLoading(true);
        const script = await GetVideoScript(e);
        const audioFileUrl = await GeneateAudioFile(script);
        const captions = await GenerateCaption(audioFileUrl);
        const imageList = await GenerateImage(script);
        await new Promise(()=>setTimeout(()=>{
            handleSaveVideoData({
                script,
                audioFileUrl,
                captions,
                imageList,
                createdBy:user?.primaryEmailAddress?.emailAddress
            })
        }, 5000))
    }
    
    const handleSaveVideoData = async ({
        script,
        audioFileUrl,
        captions,
        imageList,
        createdBy
    }:{
        script:any;
        audioFileUrl:any;
        captions:any;
        imageList:any;
        createdBy:any;
    }) => {
        setLoading(true);
        const result = await db.insert(VideoData).values({
            script,
            audioFileUrl,
            captions,
            imageList,
            createdBy
        }).returning({
            id: VideoData?.id
        });

        setVideoId(result[0]?.id);
        setPlayVideo(true);
    }
    
    return (
        <div className="md:px-20">
            <h2 className="font-bold text-4xl text-primary text-center">Create New</h2>
            <div className="mt-10 shadow-md p-10">
                {/* Select topic  */}
                <SelectTopic onUserSelect={onHandleInputChange}/>

                {/* Select style  */}
                <SelectStyle onUserSelect={onHandleInputChange}/>
                
                {/* Duration  */}
                <SelectDuration onUserSelect={onHandleInputChange}/>
                
                {/* Create Button  */}
                <Button className="mt-10 w-full" onClick={onCreateClickHandler}>Create Short Video</Button>
            </div>

            <CustomLoading loading={loading}/>
            <PlayerDialog playVideo={playVideo} videoId={videoId} />
        </div>
    )
}

export default CreateNew;