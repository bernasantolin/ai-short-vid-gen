"use client"
import React, { useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';
import { db } from '@/configs/db';
import { Users } from '@/configs/schema';

export const Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user } = useUser();

    useEffect(()=>{
        user && isNewUser();
    }, [user])

    const isNewUser = async():Promise<void> => {
        const email = user?.primaryEmailAddress?.emailAddress ?? '';
        const result = await db.select().from(Users).where(eq(Users.email, email));

        if(!result[0])
        {
            await db.insert(Users).values({
                name: user?.fullName ?? '',
                email: user?.primaryEmailAddress?.emailAddress ?? '',
                imageUrl: user?.imageUrl
            })
        }

    }

    return <div>{ children }</div>
}