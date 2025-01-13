"use client"
import React, { useState } from 'react';
import Image from 'next/image';

interface SelectStyle {
    (props: { [key: string]: Function }) : void
}

type StyleOptionsType = {
    name: string;
    image: string;
}[]

const STYLE_OPTIONS: StyleOptionsType = [
    {
        name:'Realistic',
        image: '/realistic.jpeg'
    },
    {
        name:'Cartoon',
        image: '/cartoon.jpeg'
    },
    {
        name:'Comic',
        image: '/comic.jpeg'
    },
    {
        name:'WaterColor',
        image: '/water-color.jpeg'
    },
    {
        name:'GTA',
        image: '/gta.jpeg'
    },
];

export const SelectStyle: SelectStyle = ({ onUserSelect }) => {
    const [selectedOption, setSelectedOption] = useState<string>("");

    return (
        <div className="mt-7">
            <h2 className="font-bold text-2xl text-primary">Style</h2>
            <p className="text-gray-500">Select your video style</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-5 mt-3">
                {STYLE_OPTIONS?.map((item, index)=>(
                    <div
                        key={`${item.name}-${index}`}
                        className={`relative hover:scale-105 transition-all cursor-pointer rounded-xl ${selectedOption === item.name && 'border-4 border-primary'}`}
                    >
                        <Image
                            className="h-48 object-cover rounded-lg w-full"
                            alt={`${item.name} style`}
                            src={item.image}
                            quality={100}
                            width={100}
                            height={100}
                            unoptimized
                            onClick={()=>{
                                setSelectedOption(item.name);
                                onUserSelect('imageStyle', item.name);
                            }}
                        />
                        <h2 className="absolute p-1 bg-black bottom-0 w-full text-white text-center rounded-b-lg">
                            {item.name}
                        </h2>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SelectStyle;
