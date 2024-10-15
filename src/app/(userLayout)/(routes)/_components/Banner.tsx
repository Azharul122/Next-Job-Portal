import SearchContainer from '@/components/ui/search-container'
import React from 'react'

const Banner = () => {
    return (
        <div className='flex flex-col gap-3 items-center justify-center py-5'>
            <h2 className='text-2xl font-bold gradient-text'>Find your drean job to achive your goal</h2>
            <p>100+ job posted every day</p>
            <SearchContainer/>
        </div>
    )
}

export default Banner