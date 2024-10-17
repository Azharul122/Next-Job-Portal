import SearchContainer from '@/components/ui/search-container'
import React from 'react'

const Banner = () => {
    

    
    return (
        <div className='flex flex-col gap-3 items-center justify-center py-5'>
            <h2 className='md:text-2xl text-xl  font-bold gradient-text'> Identify your ideal job to achieve your career <span className="animate-accordion-down bg-gradient-to-r from-gradient-start  to-gradient-end bg-[length:100%_2px] bg-no-repeat bg-bottom pb-2">goals</span> </h2>
            <p>100+ job posted every day</p>
            <SearchContainer />
        </div>
    )
}

export default Banner