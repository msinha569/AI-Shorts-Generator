import { SignUp } from "@clerk/nextjs"
import Image from "next/image"


export default function Page() {
    return (
        <div>
            <Image
            src='/ice.jpg'
            width={500}
            height={500}
            className="absolute h-screen w-screen object-fill"/>
            <div className="flex justify-center items-center h-screen">
            <SignUp/>
            </div>
        </div>
    )
    
}