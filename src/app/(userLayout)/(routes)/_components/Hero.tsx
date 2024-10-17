import Image from 'next/image'
import React from 'react'

const Hero = () => {
    return (

        <Image src={`/interview.png`} alt='' height={100} width={400}  className='mx-auto sm:w-[25rem] w-[18rem]' />

    )
}

export default Hero