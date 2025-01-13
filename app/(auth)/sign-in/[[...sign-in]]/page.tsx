import React from 'react';
import { SignIn } from '@clerk/nextjs';
import Image from 'next/image';

const Page: React.FC = () => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2'>
            <div className="w-full object-contain">
                <Image 
                    style={{ width:"100vw", height:'100vh', objectFit: 'cover' }}
                    src={'/login.jpg'}
                    alt="login image"
                    height={500}
                    width={500} 
                />
            </div>
            <div className="flex justify-center items-center h-screen">
                <SignIn/>
            </div>
        </div>
    )
}

export default Page;