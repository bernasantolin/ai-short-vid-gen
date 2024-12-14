import React from 'react';
import Image from 'next/image';
import { UserButton } from '@clerk/nextjs';

export const Header: React.FC = () =>{ 
    return (
        <nav className="flex items-center justify-between shadow-md p-3 px-5 bg-white z-10 sticky top-0">
            <div className="flex gap-3 items-center">
                <Image src={'/logo.png'} alt="logo" width={25} height={25}/>
                <h2 className="font-bold text-xl">AI Short Gen</h2>
            </div>
            <div className="flex gap-3 items-center">
                <UserButton/>
            </div>
        </nav>
    )
}

export default Header;