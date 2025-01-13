"use client"

import React from "react";
import Image from "next/image";
import {
    AlertDialog,
    AlertDialogContent,
  } from "@/components/ui/alert-dialog";

interface CustomLoading {
    (props: { 
        loading:boolean;
     }) : void
}

export const CustomLoading: CustomLoading = ({ loading }) => {
    return (
        <AlertDialog open={loading}>
            <AlertDialogContent>
                <div className="flex flex-col justify-center gap-4 bg-white">
                    <Image className="self-center" src={'/progress.gif'} alt="progress" width={50} height={50}/>
                    <h2 className="bg-white self-center">Generating your video... do not refresh</h2>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default CustomLoading;