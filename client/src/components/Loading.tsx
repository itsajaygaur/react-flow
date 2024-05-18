import { LuLoader2 } from "react-icons/lu";

export default function Loading(){
    return(
        <div className='h-dvh w-screen flex justify-center items-center' >
        <LuLoader2 size={32} className='animate-spin ' /> 
    </div>
    )
}