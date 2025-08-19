"use client"
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import ResumeUploadDialogue from './ResumeUploadDialogue';
interface TOOL {
    name: string;
    desc: string;
    icon: string;
    path: string;
    button: string;
}
type AiToolCardProps = {
    tool: TOOL;
}
function AiToolCard({tool}: AiToolCardProps) {
  const id=uuidv4();
  const {user}=useUser();
  const router=useRouter();
  const [openResumeUpload, setOpenResumeUpload] = useState(false);
 
  const onClickButton=async()=>{
      // Create new record for history table
       if(tool.name==="AI Resume Analyzer"){
    setOpenResumeUpload(true);
      return;
  }
      const result=await axios.post('/api/history',{
           recordId:id,
           content:[],

      })
      console.log(result)
      router.push(tool.path + "/" + id)
  }
  return (
    <div className='p-3 border rounded-lg '>
        <Image src={tool.icon} alt={tool.name}  width={40} height={40} className='w-12 h-12 rounded-md' />
        <h2 className='font-bold mt-2'>{tool.name}</h2>
        <p className='text-gray-400'>{tool.desc}</p>
        
        <Button onClick={onClickButton} className='w-full mt-3'>{tool.button}</Button>
        <ResumeUploadDialogue  openResumeUpload={openResumeUpload}  setOpenResumeUpload={setOpenResumeUpload}  />
    </div>
  )
}

export default AiToolCard