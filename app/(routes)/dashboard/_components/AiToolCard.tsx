import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { v4 as uuidv4 } from 'uuid';
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
  const id=uuidv4()
  return (
    <div className='p-3 border rounded-lg '>
        <Image src={tool.icon} alt={tool.name}  width={40} height={40} className='w-12 h-12 rounded-md' />
        <h2 className='font-bold mt-2'>{tool.name}</h2>
        <p className='text-gray-400'>{tool.desc}</p>
        <Link href={tool?.path+"/"+id}>
        <Button className='w-full mt-3'>{tool.button}</Button>
        </Link>
    </div>
  )
}

export default AiToolCard