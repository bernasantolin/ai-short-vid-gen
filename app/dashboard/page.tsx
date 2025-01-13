"use client"
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import EmptyState from './components/EmptyState';
import Link from 'next/link';
import { db } from '@/configs/db';
import { VideoData } from '@/configs/schema';
import { useUser } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';
import VideoList from './components/VideoList';

type VideoItem = {
    audioFileUrl: string;
    script: {
        contentText: string;
        imagePrompt: string;
    }[];
    imageList: string[] | null;
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

const Dashboard: React.FC = () => {

    const [videoList, setVideoList] = useState<VideoItem>([]);
    const { user } = useUser();
    
    useEffect(()=>{
        user && handleGetVideoList();
    },[user]);

    const handleGetVideoList = async () => {
        const result = await db.select().from(VideoData).where(eq(VideoData?.createdBy ?? "", user?.primaryEmailAddress?.emailAddress ?? ""));
        setVideoList(result);
    }

    return (
        <div>
            <div className="p-2 flex justify-between items-center">
                <h2 className="font-bold text-2xl text-primary">Dashboard</h2>
                <Link href="/dashboard/create-new">
                    <Button>+ Create New</Button>
                </Link>
            </div>
            {
                videoList?.length == 0 && <EmptyState/>
            }
            <VideoList videoList={videoList} close={()=>{}}/>
        </div>
    )
}

export default Dashboard;