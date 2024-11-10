
import React from 'react'
import SectionOne from "../components/SectionOne"
import Cards from '@/components/Cards'
import Blog from '@/components/Blog'
import BlogTwo from '@/components/BlogTwo'

const Home = () => {
  return (
    <div className='bg-gray-900'>
      <SectionOne/>
      <Cards/>
      <BlogTwo/>
      <Blog/>
    </div>
  )
}

export default Home

