
import React from 'react'
import SectionOne from "../components/SectionOne"
import Cards from '@/components/Cards'
import Blog from '@/components/Blog'
import BlogTwo from '@/components/BlogTwo'
import EventsPassed from "../components/EventsPassed"
import Opinions from "../components/Opinions"
const Home = () => {
  return (
    <section className='bg-gray-900 '>
      <SectionOne />
      <Cards/>
      <BlogTwo/>
      <EventsPassed/>
      <Blog/>
      <Opinions/>
    </section>
  )
}

export default Home

