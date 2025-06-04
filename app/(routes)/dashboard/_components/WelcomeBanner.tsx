import { Button } from '@/components/ui/button'
import React from 'react'

function WelcomeBanner() {
  return (
    <div className='p-5 bg-gradient-to-tr from-[#be575f] via-[#a338e3] to-[#ac76d6] rounded-xl'>
        <h2 className='font-bold text-2xl text-white'>AI Career Coach Agent</h2>
        <p className='text-white'>Smarter career decisions start here - get tailored advice, real-time market insights, and roadmap built just for you with power of AI</p>
        <Button variant={'outline'} className='mt-3'>Let's Get Started</Button>
    </div>
  )
}

export default WelcomeBanner