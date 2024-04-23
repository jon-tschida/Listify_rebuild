import React from 'react'
import Image from 'next/image'
import closeIcon from "../../../public/images/closeButton.svg"

export default function HelpComponent(props) {
    const {setOpenHelp} = props
  return (
    <div className="w-screen h-screen bg-black/80">
      <div className="absolute flex flex-col w-2/5 p-2 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-mealsAndListBg drop-shadow-lg h-3/5 left-1/2 top-1/2">
      <Image
          priority
          alt="close"
          src={closeIcon}
          className="absolute cursor-pointer select-none top-2 right-2 hover:scale-105"
          onClick={() => setOpenHelp(prevState => !prevState)}
        />
        <h2 className='text-xl text-center'>What is Listify?</h2>
      </div>
    </div>
  )
}
