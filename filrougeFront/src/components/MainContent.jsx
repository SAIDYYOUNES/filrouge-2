import React, { useEffect } from 'react'
import Banner from './Banner'
import Discover from './Discover'
import Posts from './Posts'
import { useSelector } from 'react-redux'

export default function MainContent() {
  const {logged}=useSelector(state=>state.users)
  return (
    <>
     {!logged && <Banner />}
      <div  className={` ${logged?'mt-16':''} size py-7 flex flex-col-reverse md:flex-row gap-[7rem]`}>
        <div className="flex-[1.5]">
          <Posts />
        </div>
        <div className="flex-[1] relative">
          <Discover />
        </div>
      </div>
    </>
  )
}
