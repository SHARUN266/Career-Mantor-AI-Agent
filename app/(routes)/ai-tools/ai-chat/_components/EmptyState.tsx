import React from 'react'

function EmptyState({SelectedQuetion }: { SelectedQuetion: (question: string) => void }) {
    const questionList=[
        'What skills do I need to become a data scientist?',
        'How can I improve my resume for a software engineering job?',
        'What are the best online courses for learning web development?',
        'How do I prepare for a technical interview?'

    ];
 
  return (
    <div>
        <h2 className='font-bold text-xl text-center'>Ask Anything to AI career Agent</h2>
        <div className='mt-12'>
            {
                questionList.map((question, index) => (
                    <div key={index} className='mt-3 border rounded-lg mb-2 hover:border-primary cursor-pointer' >
                        <h2 className='p-2 text-center   my-4 ' onClick={()=>SelectedQuetion(question)}>{question}</h2>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default EmptyState