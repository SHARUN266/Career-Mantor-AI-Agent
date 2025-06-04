"use client";
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React, { useState } from 'react'


function History() {
    const [history, setHistory] = useState([])
  return (
    <div className='mt-5 p-4 border rounded-lg'>
        <h2 className='font-bold text-lg'>Previous History</h2>
        <p>What Your previously work on, You can find here</p>
        {
            history?.length==0 && 
            <div className='flex items-center justify-center my-5 flex-col mt-6'>
                <Image src={'/idea.png'} alt='bulb' height={50} width={50} />
                <h2>You do Not Have any history</h2>
                <Button className='mt-3'>Explore AI Tools</Button>
            </div>
        }
    </div>
  )
}

export default History