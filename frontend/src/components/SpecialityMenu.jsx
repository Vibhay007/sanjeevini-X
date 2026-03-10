import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
  return (
    <div className='flex flex-col items-center gap-4 py-16 text-dark-text' id='speciality'>
        <h1 className='text-3xl font-medium'>Explore by Specialty</h1>
        <p className='sm:w-1/3 text-center text-sm text-dark-muted'>Find trusted doctors and book your appointment in just a few clicks.</p>
        <div className='flex sm:justify-center gap-4 pt-5 w-full overflow-scroll'>
            {specialityData.map((item, index)=>(
               <Link
  onClick={() => scrollTo(0, 0)}
  className='flex flex-col items-center text-sm font-bold cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500 text-dark-muted hover:text-sky-400'
  key={index}
  to={`/doctors/${item.speciality}`}
>
  <img className='w-24 sm:w-32 mb-2' src={item.image} alt="" />
  <p>{item.speciality}</p>
</Link>
            ))}
        </div>
    </div>
  )
}

export default SpecialityMenu
