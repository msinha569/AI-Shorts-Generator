import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import Image from 'next/image'
  
const CustomLoading = ({isLoading}) => {
  return (
        <AlertDialog open={isLoading}>
        <AlertDialogContent className='item center flex flex-col my-10 justify-center'>
           <div className='flex flex-col items-center justify-center'>
            <Image src='/progress.gif' alt='loading' width={100} height={100}/>
           <AlertDialogTitle className='text-primary'>Generating your video...Do not refresh</AlertDialogTitle>
           </div>
        </AlertDialogContent>
        </AlertDialog>

  )
}

export default CustomLoading
